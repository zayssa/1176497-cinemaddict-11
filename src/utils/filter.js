export const getFilmsByFilter = (films, filter) => {
  if (filter === `all`) {
    return films;
  }
  return films.filter((film) => film.user_details[filter]);
};
