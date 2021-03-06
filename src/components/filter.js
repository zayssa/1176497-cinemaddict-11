import AbstractComponent from './abstract-component';
import {FilterType} from '../utils/const';

export default class SiteMenu extends AbstractComponent {
  constructor(props) {
    super(props);
    this._data = props;
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${this._data.all.checked ? `main-navigation__item--active` : ``}">All movies</a>
        <a href="#watchlist" class="main-navigation__item ${this._data.watchlist.checked ? `main-navigation__item--active` : ``}">Watchlist <span class="main-navigation__item-count">${this._data.watchlist.count}</span></a>
        <a href="#history" class="main-navigation__item ${this._data.already_watched.checked ? `main-navigation__item--active` : ``}">History <span class="main-navigation__item-count">${this._data.already_watched.count}</span></a>
        <a href="#favorites" class="main-navigation__item ${this._data.favorite.checked ? `main-navigation__item--active` : ``}">Favorites <span class="main-navigation__item-count">${this._data.favorite.count}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional ${this._data.stats.checked ? `main-navigation__item--active` : ``}">Stats</a>
    </nav>`);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }
      const filterTypeCurrent = evt.target.getAttribute(`href`).substr(1);
      switch (filterTypeCurrent) {
        case `favorites`:
          handler(FilterType.FAVORITES);
          break;
        case `history`:
          handler(FilterType.HISTORY);
          break;
        default:
          handler(filterTypeCurrent);
      }
    });
  }
}
