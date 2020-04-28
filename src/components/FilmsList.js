import {createElement} from './utils';

export const createFilmsTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container"></div>
      </section>

      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>

        <div class="films-list__container"></div>
      </section>

      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>

        <div class="films-list__container"></div>
      </section>
    </section>`
  );
};

export default class FilmsList {
  constructor(props) {
    this._data = props;
    this._element = null;
  }

  getTemplate() {
    return createFilmsTemplate(this._data);
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
