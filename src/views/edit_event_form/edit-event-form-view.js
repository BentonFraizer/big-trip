import AbstractView from '../../framework/view/abstract-view';
import {createEditEventFormTemplate} from './edit-event-form.tpl';

const EMPTY_POINT = {
  'id': null,
  'type': '',
  'dateFrom': '',
  'dateTo': '',
  'destination': {
    'name': '',
    'description': '',
    'pictures': [],
  },
  'basePrice': null,
  'isFavorite': false,
  'offers': [],
};

export default class EditEventFormView extends AbstractView {
  editable = true;
  #point = null;
  #offers = null;

  constructor(point = EMPTY_POINT, offers) {
    super();
    this.#point = point;
    this.#offers = offers;
  }

  get template() {
    return createEditEventFormTemplate(this.#point, this.#offers);
  }

  setFormSubmitHandler (callback){
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this.#point, this.#offers);
  };

  setCloseEditFormClickHandler (callback){
    this._callback.closeEditFormClick = callback;
    this.element.querySelector('form .event__rollup-btn').addEventListener('click', this.#closeEditFormClickHandler);
  }

  #closeEditFormClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeEditFormClick();
  };
}
