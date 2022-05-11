import {createElement} from '../../utils.js';
import {createEventsListTemplate} from './events-list.tpl.js';

export default class EventsListView {
  #element = null;

  get template() {
    return createEventsListTemplate();
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
