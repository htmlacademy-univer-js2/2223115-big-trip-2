import generatePoint from '../fish-data/point';

class PointModel {
  constructor() {
    this.point = generatePoint();
  }

  getPoint() {
    return this.point;
  }
}

export default PointModel;
