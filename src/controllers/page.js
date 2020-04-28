import {render, remove} from '../utils/render';

import FilmsSort from '../components/FilmsSort';
import FilmsList from '../components/FilmsList';
import NoFilms from '../components/NoFilms';
import FilmCard from '../components/FilmCard';
import ShowMoreButton from '../components/ShowMoreButton';

const FILM_CARDS = 5;
const FILM_CARDS_SPECIAL = 2;

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(films) {
    render(this._container, new FilmsSort());

    if (films.length === 0) {
      render(this._container, new NoFilms());
      return;
    }

    render(this._container, new FilmsList());
    const filmListElement = this._container.querySelector(`.films-list`);

    const showMoreButton = new ShowMoreButton();
    render(filmListElement, showMoreButton);

    const filmListContainerElement = filmListElement.querySelector(`.films-list__container`);
    let filmsShown = 0;
    const loadMoreFilms = () => {
      for (let i = 0; i < FILM_CARDS && filmsShown < films.length; i++) {
        render(filmListContainerElement, new FilmCard(films[filmsShown]));
        filmsShown++;
      }
      if (filmsShown >= films.length) {
        remove(showMoreButton);
      }
    };
    loadMoreFilms();
    showMoreButton.getElement().addEventListener(`click`, loadMoreFilms);

    const filmTopRatedElement = this._container.querySelector(`.films-list--extra`);
    const filmMostCommentedElement = this._container.querySelector(`.films-list--extra + .films-list--extra`);
    const topRatedFilms = [...films]
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

    const mostCommentedFilms = [...films]
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
  }
}
