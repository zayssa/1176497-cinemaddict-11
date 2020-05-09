import AbstractComponent from './AbstractComponent';

const createFilmCardTemplate = (film) => {
  const {
    title,
    rating,
    date,
    duration,
    genres,
    poster,
    description,
    comments,
    isWatchlist,
    isHistory,
    isFavorite,
  } = film;

  const year = date.getFullYear();
  const genresAll = genres.join(`, `);
  const descriptionTrimmed = `${description.slice(0, 140)}${description.length > 140 ? `…` : ``}`;
  const commentsAmount = comments.length;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genresAll}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionTrimmed}</p>
      <a class="film-card__comments">${commentsAmount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item ${isWatchlist ? `film-card__controls-item--active` : ``} button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item ${isHistory ? `film-card__controls-item--active` : ``} button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item ${isFavorite ? `film-card__controls-item--active` : ``} button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(props) {
    super(props);
    this._film = props;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  addShowFilmDetailsHandler(handler) {
    this._element.querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this._element.querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  addWatchlistButtonHandler(handler) {
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  addHistoryButtonHandler(handler) {
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  addFavoriteButtonHandler(handler) {
    this._element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
