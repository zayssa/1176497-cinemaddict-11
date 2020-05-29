const AUTHORIZATION_TOKEN = `Basic jvkuckluv67754`;
const API_HOST = `https://11.ecmascript.pages.academy/cinemaddict`;

const API = class {
  constructor() {
    this._authorization = AUTHORIZATION_TOKEN;
  }

  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`${API_HOST}/movies`, {headers})
      .then((response) => response.json());
  }

  setFilm(film) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`${API_HOST}/movies/${film.id}`, {
      method: `PUT`,
      body: JSON.stringify(film),
      headers
    })
      .then((response) => response.json());
  }

  getComments(filmId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`${API_HOST}/comments/${filmId}`, {headers})
      .then((response) => response.json());
  }

  createComment(filmId, comment) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`${API_HOST}/comments/${filmId}`, {
      method: `POST`,
      body: JSON.stringify(comment),
      headers
    })
      .then((response) => response.json());
  }

  deleteComment(commentId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`${API_HOST}/comments/${commentId}`, {
      method: `DELETE`,
      headers
    });
  }

  sync(films) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`${API_HOST}/movies/sync`, {
      methor: `POST`,
      headers,
      body: films
    });
  }
};

export default API;
