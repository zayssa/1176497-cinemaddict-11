const STORE_KEYS = {
  FILMS: `films`,
  COMMENTS: `comments`,
  FILMS_TO_UPDATE: `films_unsync`
};

const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;

    this._synchronized = true;
  }

  isSynchronized() {
    return this._synchronized;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          this._store.setData(STORE_KEYS.FILMS, films);
          return films;
        });
    }
    const films = this._store.getData(STORE_KEYS.FILMS);
    return Promise.resolve(films);
  }

  setFilm(film) {
    if (isOnline()) {
      return this._api.setFilm(film)
        .then((response) => {
          const films = this._store.getData(STORE_KEYS.FILMS)
            .map((item) => film.id === item.id ? film : item);
          this._store.setData(STORE_KEYS.FILMS, films);
          return response;
        });
    }
    this._synchronized = false;

    const filmsToUpdate = this._store.getData(STORE_KEYS.FILMS_TO_UPDATE) || [];
    const filmToUpdateIdx = filmsToUpdate.findIndex((item) => item.id === film.id);
    if (filmToUpdateIdx === -1) {
      filmsToUpdate.push(film);
      this._store.setData(STORE_KEYS.FILMS_TO_UPDATE, filmsToUpdate);
    }

    const films = this._store.getData(STORE_KEYS.FILMS)
      .map((item) => film.id === item.id ? film : item);
    this._store.setData(STORE_KEYS.FILMS, films);
    return Promise.resolve(film);
  }

  getComments(filmId) {
    if (isOnline()) {
      return this._api.getComments(filmId)
        .then((comments) => {
          this._store.setData(STORE_KEYS.COMMENTS, comments);
          return comments;
        });
    }
    const comments = this._store.getData(STORE_KEYS.COMMENTS);
    return Promise.resolve(comments);
  }

  createComment(filmId, comment) {
    if (isOnline()) {
      return this._api.createComment(filmId, comment)
        .then((response) => {
          const films = this._store.getData(STORE_KEYS.FILMS)
            .map((item) => filmId === item.id ? response.movie : item);
          this._store.setData(STORE_KEYS.FILMS, films);
          return response;
        });
    }
    return Promise.resolve({error: `offline`});
  }

  deleteComment(commentId) {
    if (isOnline()) {
      return this._api.deleteComment(commentId)
        .then((response) => {
          const comments = this._store.getData(STORE_KEYS.COMMENTS)
            .filter((item) => commentId !== item.id);
          this._store.setData(STORE_KEYS.COMMENTS, comments);
          return response;
        });
    }
    return Promise.resolve({error: `offline`});
  }

  sync() {
    const filmsToUpdate = this._store.getData(STORE_KEYS.FILMS_TO_UPDATE) || [];
    this._api.sync(filmsToUpdate).then(() => {
      this._store.setData(STORE_KEYS.FILMS_TO_UPDATE, []);
    });

    this._synchronized = true;
  }
}
