import AbstractComponent from './abstract-component';

export default class FooterStats extends AbstractComponent {
  constructor(props) {
    super(props);
    this._total = props;
  }

  getTemplate() {
    return (
      `<p>${this._total} movies inside</p>`
    );
  }
}
