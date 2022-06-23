import AbstractView from '../../framework/view/abstract-view.js';
import {createTripInfoTemplate} from './trip-info-view.tpl.js';

export default class TripInfoView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripInfoTemplate(this.#points);
  }
}
