import AbstractView from '../../framework/view/abstract-view.js';
import {createFiltersFormTemplate} from './filters-form.tpl.js';

export default class FiltersFormView extends AbstractView {
  get template() {
    return createFiltersFormTemplate();
  }
}
