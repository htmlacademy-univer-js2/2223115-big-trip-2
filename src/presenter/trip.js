import { render, RenderPosition } from '../render';
import PointView from '../view/point';
import EditPointView from '../view/edit-point';
import NewPointView from '../view/new-point';
import SortView from '../view/sort';
import TripListView from '../view/trip-list';

class Trip {
  constructor({container}) {
    this.component = new TripListView();
    this.container = container;
  }

  init() {
    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new NewPointView(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new EditPointView(), this.component.getElement(), RenderPosition.BEFOREEND);

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.component.getElement(), RenderPosition.BEFOREEND);
    }
  }
}

export default Trip;
