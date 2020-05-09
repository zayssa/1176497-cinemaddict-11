import {createElement} from '../utils/render';
import FilmComments from './FilmComments';
import AbstractSmartComponent from './AbstractSmartComponent';
import moment from "moment";

const createFilmDetailsModalTemplate = (film, state) => {
  const {
    poster,
    restriction,
    title,
    original,
    rating,
    director,
    writers,
    actors,
    date,
    duration,
    country,
    genres,
    description,
    isWatchlist,
    isHistory,
    isFavorite,
    comments,
  } = film;

  const releaseDate = moment(date).format(`D MMMM YYYY`);
  const genresLabel = `Genre${genres.length > 1 ? `s` : ``}`;
  const genresList = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``);
  const commentsList = new FilmComments(comments).getTemplate();

  const {currentEmoji, currentText} = state;
  const currentEmojiElement = currentEmoji ? `<img src="images/emoji/${currentEmoji}.png" width="55" height="55" alt="emoji-${currentEmoji}">` : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

              <p class="film-details__age">${restriction}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${original}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genresLabel}</td>
                  <td class="film-details__cell">
                    ${genresList}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isHistory ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

            ${commentsList}

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${currentEmojiElement}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${currentText}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${currentEmoji === `smile` ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${currentEmoji === `sleeping` ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${currentEmoji === `puke` ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${currentEmoji === `angry` ? `checked` : ``}>
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
};

export default class FilmDetailsModal extends AbstractSmartComponent {
  constructor(props) {
    super(props);
    this._film = props;
    this._watchlistHandler = null;
    this._historyHandler = null;
    this._favoriteHandler = null;

    this._onEmojiChange = this._onEmojiChange.bind(this);
    this._onTextInput = this._onTextInput.bind(this);
    this._currentEmoji = null;
    this._currentText = ``;
  }

  getTemplate() {
    return createFilmDetailsModalTemplate(this._film, {currentEmoji: this._currentEmoji, currentText: this._currentText});
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this.removeElement.bind(this));
      this._element.querySelectorAll(`.film-details__emoji-list input[type="radio"]`).forEach((radio) => {
        radio.addEventListener(`change`, this._onEmojiChange);
      });
      this._element.querySelector(`.film-details__comment-input`).addEventListener(`keyup`, this._onTextInput);
    }

    return this._element;
  }

  _onEmojiChange(evt) {
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
