import AbstractComponent from './AbstractComponent';
import {formatDate} from '../utils/formatters';

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
                <span class="film-details__comment-day">${formatDate(comment.date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
      </ul>
      `).join(``)
  );
};


export default class FilmComments extends AbstractComponent {
  constructor(props) {
    super(props);
    this._comments = props;
  }

  getTemplate() {
    return createFilmCommentsTemplate(this._comments);
  }
}
