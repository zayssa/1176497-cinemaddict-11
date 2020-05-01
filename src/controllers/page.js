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
    this._filmsList = new FilmsList();
    this._showMoreButton = new ShowMoreButton();
    this._filmsShown = 0;
  }

  loadMoreFilms(films, container) {
    for (let i = 0; i < FILM_CARDS && this._filmsShown < films.length; i++) {
      render(container, new FilmCard(films[this._filmsShown]));
      this._filmsShown++;
    }
    if (this._filmsShown >= films.length) {
      remove(this._showMoreButton);
      this._showMoreButton = null;
    }
  }

  render(films) {
    const filmSort = new FilmsSort();
    render(this._container, filmSort);

    if (films.length === 0) {
      render(this._container, new NoFilms());
      return;
    }

    render(this._container, this._filmsList);
    const filmsListElement = this._filmsList.getElement().querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

    this._showMoreButton = new ShowMoreButton();
    render(filmsListElement, this._showMoreButton);

    this._showMoreButton.getElement().addEventListener(`click`, this.loadMoreFilms.bind(this, films, filmsListContainerElement));
    this.loadMoreFilms(films, filmsListContainerElement);

    filmSort.setSortTypeChangeHandler((currentSortType) => {
      filmsListContainerElement.innerHTML = ``;
      this._filmsShown = 0;
      remove(this._showMoreButton);

      this._showMoreButton = new ShowMoreButton();
      render(filmsListElement, this._showMoreButton);

      const sortedFilms = currentSortType === `default` ? [...films]
        : [...films].sort((a, b) => {
          if (currentSortType === `date`) {
            return a.date - b.date;
          }
          return b.rating - a.rating;
        });

      this._showMoreButton.getElement().addEventListener(`click`, this.loadMoreFilms.bind(this, sortedFilms, filmsListContainerElement));
      this.loadMoreFilms(sortedFilms, filmsListContainerElement);
    });

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
