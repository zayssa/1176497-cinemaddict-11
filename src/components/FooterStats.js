import AbstractComponent from './AbstractComponent';


export const createFooterStatsTemplate = (total) => {
  return (
    `<p>${total} movies inside</p>`
  );
};


export default class FooterStats extends AbstractComponent {
  constructor(props) {
    super(props);
    this._data = props;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._data);
  }
}
