import AbstractView from '../../framework/view/abstract-view.js';
import {createEditEventFormTemplate} from './edit-event-form.tpl.js';

const EMPTY_POINT = {
  'id': null,
  'type': '',
  'dateFrom': null,
  'dateTo': null,
  'destination': {
    'name': '',
    'description': '',
    'pictures': [],
  },
  'basePrice': null,
  'isFavorite': false,
  'offers': [],
};

export default class EditEventFormView extends AbstractView {
  editable = true;
  #points = null;
  #offers = null;

  constructor(points = EMPTY_POINT, offers) {
    super();
    this.#points = points;
    this.#offers = offers;
  }

  get template() {
    return createEditEventFormTemplate(this.#points, this.#offers);
  }
}
