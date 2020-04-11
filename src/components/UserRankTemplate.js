export const createUserRankTemplate = (rank, userpic) => {

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="${userpic}" alt="Avatar" width="35" height="35">
    </section>`
  );
};
