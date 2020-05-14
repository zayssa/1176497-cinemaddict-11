import {getFilms} from './models/films';
import {getComments} from './models/comments';
import {user, siteinfo} from './models/mock';
import {render} from './utils/render';

import UserRank from './components/user-rank';
import SiteMenu from './components/site-menu';
import FooterStats from './components/footer-stats';
import PageController from './controllers/page';

const MOCK_FILMS_AMOUNT = 20;
const films = getFilms(MOCK_FILMS_AMOUNT);
const commentsAmount = films[MOCK_FILMS_AMOUNT - 1].comments[0] + films[MOCK_FILMS_AMOUNT - 1].comments.length;
const comments = getComments(commentsAmount);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRank(user));

const siteMainElement = document.querySelector(`.main`);
const filterParams = [
  films.filter((a) => a.user_details.watchlist).length,
  films.filter((a) => a.user_details.already_watched).length,
  films.filter((a) => a.user_details.favorite).length
];
render(siteMainElement, new SiteMenu(filterParams));

const filmsList = new PageController(siteMainElement, comments);
filmsList.render(films);

const siteFooterStatsElement = document.querySelector(`.footer__statistics`);
render(siteFooterStatsElement, new FooterStats(siteinfo.filmsTotal));
