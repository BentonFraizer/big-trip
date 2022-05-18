import EventView from '../views/event/event-view';
import EditEventFormView from '../views/edit_event_form/edit-event-form-view';
import {isEscKeyPressed} from '../utils';
import {render, replace} from '../framework/render';

export default class PointPresenter {
  #eventsListContainer = null;

  #pointComponent = null;
  #editPointFormComponent = null;

  #point = null;
  #offers = null;
  #points = null;

  constructor(eventsListContainer) {
    this.#eventsListContainer = eventsListContainer;
  }

  init (point, points, offers) {
    this.#point = point;
    this.#offers = offers;
    this.#points = points;

    this.#pointComponent = new EventView(point);
    this.#editPointFormComponent = new EditEventFormView(offers, points);

    this.#pointComponent.setOpenEditFormClickHandler(() => this.#openEditFormClickHandler());
    this.#editPointFormComponent.setCloseEditFormClickHandler(() => this.#closeEditFormClickHandler());
    this.#editPointFormComponent.setFormSubmitHandler(() => this.#closeEditFormSubmitHandler());

    render(this.#pointComponent, this.#eventsListContainer);
  }

  #replacePointToForm = () => {
    replace(this.#editPointFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  //Функция обработки нажатия клавиши "Esc" в момент когда открыта формы редактирования, для её замены на точку маршрута
  #escKeyDownHandler = (evt) => {
    if (isEscKeyPressed(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  //Замена точки маршрута на форму по клику на кнопку в виде галочки
  #openEditFormClickHandler () {
    this.#replacePointToForm();
  }

  //Замена формы на точку маршрута по клику на кнопку с изображением галочки
  #closeEditFormClickHandler () {
    this.#replaceFormToPoint();
  }

  //Замена формы на точку маршрута по клику на кнопку "Save"
  #closeEditFormSubmitHandler () {
    this.#replaceFormToPoint();
  }
}
