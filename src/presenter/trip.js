import { render } from '../render';
import PointView from '../view/point';
import EditPointView from '../view/edit-point';
import NewPointView from '../view/new-point';
import SortView from '../view/sort';
import TripListView from '../view/trip-list';

class Trip {
  constructor(container, pointsModel) {
    this._component = new TripListView();
    this._container = container;
    this._pointsModel = pointsModel;
    this._listPoints = this._pointsModel.points;
  }

  init() {
    render(new SortView(), this._container);
    render(this._component, this._container);

    render(new NewPointView(this._pointsModel.getOffers(),
      this._pointsModel.getDestination()), this._component._element);

    render(new EditPointView(this._listPoints[0],
      this._pointsModel.getOffers(this._listPoints[0]),
      this._pointsModel.getDestination(this._listPoints[0])), this._component._element);

    for (let i = 0; i < this._listPoints.length; i++) {
      const currentPoint = this._listPoints[i];
      const curretnOffers = this._pointsModel.getOffers(currentPoint);
      const currentDesctination = this._pointsModel.getDestination(currentPoint);
      render(new PointView(currentPoint, curretnOffers,currentDesctination), this._component._element);
    }
  }
}

export default Trip;
