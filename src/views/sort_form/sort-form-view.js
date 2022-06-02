import AbstractView from '../../framework/view/abstract-view';
import {createSortFormTemplate} from './sort-form.tpl';

export default class SortFormView extends AbstractView {
  get template() {
    return createSortFormTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (!(evt.target.id === 'sort-day' || evt.target.id === 'sort-time' || evt.target.id === 'sort-price')) {
      return;
    }

    if (evt.target.id === 'sort-event' || evt.target.id === 'sort-offers') {
      evt.preventDefault();
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
