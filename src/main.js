import {mock} from "./components/mock";

import {createUserRankTemplate} from './components/UserRankTemplate';
import {createSiteMenuTemplate} from './components/SiteMenuTemplate';
import {createFilmsSortTemplate} from './components/FilmsSortTemplate';
import {createFilmsTemplate} from './components/FilmsTemplate';
import {createFilmCardTemplate} from './components/FilmCardTemplate';
import {createShowMoreButtonTemplate} from './components/ShowMoreButtonTemplate';
import {createSpecialFilmCardTemplate} from './components/SpecialFilmCardTemplate';
import {createFilmDetailesModalTemplate} from './components/FilmDetailesModalTemplat';
import {createFooterStatsTemplate} from './components/FooterStatsTemplate';

const FILM_CARDS = 5;
const FILM_CARDS_SPECIAL = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserRankTemplate(mock.user.rank, mock.user.userpic), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createSiteMenuTemplate(mock.films.list.filter((a) => a.watchlist).length, mock.films.list.filter((a) => a.history).length, mock.films.list.filter((a) => a.favorite).length), `beforeend`);
render(siteMainElement, createFilmsSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmListElement = siteMainElement.querySelector(`.films-list`);
render(filmListElement, createShowMoreButtonTemplate(), `beforeend`);
const showMoreButtonTemplate = document.querySelector(`.films-list__show-more`);

const filmListContainerElement = filmListElement.querySelector(`.films-list__container`);
let filmsShown = 0;
const loadMoreFilms = () => {
  for (let i = 0; i < FILM_CARDS && filmsShown < mock.films.list.length; i++) {
    render(filmListContainerElement, createFilmCardTemplate(mock.films.list[filmsShown]), `beforeend`);
    filmsShown++;
  }
  if (filmsShown >= mock.films.list.length) {
    showMoreButtonTemplate.style.display = `none`;
  }
};
loadMoreFilms();
showMoreButtonTemplate.addEventListener(`click`, loadMoreFilms);

const filmTopRatedListElement = siteMainElement.querySelector(`.films-list--extra .films-list__container`);
const filmMostCommentedListElement = siteMainElement.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);
const topRatedFilms = [...mock.films.list].sort((a, b) => b.rating - a.rating).slice(0, 2);
const mostCommentedFilms = [...mock.films.list].sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
for (let i = 0; i < FILM_CARDS_SPECIAL; i++) {
  render(filmTopRatedListElement, createSpecialFilmCardTemplate(topRatedFilms[i]), `beforeend`);
  render(filmMostCommentedListElement, createSpecialFilmCardTemplate(mostCommentedFilms[i]), `beforeend`);
}

const siteFooterStatsElement = document.querySelector(`.footer__statistics`);
render(siteFooterStatsElement, createFooterStatsTemplate(mock.films.total), `beforeend`);

const siteBodyElement = document.querySelector(`body`);
render(siteBodyElement, createFilmDetailesModalTemplate(mock.films.list[0]), `beforeend`);
