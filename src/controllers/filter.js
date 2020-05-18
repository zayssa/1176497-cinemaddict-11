import SiteMenu from "../components/filter.js";
import {FilterType} from "../utils/const";
import {render, replace} from "../utils/render.js";
import {getFilmsByFilter} from "../utils/filter.js";

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._siteMenuComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._filmsModel.getFilmsAll();
    const filters = {};
    Object.values(FilterType).forEach((filterType) => {
      filters[filterType] = {
        count: getFilmsByFilter(allFilms, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._siteMenuComponent;

    this._siteMenuComponent = new SiteMenu(filters);
    this._siteMenuComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._siteMenuComponent, oldComponent);
    } else {
      render(container, this._siteMenuComponent);
    }
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
