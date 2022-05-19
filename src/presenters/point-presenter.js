import EventView from '../views/event/event-view';
import EditEventFormView from '../views/edit_event_form/edit-event-form-view';
import {isEscKeyPressed} from '../utils';
import {render, replace, remove} from '../framework/render';

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

    //Сохранение свойств в переменные для дальнейшего переиспользования
    const prevPointComponent = this.#pointComponent;
    const prevEditPointFormComponent = this.#editPointFormComponent;

    this.#pointComponent = new EventView(point);
    this.#editPointFormComponent = new EditEventFormView(offers, points);

    this.#pointComponent.setOpenEditFormClickHandler(() => this.#openEditFormClickHandler());
    this.#editPointFormComponent.setCloseEditFormClickHandler(() => this.#closeEditFormClickHandler());
    this.#editPointFormComponent.setFormSubmitHandler(() => this.#closeEditFormSubmitHandler());

    //Если значения в переменных равны null, значит рендер точки маршрута выполняется впервые. Просто рендерим компонент точки маршрута
    if (prevPointComponent === null || prevEditPointFormComponent === null) {
      return render(this.#pointComponent, this.#eventsListContainer);
    }

    //Проверки на наличие элемента в DOM. Нужна, чтобы не пытаться заменить то, что не было отрисовано
    if (this.#eventsListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#eventsListContainer.contains(prevEditPointFormComponent.element)) {
      replace(this.#editPointFormComponent, prevEditPointFormComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointFormComponent);
  }

  destroy () {
    remove(this.#pointComponent);
    remove(this.#editPointFormComponent);
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
