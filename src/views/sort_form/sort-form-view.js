import AbstractView from '../../framework/view/abstract-view.js';
import {createSortFormTemplate} from './sort-form.tpl.js';

export default class SortFormView extends AbstractView {
  get template() {
    return createSortFormTemplate();
  }
}
