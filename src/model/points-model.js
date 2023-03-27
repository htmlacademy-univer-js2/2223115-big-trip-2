import { COUNT_POINT } from '../const';
import generatePoint from '../fish-data/point';
import offersByType from '../fish-data/offer';
import destinations from '../fish-data/destination';

class PointsModel {
  constructor() {
    this.points = Array.from({length: COUNT_POINT}, generatePoint);
    this.offers = offersByType;
    this.destinations = destinations;
  }

  getPoints() {
    return this.points;
  }

  getOffers(point) {
    if (point) {
      return this.offers.find((x) => x.type === point['type'])['offers'];
    }
    return this.offers;
  }

  getDestination(point) {
    if (point){
      return destinations.find((x) => x.id === point['destination']);
    }
    return this.destinations;
  }

}

export default PointsModel;
