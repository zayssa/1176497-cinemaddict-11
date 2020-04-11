export const createFilmCardTemplate = (film) => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${film.title}</h3>
      <p class="film-card__rating">${film.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${film.date.slice(-4)}</span>
        <span class="film-card__duration">${film.duration}</span>
        <span class="film-card__genre">${film.genres.join(`, `)}</span>
      </p>
      <img src="./images/posters/${film.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${film.description.slice(0, 140)}${film.description.length > 140 ? `…` : ``}</p>
  <a class="film-card__comments">${film.comments.length} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item ${film.watchlist ? `film-card__controls-item--active` : ``} button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item ${film.histoty ? `film-card__controls-item--active` : ``} button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item ${film.favorite ? `film-card__controls-item--active` : ``} button film-card__controls-item--favorite">Mark as favorite</button>
  </form>
    </article > `
  );
};
