import {createElement} from '../../utils.js';
import {createEditEventFormTemplate} from './edit-event-form.tpl.js';

export default class EditEventFormView {
  constructor(points, offers) {
    this.points = points;
    this.offers = offers;
  }

  getTemplate() {
    return createEditEventFormTemplate(this.points, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
