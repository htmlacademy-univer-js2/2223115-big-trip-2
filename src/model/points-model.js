import Observable from '../framework/observable';
import { UpdateType } from '../const';

class PointsModel extends Observable {
  constructor(pointsApiService) {
    super();
    this._pointsApiService = pointsApiService;
    this._points = [];
  };

  get points() {
    return this._points;
  };

  init = async () => {
    try {
      const points = await this._pointsApiService.points;
      this._points = points.map(this._adaptToClient);
    } catch(err) {
      this._points = [];
    }

    this._notify(UpdateType.INIT);
  };

  updatePoint = async (updateType, update) => {
    const updatedIndex = this._points.findIndex((point) => point.id === update.id);

    if (updatedIndex === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this._pointsApiService.updatePoints(update);
      const updatedPoint = this._adaptToClient(response);
      this._points = [
        ...this._points.slice(0, updatedIndex),
        updatedPoint,
        ...this._points.slice(updatedIndex + 1)
      ];
  
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response = await this._pointsApiService.addPoint(update);
      const updatedPoint = this._adaptToClient(response);
      this._points = [updatedPoint, 
        ...this._points];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  };

  deletePoint = async (updateType, update) => {
    const deletedIndex = this._points.findIndex((point) => point.id === update.id);

    if (deletedIndex === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this._pointsApiService.deletePoint(update);
      this._points = [
        ...this._points.slice(0, deletedIndex),
        ...this._points.slice(deletedIndex + 1)
      ]
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  };

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
}

export default PointsModel;

