import {createElement} from '../../render.js';
import {createEventListItemFilledTemplate} from './events-list-item-filled.tpl.js';

export default class EventListItemFilledView {
  #element = null;

  get template() {
    return createEventListItemFilledTemplate();
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
