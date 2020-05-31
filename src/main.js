import {Films} from './models/films';
import {render, remove} from './utils/render';

import API from './api/index';
import Store from './api/store';
import Provider from './api/provider.js';
import UserRank from './components/user-rank';
import FooterStats from './components/footer-stats';
import FilmsPage from './components/films-page';
import PageController from './controllers/page';
import FilterController from './controllers/filter';
import Statistics from './components/statistic';
import Loading from './components/loading';

const filmsModel = new Films();

const api = new API();
const store = new Store(window.localStorage);
const apiWithProvider = new Provider(api, store);

const siteHeaderElement = document.querySelector(`.header`);
const headerUserRank = new UserRank();
render(siteHeaderElement, headerUserRank);

const siteMainElement = document.querySelector(`.main`);
const filmsPage = new FilmsPage();
const filmsList = new PageController(filmsPage, filmsModel, apiWithProvider);
const siteMenuController = new FilterController(siteMainElement, filmsModel, filmsList);
siteMenuController.render();
render(siteMainElement, filmsPage);

const loading = new Loading();
render(filmsPage.getElement(), loading);

apiWithProvider.getFilms().then((films) => {
  filmsModel.setFilms(films);

  const statistics = new Statistics(filmsModel);
  siteMenuController.addStatistic(statistics);
  remove(headerUserRank);
  render(siteHeaderElement, new UserRank(statistics));

  remove(loading);

  filmsList.render();
  render(siteMainElement, statistics);
  statistics.hide();

  const siteFooterStatsElement = document.querySelector(`.footer__statistics`);
  render(siteFooterStatsElement, new FooterStats(films.length));
}).catch(() => {
  filmsModel.setFilms([]);

  remove(loading);

  filmsList.render();
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {})
    .catch(() => {});
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
