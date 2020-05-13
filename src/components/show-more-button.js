import AbstractComponent from './abstract-component';

export default class ShowMoreButton extends AbstractComponent {
  constructor(props) {
    super(props);
    this._data = props;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }
}
