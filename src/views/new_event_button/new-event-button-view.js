import AbstractView from '../../framework/view/abstract-view';
import {createNewEventButtonTemplate} from './new-event-button-tpl';

export default class NewEventButtonView extends AbstractView {
  get template() {
    return createNewEventButtonTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
