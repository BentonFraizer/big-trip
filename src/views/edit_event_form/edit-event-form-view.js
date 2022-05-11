import {createElement} from '../../utils.js';
import {createEditEventFormTemplate} from './edit-event-form.tpl.js';

export default class EditEventFormView {
  editable = true;
  #element = null;
  #points = null;
  #offers = null;

  constructor(points, offers) {
    this.#points = points;
    this.#offers = offers;
  }

  get template() {
    return createEditEventFormTemplate(this.#points, this.#offers);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
