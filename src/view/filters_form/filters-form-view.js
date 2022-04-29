import {createElement} from '../../render.js';
import {createFiltersFormTemplate} from './filters-form.tpl.js';

export default class FiltersFormView {
  getTemplate() {
    return createFiltersFormTemplate();
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
