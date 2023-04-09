import { render } from '../framework/render';
import PointView from '../view/point';
import EditPointView from '../view/edit-point';
import NewPointView from '../view/new-point';
import SortView from '../view/sort';
import TripListView from '../view/trip-list';
import FirstMessageView from '../view/first-message';

class TripPresenter {
  constructor(container, pointsModel) {
    this._ULcomponent = new TripListView();
    this._container = container;
    this._pointsModel = pointsModel;
    this._listPoints = [];
  }

  init() {
    this._listPoints = this._pointsModel.points;
    this._renderTrip();
  }

  _renderTrip() {
    if (this._listPoints.length === 0) {
      render(new FirstMessageView(), this._container);
    }
    else {
      render(new SortView(), this._container);
      render(this._ULcomponent, this._container);

      render(new NewPointView(this._pointsModel.getOffers(),
        this._pointsModel.getDestination()), this._ULcomponent.element);

      for (let i = 0; i < this._listPoints.length; i++) {
        const currentPoint = this._listPoints[i];
        const curretnOffers = this._pointsModel.getOffers(currentPoint);
        const currentDesctination = this._pointsModel.getDestination(currentPoint);
        this._renderPoint(currentPoint, curretnOffers, currentDesctination);
      }
    }
  }

  _renderPoint(point, offers, destination) {
    const pointComponent = new PointView(point, offers, destination);
    const pointEditComponent = new EditPointView(point, offers, destination);

    const replacePointToForm = () => {
      this._ULcomponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this._ULcomponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
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

    return render(pointComponent, this._ULcomponent.element);
  }
}

export default TripPresenter;
