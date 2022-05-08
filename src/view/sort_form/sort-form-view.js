import {createElement} from '../../utils.js';
import {createSortFormTemplate} from './sort-form.tpl.js';

export default class SortFormView {
  getTemplate() {
    return createSortFormTemplate();
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
