import {render, remove} from '../utils/render';
import moment from "moment";

import FilmsSort from '../components/films-sort';
import FilmsList from '../components/films-list';
import NoFilms from '../components/no-films';
import ShowMoreButton from '../components/show-more-button';
import FilmController from './film';

const FILM_CARDS = 5;
const FILM_CARDS_SPECIAL = 2;

export default class PageController {
  constructor(container, comments) {
    this._comments = comments;
    this._container = container;
    this._filmsListElement = null;
    this._filmsListContainerElement = null;
    this._filmsList = new FilmsList();
    this._showMoreButton = null;
    this._filmsShown = 0;
    this._films = [];
    this._filmsControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  loadMoreFilms() {
    for (let i = 0; i < FILM_CARDS && this._filmsShown < this._films.length; i++) {
      const filmController = new FilmController(this._filmsListContainerElement, this._onDataChange, this._onViewChange, this._comments);
      filmController.render(this._films[this._filmsShown]);
      this._filmsControllers.push(filmController);
      this._filmsShown++;
    }
    if (this._filmsShown >= this._films.length) {
      remove(this._showMoreButton);
      this._showMoreButton = null;
    }
  }

  render(films) {
    this._films = films;
    const filmSort = new FilmsSort();
    render(this._container, filmSort);

    if (films.length === 0) {
      render(this._container, new NoFilms());
      return;
    }

    render(this._container, this._filmsList);
    this._filmsListElement = this._filmsList.getElement().querySelector(`.films-list`);
    this._filmsListContainerElement = this._filmsListElement.querySelector(`.films-list__container`);

    this._renderShowMoreButton();

    this.loadMoreFilms();

    filmSort.setSortTypeChangeHandler((currentSortType) => {
      this._filmsListContainerElement.innerHTML = ``;
      this._filmsShown = 0;
      remove(this._showMoreButton);

      this._showMoreButton = new ShowMoreButton();
      render(this._filmsListElement, this._showMoreButton);

      const sortedFilms = currentSortType === `default` ? [...films]
        : [...films].sort((a, b) => {
          if (currentSortType === `date`) {
            return moment(a.release.date) - moment(b.release.date);
          }
          return b.film_info.total_rating - a.film_info.total_rating;
        });
      this._films = sortedFilms;

      this._showMoreButton.getElement().addEventListener(`click`, this.loadMoreFilms.bind(this));
      this.loadMoreFilms();
    });

    const filmTopRatedElement = this._container.querySelector(`.films-list--extra`);
    const filmMostCommentedElement = this._container.querySelector(`.films-list--extra + .films-list--extra`);
    const topRatedFilms = [...films]
      .filter((film) => film.film_info.total_rating > 0)
      .sort((a, b) => b.film_info.total_rating - a.film_info.total_rating)
      .slice(0, 2);
    if (topRatedFilms.length === 0) {
      filmTopRatedElement.remove();
    } else {
      const filmTopRatedListElement = filmTopRatedElement.querySelector(`.films-list__container`);
      for (let i = 0; i < FILM_CARDS_SPECIAL && i < topRatedFilms.length; i++) {
        const filmController = new FilmController(filmTopRatedListElement, this._onDataChange, this._onViewChange, this._comments);
        filmController.render(topRatedFilms[i]);
        this._filmsControllers.push(filmController);
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
        const filmController = new FilmController(filmMostCommentedListElement, this._onDataChange, this._onViewChange, this._comments);
        filmController.render(mostCommentedFilms[i]);
        this._filmsControllers.push(filmController);
      }
    }
  }

  _renderShowMoreButton() {
    this._showMoreButton = new ShowMoreButton();
    render(this._filmsListElement, this._showMoreButton);

    this._showMoreButton.getElement().addEventListener(`click`, this.loadMoreFilms.bind(this));
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    filmController.render(this._films[index]);
  }

  _onViewChange() {
    this._filmsControllers.forEach((filmController) => {
      filmController._closeFilmDetails();
    });
  }
}
