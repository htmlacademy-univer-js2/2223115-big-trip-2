import { render} from '../framework/render';
import NewPointView from '../view/new-point';
import SortView from '../view/sort';
import TripListView from '../view/trip-list';
import FirstMessageView from '../view/first-message';
import generateSorting from '../fish-data/sorting';
import PointPresenter from './point-presenter';

class TripPresenter {
  constructor(container, pointsModel) {
    this._tripListComponent = new TripListView();
    this._container = container;
    this._pointsModel = pointsModel;
    this._listPoints = [];
    this._pointPresenter = new Map();
  }

  init() {
    this._listPoints = this._pointsModel.points;
    this._renderTrip();
  }

  _renderFirstMessage = () => {
    render(new FirstMessageView(), this._container);
  }

  _renderSort = () => {
    const sorting = generateSorting(this._pointsModel.points)
      render(new SortView(sorting), this._container);
  }

  _renderNewPoint = () => {
    render(new NewPointView(this._pointsModel.getOffers(),
      this._pointsModel.getDestination()), this._tripListComponent.element);
  }

  _renderPoints = () => {
    this._listPoints
      .forEach((point) => this._renderPoint(point))
  }

  _renderTripList = () => {
    render(this._tripListComponent, this._container);
    this._renderPoints()
  }

  _renderTrip() {
    if (this._listPoints.length === 0) {
      this._renderFirstMessage()
      return
    }

    this._renderSort()
    this._renderTripList()
  }
  
  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent.element, this._pointsModel);
    pointPresenter.init(point)
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _clearPointList = () => {
    this._pointPresenter
      .forEach((presenter) => presenter.destroy())
    this._pointPresenter.clear()
  }
}

export default TripPresenter;
