import AbstractComponent from './AbstractComponent';


export const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};


export default class ShowMoreButton extends AbstractComponent {
  constructor(props) {
    super(props);
    this._data = props;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  getTemplate() {
    return createShowMoreButtonTemplate(this._data);
  }
}
