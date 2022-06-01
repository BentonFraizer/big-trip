import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
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

const EMPTY_OFFERS = [];

export default class EditEventFormView extends AbstractStatefulView {
  editable = true;

  constructor(point = EMPTY_POINT, offers = EMPTY_OFFERS) {
    super();
    this._state = EditEventFormView.parseDataToState(point, offers);
    this.#setInnerHandlers();
  }

  get template() {
    return createEditEventFormTemplate(this._state.point, this._state.offers);
  }

  setFormSubmitHandler (callback){
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseEditFormClickHandler(this._callback.closeEditFormClick);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditEventFormView.parseStateToData(this._state.point, this._state.offers));
  };

  //Метод для обработки смены точки маршрута с обновлением количества офферов для каждого типа
  #changeCurrentType = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'FIELDSET') {
      if (evt.target.innerHTML !== this._state.point.type) {
        const newType = evt.target.innerHTML;
        this.updateElement({
          point: {
            ...this._state.point,
            type: newType,
            offers: []
          },
          offers: [...this._state.offers],
        });
      }
    }
  };

  //Метод для обработки выбора дополнительных опций
  #pickOffers = (evt) => {
    if (evt.target.id.includes('event-offer')) {
      const offerId = Number(evt.target.id.replace('event-offer-', ''));
      let pickedOffers = this._state.point.offers;
      if (pickedOffers.includes(offerId)) {
        const refreshedOffers = pickedOffers.filter((offer) => offer !== offerId);
        pickedOffers = refreshedOffers;
      } else if (!(pickedOffers.includes(offerId))){
        pickedOffers.push(offerId);
      }

      this.updateElement({
        point: {
          ...this._state.point,
          offers: pickedOffers,
        },
        offers: [...this._state.offers],
      });
    }
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('click', this.#changeCurrentType);

    const offersElement = this.element.querySelector('.event__available-offers');
    if (offersElement) {
      offersElement.addEventListener('click', this.#pickOffers);
    }
  };

  static parseDataToState = (pointData, offersData) => ({
    point: {
      ...pointData,
      pickedOffers: pointData.offers,
    },
    offers: [...offersData],
  });

  static parseStateToData = (statePoint, stateOffers) => {
    const point = {...statePoint,};
    const offers = [...stateOffers];

    delete point.pickedOffers;
    return {point, offers};
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
