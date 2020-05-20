import {Films} from './models/films';
import {getComments} from './models/comments';
import {user, siteinfo, generateFilms} from './models/mock';
import {render} from './utils/render';

import UserRank from './components/user-rank';
import FooterStats from './components/footer-stats';
import PageController from './controllers/page';
import FilterController from './controllers/filter';

const MOCK_FILMS_AMOUNT = 20;
const filmsModel = new Films();
filmsModel.setFilms(generateFilms(MOCK_FILMS_AMOUNT));
const films = filmsModel.getFilmsAll();
const commentsAmount = films[MOCK_FILMS_AMOUNT - 1].comments[0] + films[MOCK_FILMS_AMOUNT - 1].comments.length;
const comments = getComments(commentsAmount);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRank(user));

const siteMainElement = document.querySelector(`.main`);
const siteMenuController = new FilterController(siteMainElement, filmsModel);
siteMenuController.render();

const filmsList = new PageController(siteMainElement, filmsModel, comments);
filmsList.render();

const siteFooterStatsElement = document.querySelector(`.footer__statistics`);
render(siteFooterStatsElement, new FooterStats(siteinfo.filmsTotal));
