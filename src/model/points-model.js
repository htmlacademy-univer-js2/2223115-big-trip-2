import generatePoint from '../fish-data/point';
import offersByType from '../fish-data/offer';
import { COUNT_POINT } from '../const';

class PointsModel {
  constructor() {
    this.points = Array.from({length: COUNT_POINT}, generatePoint);
    this.offers = offersByType;
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
}

export default PointsModel;
