import { createElement } from '../render';

const createFirstMessageTeplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

class FirstMessageView {
  constructor() {
    this._message = 'Click New Event to create your first point';
  }

  get _template() {
    return createFirstMessageTeplate(this._message);
  }

  get element() {
    if(!this._element) {
      this._element = createElement(this._template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FirstMessageView;

