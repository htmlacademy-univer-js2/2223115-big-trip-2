import { COUNT_POINT } from '../const';
import generatePoint from '../fish-data/point';
import offersByType from '../fish-data/offer';
import destinations from '../fish-data/destination';

class PointsModel {
  constructor() {
    this._points = Array.from({length: COUNT_POINT}, generatePoint);
    this._offers = offersByType;
    this._destinations = destinations;
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

}

export default PointsModel;
