import {mock} from './components/mock';
import {render} from './components/utils';

import UserRank from './components/UserRank';
import SiteMenu from './components/SiteMenu';
import FilmsSort from './components/FilmsSort';
import FilmsList from './components/FilmsList';
import NoFilms from './components/NoFilms';
import FilmCard from './components/FilmCard';
import ShowMoreButton from './components/ShowMoreButton';
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

(() => {
  if (mock.films.list.length === 0) {
    render(siteMainElement, new NoFilms());
    return;
  }

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

  const filmTopRatedElement = siteMainElement.querySelector(`.films-list--extra`);
  const filmMostCommentedElement = siteMainElement.querySelector(`.films-list--extra + .films-list--extra`);
  const topRatedFilms = [...mock.films.list]
    .filter((film) => film.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 2);
  if (topRatedFilms.length === 0) {
    filmTopRatedElement.remove();
  } else {
    const filmTopRatedListElement = filmTopRatedElement.querySelector(`.films-list__container`);
    for (let i = 0; i < FILM_CARDS_SPECIAL && i < topRatedFilms.length; i++) {
      render(filmTopRatedListElement, new FilmCard(topRatedFilms[i]));
    }
  }

  const mostCommentedFilms = [...mock.films.list]
    .filter((film) => film.comments.length > 0)
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, 2);
  if (mostCommentedFilms.length === 0) {
    filmMostCommentedElement.remove();
  } else {
    const filmMostCommentedListElement = filmMostCommentedElement.querySelector(`.films-list__container`);
    for (let i = 0; i < FILM_CARDS_SPECIAL; i++) {
      render(filmMostCommentedListElement, new FilmCard(mostCommentedFilms[i]));
    }
  }
})();

const siteFooterStatsElement = document.querySelector(`.footer__statistics`);
render(siteFooterStatsElement, new FooterStats(mock.films.total));
