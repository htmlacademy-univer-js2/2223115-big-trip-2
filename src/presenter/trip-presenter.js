import { render} from '../framework/render';
import { sortByDay, sortByPrice, sortByTime } from '../utils';
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
    this._pointsModel.addObserver(this._handleModelEvent)
    this._pointPresenter = new Map();
    this._currentSortType = SORTED_TYPE.DAY
  }

  get points() {
    switch (this._currentSortType){
      case SORTED_TYPE.PRICE:
        return sortByPrice(this._pointsModel)
      case SORTED_TYPE.TIME:
        return sortByTime([...this._pointsModel.points])
    }

    return sortByDay([...this._pointsModel.points]);
  }

  init() {
    this._renderTrip();
  }

  _handleModeChange = () => {
    this._pointPresenter.forEach((presenter) => presenter.resetView())
  }

  _handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  _handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  _renderFirstMessage = () => {
    render(new FirstMessageView(), this._container);
  }

  _handleSortTypeChange = (sortType) => {
    if (sortType === this._currentSortType){
      return
    }

    this._currentSortType = sortType
    this._clearPointList()
    this._renderPoints(this.points)
  }

  _renderSort = () => {
      render(this._sortComponent, this._container);
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNewPoint = () => {
    render(new NewPointView(this._pointsModel.getOffers(),
      this._pointsModel.getDestination()), this._tripListComponent.element);
  }

  _renderPoints = (points) => {
    points.forEach((point) => this._renderPoint(point))
  }

  _renderTripList = () => {
    render(this._tripListComponent, this._container);
    this._renderPoints(this.points)
  }

  _renderTrip() {
    if (this.points.length === 0) {
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
      this._handleViewAction,
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
