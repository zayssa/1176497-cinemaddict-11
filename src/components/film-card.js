import AbstractComponent from './abstract-component';
import moment from 'moment';

export default class FilmCard extends AbstractComponent {
  constructor(props) {
    super(props);
    this._film = props;
  }

  getTemplate() {
    const year = moment(this._film.film_info.release.date).format(`YYYY`);
    const durationTemp = moment.duration(this._film.film_info.runtime, `minutes`);
    const durationFormatted = `${durationTemp.hours()}h ${durationTemp.minutes()}m`;
    const genresAll = this._film.film_info.genre.join(`, `);
    const descriptionTrimmed = `${this._film.film_info.description.slice(0, 140)}${this._film.film_info.description.length > 140 ? `…` : ``}`;
    const commentsAmount = this._film.comments.length;

    return (
      `<article class="film-card">
        <h3 class="film-card__title">${this._film.film_info.title}</h3>
        <p class="film-card__rating">${this._film.film_info.total_rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${durationFormatted}</span>
          <span class="film-card__genre">${genresAll}</span>
        </p>
        <img src="./images/posters/${this._film.film_info.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${descriptionTrimmed}</p>
        <a class="film-card__comments">${commentsAmount} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item ${this._film.user_details.watchlist ? `film-card__controls-item--active` : ``} button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item ${this._film.user_details.already_watched ? `film-card__controls-item--active` : ``} button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item ${this._film.user_details.favorite ? `film-card__controls-item--active` : ``} button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>`
    );
  }

  addFilmTitleHandler(handler) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }

  addFilmPosterHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }

  addFilmCommentsHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  addWatchlistButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  addHistoryButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  addFavoriteButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
