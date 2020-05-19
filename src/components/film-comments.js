import AbstractComponent from './abstract-component';
import {formatDate} from '../utils/formatters';

export default class FilmComments extends AbstractComponent {
  constructor(props) {
    super(props);
    this._comments = props;
  }

  getTemplate() {
    return this._comments.map((comment) => `
      <ul class="film-details__comments-list">
        <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${formatDate(comment.date)}</span>
                <button class="film-details__comment-delete" data-id="${comment.id}">Delete</button>
              </p>
            </div>
          </li>
      </ul>
      `).join(``);
  }
}
