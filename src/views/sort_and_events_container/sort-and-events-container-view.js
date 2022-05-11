import {createElement} from '../../utils.js';
import {createSortAndEventsContainerTemplate} from './sort-and-events-container.tpl.js';

export default class SortAndEventsContainerView {
  #element = null;

  get template() {
    return createSortAndEventsContainerTemplate();
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


