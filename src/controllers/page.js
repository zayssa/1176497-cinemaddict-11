import {render, remove} from '../utils/render';
import moment from "moment";

import FilmsSort from '../components/films-sort';
import FilmsList from '../components/films-list';
import NoFilms from '../components/no-films';
import ShowMoreButton from '../components/show-more-button';
import FilmController from './film';

const FILM_CARDS = 5;
const FILM_CARDS_SPECIAL = 2;

const sortFilms = (films, sort) => {
  switch (sort) {
    case `date`:
      return [...films].sort((a, b) => moment(a.film_info.release.date) - moment(b.film_info.release.date));
    case `rating`:
      return [...films].sort((a, b) => b.film_info.total_rating - a.film_info.total_rating);
    default:
      return [...films];
  }
};

export default class PageController {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._api = api;
    this._filmsListElement = null;
    this._filmsListContainerElement = null;
    this._filmsList = new FilmsList();
    this._showMoreButton = null;
    this._filmsShown = 0;
    this._filmsModel = filmsModel;
    this._filmsControllers = [];
    this._specialFilmsControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);

    this._sort = `default`;
  }

  loadMoreFilms() {
    const films = sortFilms(this._filmsModel.getFilms(), this._sort);
    for (let i = 0; i < FILM_CARDS && this._filmsShown < films.length; i++) {
      const filmController = new FilmController(this._filmsListContainerElement, this._onDataChange, this._onViewChange, this._api);
      filmController.render(films[this._filmsShown]);
      this._filmsControllers.push(filmController);
      this._filmsShown++;
    }
    if (this._filmsShown >= films.length) {
      remove(this._showMoreButton);
      this._showMoreButton = null;
    }
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    const films = this._filmsModel.getFilms();
    const filmSort = new FilmsSort();
    const container = this._container.getElement();
    render(container, filmSort);

    if (films.length === 0) {
      render(container, new NoFilms());
      return;
    }

    render(container, this._filmsList);
    this._filmsListElement = this._filmsList.getElement().querySelector(`.films-list`);
    this._filmsListContainerElement = this._filmsListElement.querySelector(`.films-list__container`);

    this._renderShowMoreButton();

    this.loadMoreFilms();

    filmSort.setSortTypeChangeHandler((currentSortType) => {
      this._sort = currentSortType;
      this._updateFilms();
    });

    const filmTopRatedElement = container.querySelector(`.films-list--extra`);
    const filmMostCommentedElement = container.querySelector(`.films-list--extra + .films-list--extra`);
    const topRatedFilms = [...this._filmsModel.getFilmsAll()]
      .filter((film) => film.film_info.total_rating > 0)
      .sort((a, b) => b.film_info.total_rating - a.film_info.total_rating)
      .slice(0, 2);
    if (topRatedFilms.length === 0) {
      filmTopRatedElement.remove();
    } else {
      const filmTopRatedListElement = filmTopRatedElement.querySelector(`.films-list__container`);
      for (let i = 0; i < FILM_CARDS_SPECIAL && i < topRatedFilms.length; i++) {
        const filmController = new FilmController(filmTopRatedListElement, this._onDataChange, this._onViewChange, this._api);
        filmController.render(topRatedFilms[i]);
        this._specialFilmsControllers.push(filmController);
      }
    }

    const mostCommentedFilms = [...this._filmsModel.getFilmsAll()]
      .filter((film) => film.comments.length > 0)
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 2);
    if (mostCommentedFilms.length === 0) {
      filmMostCommentedElement.remove();
    } else {
      const filmMostCommentedListElement = filmMostCommentedElement.querySelector(`.films-list__container`);
      for (let i = 0; i < FILM_CARDS_SPECIAL; i++) {
        const filmController = new FilmController(filmMostCommentedListElement, this._onDataChange, this._onViewChange, this._api);
        filmController.render(mostCommentedFilms[i]);
        this._specialFilmsControllers.push(filmController);
      }
    }
  }

  _renderShowMoreButton() {
    this._showMoreButton = new ShowMoreButton();
    render(this._filmsListElement, this._showMoreButton);

    this._showMoreButton.getElement().addEventListener(`click`, this.loadMoreFilms.bind(this));
  }

  _removeFilms() {
    this._filmsControllers.forEach((filmController) => filmController.destroy());
    this._filmsControllers = [];
  }

  _updateFilms() {
    this._removeFilms();
    this._filmsShown = 0;
    remove(this._showMoreButton);

    this._showMoreButton = new ShowMoreButton();
    render(this._filmsListElement, this._showMoreButton);
    this._showMoreButton.getElement().addEventListener(`click`, this.loadMoreFilms.bind(this));
    this.loadMoreFilms();
  }

  _onDataChange(filmController, oldData, newData) {
    this._api.setFilm(newData)
      .then((response) => {
        if (response.error) {
          return;
        }
        const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

        if (isSuccess) {
          filmController.render(newData);
        }
      });
  }

  _onViewChange() {
    [...this._filmsControllers, ...this._specialFilmsControllers].forEach((filmController) => {
      filmController._closeFilmDetails();
    });
  }

  _onFilterChange() {
    this._updateFilms();
  }
}
