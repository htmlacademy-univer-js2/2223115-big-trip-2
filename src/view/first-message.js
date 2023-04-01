import { createElement } from '../render';

const createFirstMessage= () => (
  'p class="trip-events__msg">Click New Event to create your first point</p>'
);

class FirstMessageView {
  get _template() {
    return createFirstMessage();
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

