import AbstractView from '../framework/view/abstract-view.js';

const createNoTaskTemplate = () => (
  `<p class="board__no-tasks">
    Loading...
  </p>`
);

class LoadingView extends AbstractView {
  get template() {
    return createNoTaskTemplate();
  };
}

export default LoadingView;
