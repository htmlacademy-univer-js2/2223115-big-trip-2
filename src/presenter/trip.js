import { render, replace } from '../framework/render';
import PointView from '../view/point';
import EditPointView from '../view/edit-point';
import NewPointView from '../view/new-point';
import SortView from '../view/sort';
import TripListView from '../view/trip-list';
import FirstMessageView from '../view/first-message';
import generateSorting from '../fish-data/sorting';

class TripPresenter {
  constructor(container, pointsModel) {
    this._tripListComponent = new TripListView();
    this._container = container;
    this._pointsModel = pointsModel;
    this._listPoints = [];
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
    const offers = this._pointsModel.getOffers(point)
    const destination = this._pointsModel.getDestination(point)
    const pointComponent = new PointView(point, offers, destination);
    const pointEditComponent = new EditPointView(point, offers, destination);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint()
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setButtonClickHandler(() => {
      replaceFormToPoint()
      document.removeEventListener('keydown', onEscKeyDown);
    });

    return render(pointComponent, this._tripListComponent.element);
  }
}

export default TripPresenter;
