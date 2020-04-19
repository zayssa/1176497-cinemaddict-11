import {createElement} from './utils';

export const createUserRankTemplate = (user) => {
  const {
    rank,
    userpic
  } = user;

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="${userpic}" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRank {
  constructor(props) {
    this._user = props;
    this._element = null;
  }

  getTemplate() {
    return createUserRankTemplate(this._user);
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

