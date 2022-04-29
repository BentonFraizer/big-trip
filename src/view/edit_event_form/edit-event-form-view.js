import {createElement} from '../../render.js';
import {createEditEventFormTemplate} from './edit-event-form.tpl.js';

export default class EditEventFormView {
  getTemplate() {
    return createEditEventFormTemplate();
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
