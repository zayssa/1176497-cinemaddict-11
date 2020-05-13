import {render, remove} from '../utils/render';

import FilmCard from '../components/film-card';
import FilmDetailsModal from '../components/film-details-modal';

export default class FilmController {
  constructor(container, onDataChange, onViewChange, comments) {
    this._container = container;
    this._comments = comments;
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
    this._filmCardComponent = new FilmCard(this._film);
    render(this._container, this._filmCardComponent);

    this._filmCardComponent.addFilmTitleHandler(this._openFilmDetails);
    this._filmCardComponent.addFilmPosterHandler(this._openFilmDetails);
    this._filmCardComponent.addFilmCommentsHandler(this._openFilmDetails);
    this._filmCardComponent.addWatchlistButtonHandler(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        "user_details": {
          watchlist: !this._film.user_details.watchlist
        }
      }));
    });
    this._filmCardComponent.addFavoriteButtonHandler(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        "user_details": {
          favorite: !this._film.user_details.favorite
        }
      }));
    });
    this._filmCardComponent.addHistoryButtonHandler(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        "user_details": {
          "already_watched": !this._film.user_details.already_watched
        }
      }));
    });
  }

  _openFilmDetails() {
    this._onViewChange();
    this._filmDetailsComponent = new FilmDetailsModal(this._film, this._comments);
    const siteBodyElement = document.querySelector(`body`);
    render(siteBodyElement, this._filmDetailsComponent);
    this._filmDetailsComponent.addWatchlistCheckboxHandler((evt) => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        "user_details": {
          watchlist: evt.target.checked
        }
      }));
    });
    this._filmDetailsComponent.addFavoriteCheckboxHandler((evt) => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        "user_details": {
          favorite: evt.target.checked
        }
      }));
    });
    this._filmDetailsComponent.addHistoryCheckboxHandler((evt) => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        "user_details": {
          "already_watched": evt.target.checked
        }
      }));
    });
    document.addEventListener(`keydown`, this._onEscKeyDownHandler);
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
}
