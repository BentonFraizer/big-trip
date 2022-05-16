import AbstractView from '../../framework/view/abstract-view.js';
import {createTripInfoTemplate} from './trip-info-view.tpl.js';

export default class TripInfoView extends AbstractView {
  get template() {
    return createTripInfoTemplate();
  }
}
