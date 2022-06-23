import AbstractView from '../../framework/view/abstract-view.js';
import {createTripInfoTemplate} from './trip-info-view.tpl.js';

export default class TripInfoView extends AbstractView {
  #points = null;
  #offers = null;

  constructor(points, offers) {
    super();
    this.#points = points;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#offers);
  }
}
