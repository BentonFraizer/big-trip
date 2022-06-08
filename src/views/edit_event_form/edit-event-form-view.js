import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import {createEditEventFormTemplate} from './edit-event-form.tpl';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

import 'flatpickr/dist/flatpickr.min.css';

const EMPTY_POINT = {
  'type': 'taxi',
  'dateFrom': dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
  'dateTo': dayjs().add(1, 'd').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
  'destination': {
    'name': '',
    'description': null,
    'pictures': [],
  },
  'basePrice': 0,
  'isFavorite': false,
  'offers': [],
};

const EMPTY_OFFERS = [];

export default class EditEventFormView extends AbstractStatefulView {
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point = EMPTY_POINT, offers = EMPTY_OFFERS) {
    super();
    this._state = EditEventFormView.parseDataToState(point, offers);
    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  get template() {
    return createEditEventFormTemplate(this._state.point, this._state.offers);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo){
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  //Метод для сброса несохранённых данных. (Используется когда форма редактирования открыта и пользователь нажимает на Esc либо на кнопку закрытия задачи)
  reset = (pointData, offersData) => {
    this.updateElement(
      EditEventFormView.parseDataToState(pointData, offersData),
    );
  };

  setFormSubmitHandler (callback){
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setDeleteClickHandler (callback) {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#pointDeleteClickHandler);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseEditFormClickHandler(this._callback.closeEditFormClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  #changeBasePriceInputHandler = (evt) => {
    //Реализация добавления только цифр в input
    evt.preventDefault();
    if (evt.data === '-' || evt.data === '+' || evt.data === 'e') {
      evt.target.value = '';
    }
    //Запрет нуля первым значением
    evt.target.value = evt.target.value.replace(/^0/, '');
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value,
      },
      offers: [...this._state.offers],
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditEventFormView.parseStateToData(this._state.point, this._state.offers));
  };

  #dateFromChangeHandler = ([userDateFrom]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        dateFrom: userDateFrom,
      },
      offers: [...this._state.offers],
    });
  };

  #dateToChangeHandler = ([userDateTo]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        dateTo: userDateTo,
      },
      offers: [...this._state.offers],
    });
  };

  //Метод для обработки смены точки маршрута с обновлением количества офферов для каждого типа
  #changeCurrentType = (evt) => {
    evt.preventDefault();
    if (evt.target.className.includes('event__type-label')) {
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

  #setDateFromPicker = () => {
    if (dayjs(this._state.point.dateFrom).diff(this._state.point.dateTo) > 0) {
      this._state.point.dateTo =this._state.point.dateFrom;
    }
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: 'today',
        defaultDate: this._state.point.dateFrom,
        onClose: this.#dateFromChangeHandler, // На событие flatpickr передаётся колбэк
      },
    );
  };

  #setDateToPicker = () => {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.point.dateFrom,
        defaultDate: this._state.point.dateTo,
        onClose: this.#dateToChangeHandler, // На событие flatpickr передаётся колбэк
      },
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('click', this.#changeCurrentType);

    const offersElement = this.element.querySelector('.event__available-offers');
    if (offersElement) {
      offersElement.addEventListener('click', this.#pickOffers);
    }
    this.element.querySelector('#event-price-1').addEventListener('input', this.#changeBasePriceInputHandler);
  };

  #pointDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditEventFormView.parseStateToData(this._state.point, this._state.offers));
  };

  static parseDataToState = (pointData, offersData) => ({
    point: {
      ...pointData,
    },
    offers: [...offersData],
  });

  static parseStateToData = (statePoint, stateOffers) => {
    const point = {...statePoint,};
    const offers = [...stateOffers];

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
