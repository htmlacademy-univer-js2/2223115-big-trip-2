import { COUNT_POINT } from '../const';
import Observable from '../framework/observable';
import generatePoint from '../fish-data/point';
import offersByType from '../fish-data/offer';
import destinations from '../fish-data/destination';

class PointsModel extends Observable {
  constructor(pointsApiService) {
    super();
    this._pointsApiService = pointsApiService;
    this._points = Array.from({length: COUNT_POINT}, generatePoint);
    this._offers = offersByType;
    this._destinations = destinations;

    this._pointsApiService.points.then((points) => {
      console.log(points.map(this._adaptToClient));
    });
  }

  get points() {
    return this._points;
  }

  getOffers(point) {
    if (point) {
      return this._offers.find((x) => x.type === point['type'])['offers'];
    }
    return this._offers;
  }

  getDestination(point) {
    if (point){
      return this._destinations.find((x) => x.id === point['destination']);
    }
    return this._destinations;
  }

  _adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };

  updatePoint = (updateType, update) => {
    const updatedIndex = this._points.findIndex((point) => point.id === update.id);

    this._points = [
      ...this._points.slice(0, updatedIndex),
      update,
      ...this._points.slice(updatedIndex + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint = (updateType, update) => {
    this._points = [update, 
      ...this._points];

    this._notify(updateType, update);
  }

  deletePoint = (updateType, update) => {
    const deletedIndex = this._points.findIndex((point) => point.id === update.id);

    this._points = [
      ...this._points.slice(0, deletedIndex),
      ...this._points.slice(deletedIndex + 1)
    ]
    
    this._notify(updateType, update);
  }
}

export default PointsModel;
