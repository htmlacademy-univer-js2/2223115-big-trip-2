import { render, remove, RenderPosition} from '../framework/render';
import { sortByDay, sortByPrice, sortByTime } from '../utils';
import SortView from '../view/sort';
import TripListView from '../view/trip-list';
import FirstMessageView from '../view/first-message';
import LoadingView from '../view/loading-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import { SORTED_TYPE, FILTERS_MESSAGE, UserAction, UpdateType, FILTERS_TYPE} from '../const';
import { filters } from '../utils';

class TripPresenter { 
  constructor(container, pointsModel, offersModel, destinationsModel, filterModel) {
    this._tripListComponent = new TripListView();
    this._loadingComponent = new LoadingView();
    this._sortComponent = null;
    this._firstNessageComponent = null;
    this._container = container;
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._filterModel = filterModel;
    this._pointPresenter = new Map();
    this._newPointPresenter = new NewPointPresenter(this._tripListComponent.element, this._handleViewAction);
    this._currentSortType = SORTED_TYPE.DAY;
    this._isLoading = true;

    this._pointsModel.addObserver(this._handleModelEvent)
    this._filterModel.addObserver(this._handleModelEvent)
  }

  get points() {
    const filterType = this._filterModel.filter;
    const points = this._pointsModel.points;
    const filteredPoints = filters[filterType](points);

    switch (this._currentSortType){
      case SORTED_TYPE.PRICE:
        return (sortByPrice([...filteredPoints], this._offersModel.offers))
      case SORTED_TYPE.TIME:
        return sortByTime([...filteredPoints])
    }

    return sortByDay([...filteredPoints]);
  }

  init() {
    this._renderTrip();
  }

  createPoint = (callback) => {
    this._currentSortType = SORTED_TYPE.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FILTERS_TYPE.EVERYTHING);
    this._newPointPresenter.init(callback, this._offersModel.offers ,this._destinationsModel.destinations, this._destinationsModel.cities)
  }

  _handleModeChange = () => {
    this._newPointPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView())
  }

  _handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  _handleModelEvent = (updateType, update) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(update.id).init(update)
        break;
      case UpdateType.MINOR:
        this._clearList()
        this._renderTrip()
        break;
      case UpdateType.MAJOR:
        this._clearList({resetSortType: true})
        this._renderTrip()
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  };

  _renderLoading = () => {
    render(this._loadingComponent, this._container)
  }

  _renderFirstMessage = () => {
    const filterType = this._filterModel.filter
    const message = FILTERS_MESSAGE[filterType]
    this._firstNessageComponent = new FirstMessageView(message)
    render(this._firstNessageComponent, this._container);
  }

  _handleSortTypeChange = (sortType) => {
    if (sortType === this._currentSortType){
      return
    }

    this._currentSortType = sortType
    this._clearList()
    this._renderTrip()
  }

  _renderSort = () => {
      this._sortComponent = new SortView(this._currentSortType)
      render(this._sortComponent, this._container, RenderPosition.AFTERBEGIN);
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoints = (points) => {
    points.forEach((point) => this._renderPoint(point))
  }

  _renderPoint(point) {
    const offers = this._offersModel.offers;
    const destinations = this._destinationsModel.destinations;
    const cities = this._destinationsModel.cities;

    const pointPresenter = new PointPresenter(
      this._tripListComponent.element, 
      this._pointsModel,
      offers,
      destinations,
      cities,
      this._handleViewAction,
      this._handleModeChange);

    pointPresenter.init(point)
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderTrip() {
    render(this._tripListComponent, this._container);
    
    if (this._isLoading) {
      this._renderLoading();
      return
    }

    this._renderSort()

    if (this.points.length === 0) {
      this._renderFirstMessage()
      return
    }

    this._renderPoints(this.points)
  }
  
  _clearList = ({resetSortType = false} = {}) => {
    this._newPointPresenter.destroy();

    this._pointPresenter
      .forEach((presenter) => presenter.destroy())
    this._pointPresenter.clear()

    remove(this._sortComponent)
    remove(this._loadingComponent)
    remove(this._firstNessageComponent)

    if (resetSortType) {
      this._currentSortType = SORTED_TYPE.DAY
    }
  }
}

export default TripPresenter;
