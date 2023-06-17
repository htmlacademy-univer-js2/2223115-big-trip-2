import { render} from '../framework/render';
import { updateItem, sortByDay, sortByPrice, sortByTime } from '../utils';
import NewPointView from '../view/new-point';
import SortView from '../view/sort';
import TripListView from '../view/trip-list';
import FirstMessageView from '../view/first-message';
import PointPresenter from './point-presenter';
import { SORTED_TYPE } from '../const';

class TripPresenter { 
  constructor(container, pointsModel) {
    this._tripListComponent = new TripListView();
    this._sortComponent = new SortView()
    this._container = container;
    this._pointsModel = pointsModel;
    this._listPoints = [];
    this._pointPresenter = new Map();
    this._currentSortType = SORTED_TYPE.DAY
    this._sourcedListPoints = []
  }

  get points() {
    return this._pointsModel.points;
  }

  init() {
    this._listPoints = sortByDay(this._pointsModel.points);
    this._renderTrip();
    this._sourcedListPoints = [...this._pointsModel.points];
  }

  _handlePointChange = (updatedPoint) => {
    this._listPoints = updateItem(this._listPoints, updatedPoint)
    this._sourcedListPoints = updateItem(this._sourcedListPoints, updatedPoint)
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint)
  }

  _handleModeChange = () => {
    this._pointPresenter.forEach((presenter) => presenter.resetView())
  }

  _renderFirstMessage = () => {
    render(new FirstMessageView(), this._container);
  }

  _sortPoints = (sortType) => {
    switch (sortType) {
      case SORTED_TYPE.PRICE:
        this._listPoints = sortByPrice(this._pointsModel)
        break;
      case SORTED_TYPE.TIME:
        this._listPoints = sortByTime(this._listPoints)
        break;
      default:
        this._listPoints = [...this._sourcedListPoints]
    }
    this._currentSortType = sortType
  }

  _handleSortTypeChange = (sortType) => {
    if (sortType === this._currentSortType){
      return
    }

    this._sortPoints(sortType)
    this._clearPointList()
    this._renderPoints()
  }

  _renderSort = () => {
      render(this._sortComponent, this._container);
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
    const pointPresenter = new PointPresenter(
      this._tripListComponent.element, 
      this._pointsModel,
      this._handlePointChange,
      this._handleModeChange);

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
