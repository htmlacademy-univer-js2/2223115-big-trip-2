import { render } from '../render';
import PointView from '../view/point';
import EditPointView from '../view/edit-point';
import NewPointView from '../view/new-point';
import SortView from '../view/sort';
import TripListView from '../view/trip-list';

class Trip {
  constructor(container, pointsModel) {
    this.component = new TripListView();
    this.container = container;
    this.pointsModel = pointsModel;
    this.listPoints = this.pointsModel.getPoints();
  }

  init() {
    render(new SortView(), this.container);
    render(this.component, this.container);
    render(new NewPointView(), this.component.getElement());
    render(new EditPointView(this.listPoints[0]), this.component.getElement());
    for (let i = 0; i < this.listPoints.length; i++) {
      render(new PointView(this.listPoints[i]), this.component.getElement());
    }
  }
}

export default Trip;
