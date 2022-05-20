import AbstractView from '../../framework/view/abstract-view';
import {createFiltersFormTemplate} from './filters-form.tpl';

export default class FiltersFormView extends AbstractView {
  get template() {
    return createFiltersFormTemplate();
  }
}
