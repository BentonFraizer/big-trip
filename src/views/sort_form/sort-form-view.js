import AbstractView from '../../framework/view/abstract-view';
import {createSortFormTemplate} from './sort-form.tpl';

export default class SortFormView extends AbstractView {
  get template() {
    return createSortFormTemplate();
  }
}
