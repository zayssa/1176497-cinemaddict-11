import {Films} from './models/films';
import {user} from './models/mock';
import {render, remove} from './utils/render';

import API from './utils/api';
import UserRank from './components/user-rank';
import FooterStats from './components/footer-stats';
import FilmsPage from './components/page';
import PageController from './controllers/page';
import FilterController from './controllers/filter';
import Statistics from './components/statistic';
import Loading from './components/loading';

const filmsModel = new Films();

const api = new API();

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRank(user));

const siteMainElement = document.querySelector(`.main`);
const filmsPage = new FilmsPage();
const filmsList = new PageController(filmsPage, filmsModel, api);
const siteMenuController = new FilterController(siteMainElement, filmsModel, filmsList);
siteMenuController.render();
render(siteMainElement, filmsPage);

const loading = new Loading();
render(filmsPage.getElement(), loading);

api.getFilms().then((films) => {
  filmsModel.setFilms(films);

  const statistics = new Statistics(filmsModel);
  siteMenuController.addStatistic(statistics);

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
