import {createElement} from '../../render.js';
import {createEventListItemFilledTemplate} from './events-list-item-filled.tpl.js';

export default class EventListItemFilledView {
  getTemplate() {
    return createEventListItemFilledTemplate();
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
