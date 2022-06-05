import Observable from '../framework/observable';

export default class PointsModel extends Observable {
  #points = null;

  constructor(POINTS_AMOUNT, outerPoint){
    super();
    this.#points = Array.from({length: POINTS_AMOUNT}, outerPoint);
  }

  get points () {
    return this.#points;
  }
}
