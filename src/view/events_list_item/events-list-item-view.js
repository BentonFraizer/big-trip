import {createElement} from '../../utils.js';
import {createEventsListItemTemplate} from './events-list-item.tpl.js';

export default class EventsListItemView {
  #element = null;

  get template() {
    return createEventsListItemTemplate();
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
