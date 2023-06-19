import AbstractView from "../framework/view/abstract-view";

const createFirstMessageTeplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

class FirstMessageView extends AbstractView {
  constructor(message) {
    super();
    this._message = message;
  };

  get template() {
    return createFirstMessageTeplate(this._message);
  };
}

export default FirstMessageView;
