import {createElement} from '../../utils.js';
import {createFiltersFormTemplate} from './filters-form.tpl.js';

export default class FiltersFormView {
  #element = null;

  get template() {
    return createFiltersFormTemplate();
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
