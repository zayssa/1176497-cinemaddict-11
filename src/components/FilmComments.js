import {createElement} from './utils';


export const createFilmCommentsTemplate = (comments) => {
  return (
    comments.map((comment) => `
      <ul class="film-details__comments-list">
        <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.phrase}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${comment.date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
      </ul>
      `).join(``)
  );
};


export default class FilmComments {
  constructor(props) {
    this._comments = props;
    this._element = null;
  }

  getTemplate() {
    return createFilmCommentsTemplate(this._comments);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
