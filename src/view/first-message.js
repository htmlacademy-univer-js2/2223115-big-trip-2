import AbstractView from "../framework/view/abstract-view";

const createFirstMessageTeplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

class FirstMessageView extends AbstractView {
  constructor() {
    super()
    this._message = 'Click New Event to create your first point';
  }

  get template() {
    return createFirstMessageTeplate(this._message);
  }
}

export default FirstMessageView;

