export default class PointsModel {
  #points = null;

  constructor(POINTS_AMOUNT, outerPoint){
    this.#points = Array.from({length: POINTS_AMOUNT}, outerPoint);
  }

  get points () {
    return this.#points;
  }
}
