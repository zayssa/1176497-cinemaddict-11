import {mock} from './components/mock';
import {render} from './components/utils';

import UserRank from './components/UserRank';
import SiteMenu from './components/SiteMenu';
import FilmsSort from './components/FilmsSort';
import FilmsList from './components/FilmsList';
import FilmCard from './components/FilmCard';
import ShowMoreButton from './components/ShowMoreButton';
import SpecialFilmCard from './components/SpecialFilmCard';
import FooterStats from './components/FooterStats';

const FILM_CARDS = 5;
const FILM_CARDS_SPECIAL = 2;

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRank(mock.user));

const siteMainElement = document.querySelector(`.main`);
const filterParams = [
  mock.films.list.filter((a) => a.isWatchlist).length,
  mock.films.list.filter((a) => a.isHistory).length,
  mock.films.list.filter((a) => a.isFavorite).length
];
render(siteMainElement, new SiteMenu(filterParams));

render(siteMainElement, new FilmsSort());
render(siteMainElement, new FilmsList());

const filmListElement = siteMainElement.querySelector(`.films-list`);
const showMoreButton = new ShowMoreButton();
render(filmListElement, showMoreButton);

const filmListContainerElement = filmListElement.querySelector(`.films-list__container`);
let filmsShown = 0;
const loadMoreFilms = () => {
  for (let i = 0; i < FILM_CARDS && filmsShown < mock.films.list.length; i++) {
    render(filmListContainerElement, new FilmCard(mock.films.list[filmsShown]));
    filmsShown++;
  }
  if (filmsShown >= mock.films.list.length) {
    showMoreButton.getElement().style.display = `none`;
  }
};
loadMoreFilms();
showMoreButton.getElement().addEventListener(`click`, loadMoreFilms);

const filmTopRatedListElement = siteMainElement.querySelector(`.films-list--extra .films-list__container`);
const filmMostCommentedListElement = siteMainElement.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);
const topRatedFilms = [...mock.films.list].sort((a, b) => b.rating - a.rating).slice(0, 2);
const mostCommentedFilms = [...mock.films.list].sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
for (let i = 0; i < FILM_CARDS_SPECIAL; i++) {
  render(filmTopRatedListElement, new SpecialFilmCard(topRatedFilms[i]));
  render(filmMostCommentedListElement, new SpecialFilmCard(mostCommentedFilms[i]));
}

const siteFooterStatsElement = document.querySelector(`.footer__statistics`);
render(siteFooterStatsElement, new FooterStats(mock.films.total));
