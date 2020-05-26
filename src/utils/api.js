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

  getComments(filmId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`${API_HOST}/comments/${filmId}`, {headers})
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
};

export default API;
