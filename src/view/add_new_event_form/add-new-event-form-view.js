import {createElement} from '../../render.js';
import {createNewEventFormTemplate} from './add-new-event-form.tpl.js';

export default class NewEventFormView {
  getTemplate() {
    return createNewEventFormTemplate();
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
