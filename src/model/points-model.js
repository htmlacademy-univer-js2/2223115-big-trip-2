import Observable from '../framework/observable';

class PointsModel extends Observable {
  constructor(pointsApiService) {
    super();
    this._pointsApiService = pointsApiService;
    this._points = [];
  }

  get points() {
    return this._points;
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

  init = async () => {
    try {
      const points = await this._pointsApiService.points;
      this._points = points.map(this._adaptToClient);
    } catch(err) {
      this._points = [];
    }
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
