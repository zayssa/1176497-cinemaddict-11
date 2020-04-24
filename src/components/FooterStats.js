import {createElement} from './utils';


export const createFooterStatsTemplate = (total) => {
  return (
    `<p>${total} movies inside</p>`
  );
};


export default class FooterStats {
  constructor(props) {
    this._data = props;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._data);
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
