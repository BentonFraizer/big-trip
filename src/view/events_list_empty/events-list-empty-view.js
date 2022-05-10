import {createElement} from '../../utils.js';
import {createEventsListEmptyTemplate} from './events-list-empty.tpl.js';

export default class EventsListEmptyView {
  #element = null;

  get template() {
    return createEventsListEmptyTemplate();
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
