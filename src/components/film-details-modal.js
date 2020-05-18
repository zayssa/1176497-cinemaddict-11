import {createElement} from '../utils/render';
import FilmComments from './film-comments';
import AbstractSmartComponent from './abstract-smart-component';
import moment from "moment";

export default class FilmDetailsModal extends AbstractSmartComponent {
  constructor(film, comments) {
    super(film, comments);
    this._film = film;
    this._comments = comments;
    this._watchlistHandler = null;
    this._historyHandler = null;
    this._favoriteHandler = null;

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEmojiChange = this._onEmojiChange.bind(this);
    this._onTextInput = this._onTextInput.bind(this);
    this._currentEmoji = null;
    this._currentText = ``;
  }

  getTemplate() {
    const durationTemp = moment.duration(this._film.film_info.runtime, `minutes`);
    const durationFormatted = `${durationTemp.hours()}h ${durationTemp.minutes()}m`;
    const filmComments = this._comments.filter((comment) => this._film.comments.includes(comment.id));
    const releaseDate = moment(this._film.film_info.release.date).format(`D MMMM YYYY`);
    const genresLabel = `Genre${this._film.film_info.genre.length > 1 ? `s` : ``}`;
    const genresList = this._film.film_info.genre.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``);
    const commentsList = new FilmComments(filmComments).getTemplate();

    const currentEmojiElement = this._currentEmoji ? `<img src="images/emoji/${this._currentEmoji}.png" width="55" height="55" alt="emoji-${this._currentEmoji}">` : ``;

    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./images/posters/${this._film.film_info.poster}" alt="">

                <p class="film-details__age">${this._film.film_info.age_rating}+</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${this._film.film_info.title}</h3>
                    <p class="film-details__title-original">Original: ${this._film.film_info.alternative_title}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${this._film.film_info.total_rating}</p>
                  </div>
                </div>

                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${this._film.film_info.director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${this._film.film_info.writers}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${this._film.film_info.actors}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${releaseDate}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${durationFormatted}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${this._film.film_info.release.release_country}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${genresLabel}</td>
                    <td class="film-details__cell">
                      ${genresList}
                    </td>
                  </tr>
                </table>

                <p class="film-details__film-description">${this._film.film_info.description}</p>
              </div>
            </div>

            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._film.user_details.watchlist ? `checked` : ``}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._film.user_details.already_watched ? `checked` : ``}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._film.user_details.favorite ? `checked` : ``}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>

          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._film.comments.length}</span></h3>

              ${commentsList}

              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label">
                  ${currentEmojiElement}
                </div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${this._currentText}</textarea>
                </label>

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${this._currentEmoji === `smile` ? `checked` : ``}>
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${this._currentEmoji === `sleeping` ? `checked` : ``}>
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${this._currentEmoji === `puke` ? `checked` : ``}>
                  <label class="film-details__emoji-label" for="emoji-puke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${this._currentEmoji === `angry` ? `checked` : ``}>
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseButtonClick);
      this._element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._onEmojiChange);
      this._element.querySelector(`.film-details__comment-input`).addEventListener(`keyup`, this._onTextInput);
    }

    return this._element;
  }

  _onCloseButtonClick() {
    this.getElement().remove();
    this.removeElement();
  }

  _onEmojiChange(evt) {
    if (!evt.target.value) {
      return;
    }
    this._currentEmoji = evt.target.value;
    this.rerender();
  }

  _onTextInput(evt) {
    this._currentText = evt.target.value;
  }

  addWatchlistCheckboxHandler(handler) {
    this._watchlistHandler = handler;
    this._element.querySelector(`#watchlist`).addEventListener(`change`, handler);
  }

  addHistoryCheckboxHandler(handler) {
    this._historyHandler = handler;
    this._element.querySelector(`#watched`).addEventListener(`change`, handler);
  }

  addFavoriteCheckboxHandler(handler) {
    this._favoriteHandler = handler;
    this._element.querySelector(`#favorite`).addEventListener(`change`, handler);
  }

  addDeleteCommentHandler(handler) {
    this._element.querySelector(`.film-details__comment-delete`).addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this.removeElement.bind(this));
    this.addWatchlistCheckboxHandler(this._watchlistHandler);
    this.addHistoryCheckboxHandler(this._historyHandler);
    this.addFavoriteCheckboxHandler(this._favoriteHandler);
    this._element.querySelectorAll(`.film-details__emoji-list input[type="radio"]`).forEach((radio) => {
      radio.addEventListener(`change`, this._onEmojiChange);
    });
  }
}
