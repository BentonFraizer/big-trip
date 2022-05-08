import {createElement} from '../../render.js';
import {createEventTemplate} from './event.tpl.js';

export default class EventView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createEventTemplate(this.point);
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
