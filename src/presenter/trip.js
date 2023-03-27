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
      this._pointsModel.getDestination()), this._component.element);

    for (let i = 0; i < this._listPoints.length; i++) {
      const currentPoint = this._listPoints[i];
      const curretnOffers = this._pointsModel.getOffers(currentPoint);
      const currentDesctination = this._pointsModel.getDestination(currentPoint);
      this._renderPoint(currentPoint, curretnOffers, currentDesctination);
    }
  }

  _renderPoint(point, offers, destination) {
    const pointComponent = new PointView(point, offers, destination);
    const pointEditComponent = new EditPointView(point, offers, destination);

    const replacePointToForm = () => {
      this._component.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this._component.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onSaveButtonClick = (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      pointEditComponent.element.removeEventListener('submit', onSaveButtonClick);
    };

    const onRollupButtonClick = () => {
      replaceFormToPoint();
      pointEditComponent.element.removeEventListener('click', onRollupButtonClick);
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();

      document.addEventListener('keydown', onEscKeyDown);

      pointEditComponent.element.querySelector('form').addEventListener('submit', onSaveButtonClick);

      pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', onRollupButtonClick);
    });

    return render(pointComponent, this._component.element);
  }


}

export default Trip;
