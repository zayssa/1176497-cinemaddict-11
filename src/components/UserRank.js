import AbstractComponent from './AbstractComponent';

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

export default class UserRank extends AbstractComponent {
  constructor(props) {
    super(props);
    this._user = props;
  }

  getTemplate() {
    return createUserRankTemplate(this._user);
  }
}

