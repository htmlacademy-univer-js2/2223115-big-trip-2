import generatePoint from '../fish-data/point';

class PointsModel {
  constructor() {
    this.points = Array.from({length: 10}, generatePoint);
  }

  getPoints() {
    return this.points;
  }
}

export default PointsModel;
