import {render, remove} from '../utils/render';

import FilmCard from '../components/FilmCard';
import FilmDetailsModal from '../components/FilmDetailsModal';

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
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

    this._filmCardComponent.addShowFilmDetailsHandler(this._openFilmDetails);
    this._filmCardComponent.addWatchlistButtonHandler(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isWatchlist: !this._film.isWatchlist
      }));
    });
    this._filmCardComponent.addFavoriteButtonHandler(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isFavorite: !this._film.isFavorite
      }));
    });
    this._filmCardComponent.addHistoryButtonHandler(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isHistory: !this._film.isHistory
      }));
    });
  }

  _openFilmDetails() {
    this._onViewChange();
    this._filmDetailsComponent = new FilmDetailsModal(this._film);
    const siteBodyElement = document.querySelector(`body`);
    render(siteBodyElement, this._filmDetailsComponent);
    this._filmDetailsComponent.addWatchlistCheckboxHandler((evt) => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isWatchlist: evt.target.checked
      }));
    });
    this._filmDetailsComponent.addFavoriteCheckboxHandler((evt) => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isFavorite: evt.target.checked
      }));
    });
    this._filmDetailsComponent.addHistoryCheckboxHandler((evt) => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isHistory: evt.target.checked
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
