import {mock} from './components/mock';
import {render} from './utils/render';

import UserRank from './components/UserRank';
import SiteMenu from './components/SiteMenu';
import FooterStats from './components/FooterStats';
import PageController from './controllers/page';

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRank(mock.user));

const siteMainElement = document.querySelector(`.main`);
const filterParams = [
  mock.films.list.filter((a) => a.isWatchlist).length,
  mock.films.list.filter((a) => a.isHistory).length,
  mock.films.list.filter((a) => a.isFavorite).length
];
render(siteMainElement, new SiteMenu(filterParams));

const filmsList = new PageController(siteMainElement);
filmsList.render(mock.films.list);

const siteFooterStatsElement = document.querySelector(`.footer__statistics`);
render(siteFooterStatsElement, new FooterStats(mock.films.total));
