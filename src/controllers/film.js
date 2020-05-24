import {render, replace, remove} from '../utils/render';

import FilmCard from '../components/film-card';
import FilmDetailsModal from '../components/film-details-modal';

export default class FilmController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._api = api;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._openFilmDetails = this._openFilmDetails.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._onEscKeyDownHandler = this._onEscKeyDownHandler.bind(this);
    this._film = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
  }

  render(film) {
    this._film = film;
    const oldFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCard(this._film);

    if (oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }

    this._filmCardComponent.addFilmTitleHandler(this._openFilmDetails);
    this._filmCardComponent.addFilmPosterHandler(this._openFilmDetails);
    this._filmCardComponent.addFilmCommentsHandler(this._openFilmDetails);
    this._filmCardComponent.addWatchlistButtonHandler(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        "user_details": Object.assign({}, this._film.user_details, {
          watchlist: !this._film.user_details.watchlist
        })
      }));
    });
    this._filmCardComponent.addFavoriteButtonHandler(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        "user_details": Object.assign({}, this._film.user_details, {
          favorite: !this._film.user_details.favorite
        })
      }));
    });
    this._filmCardComponent.addHistoryButtonHandler(() => {
      const watchingDate = this._film.isWatched ? null : new Date();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        "user_details": Object.assign({}, this._film.user_details, {
          "already_watched": !this._film.user_details.already_watched,
          "watching_date": watchingDate
        })
      }));
    });
  }

  _openFilmDetails() {
    this._onViewChange();
    this._filmDetailsComponent = new FilmDetailsModal(this._film, this._api);
    const siteBodyElement = document.querySelector(`body`);
    render(siteBodyElement, this._filmDetailsComponent);
    this._filmDetailsComponent.loadComments();
    this._filmDetailsComponent.addWatchlistCheckboxHandler((evt) => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        "user_details": Object.assign({}, this._film.user_details, {
          watchlist: evt.target.checked
        })
      }));
    });
    this._filmDetailsComponent.addFavoriteCheckboxHandler((evt) => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        "user_details": Object.assign({}, this._film.user_details, {
          favorite: evt.target.checked
        })
      }));
    });
    this._filmDetailsComponent.addHistoryCheckboxHandler((evt) => {
      const watchingDate = this._film.isWatched ? null : new Date();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        "user_details": Object.assign({}, this._film.user_details, {
          "already_watched": evt.target.checked,
          "watching_date": watchingDate
        })
      }));
    });
    document.addEventListener(`keydown`, this._onEscKeyDownHandler);
    this._filmDetailsComponent.addDeleteCommentHandler((evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      this._onDataChange(this, this._comments, Object.assign({}, this._film, {
        comments: this._film.comments.filter((comment) => comment.id !== evt.target.dataset.id)
      }));
    });
  }

  _closeFilmDetails() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDownHandler);
  }

  _onEscKeyDownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeFilmDetails();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
