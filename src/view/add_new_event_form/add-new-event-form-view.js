import {createElement} from '../../render.js';
import {createNewEventFormTemplate} from './add-new-event-form.tpl.js';

export default class NewEventFormView {
  #element = null;

  get template() {
    return createNewEventFormTemplate();
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
