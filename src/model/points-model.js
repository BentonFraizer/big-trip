import {generatePoint} from '../mock/point';

const POINTS_AMOUNT = 5;

export default class PointsModel {
  points = Array.from({length: POINTS_AMOUNT}, generatePoint);

  getPoints = () => this.points;
}
