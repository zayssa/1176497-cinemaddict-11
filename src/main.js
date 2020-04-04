
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
render(siteHeaderElement, createUserRankTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilmsSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmListElement = siteMainElement.querySelector(`.films-list`);
render(filmListElement, createShowMoreButtonTemplate(), `beforeend`);

const filmListContainerElement = filmListElement.querySelector(`.films-list__container`);
for (let i = 0; i < FILM_CARDS; i++) {
  render(filmListContainerElement, createFilmCardTemplate(), `beforeend`);
}

const filmTopRatedListElement = siteMainElement.querySelector(`.films-list--extra .films-list__container`);
const filmMostCommentedListElement = siteMainElement.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);
for (let i = 0; i < FILM_CARDS_SPECIAL; i++) {
  render(filmTopRatedListElement, createSpecialFilmCardTemplate(), `beforeend`);
  render(filmMostCommentedListElement, createSpecialFilmCardTemplate(), `beforeend`);
}

const siteFooterStatsElement = document.querySelector(`.footer__statistics`);
render(siteFooterStatsElement, createFooterStatsTemplate(), `beforeend`);

const siteBodyElement = document.querySelector(`body`);
render(siteBodyElement, createFilmDetailesModalTemplate(), `beforeend`);
