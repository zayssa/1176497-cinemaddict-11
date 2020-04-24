import {createElement} from './utils';


export const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};


export default class ShowMoreButton {
  constructor(props) {
    this._data = props;
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButtonTemplate(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
