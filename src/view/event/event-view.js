import {createElement} from '../../render.js';
import {createEventTemplate} from './event.tpl.js';

export default class EventView {
  getTemplate() {
    return createEventTemplate();
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
