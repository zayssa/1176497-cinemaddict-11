import AbstractComponent from './abstract-component';

export default class UserRank extends AbstractComponent {
  constructor(statistics) {
    super();

    this._userRank = statistics ? statistics.getRank() : ``;
  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${this._userRank}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}

