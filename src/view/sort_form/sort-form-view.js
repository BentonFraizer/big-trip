import {createElement} from '../../utils.js';
import {createSortFormTemplate} from './sort-form.tpl.js';

export default class SortFormView {
  #element = null;

  get template() {
    return createSortFormTemplate();
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
