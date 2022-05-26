import EventView from '../views/event/event-view';
import EditEventFormView from '../views/edit_event_form/edit-event-form-view';
import {isEscKeyPressed} from '../utils';
import {render, replace, remove} from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #eventsListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #editPointFormComponent = null;

  #point = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor(eventsListContainer, changeData, changeMode) {
    this.#eventsListContainer = eventsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init (point, offers) {
    this.#point = point;
    this.#offers = offers;

    //Сохранение свойств в переменные для дальнейшего переиспользования
    const prevPointComponent = this.#pointComponent;
    const prevEditPointFormComponent = this.#editPointFormComponent;

    this.#pointComponent = new EventView(this.#point);
    this.#editPointFormComponent = new EditEventFormView(this.#point, this.#offers);

    this.#pointComponent.setOpenEditFormClickHandler(this.#handleOpenEditFormClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editPointFormComponent.setCloseEditFormClickHandler(this.#handleCloseEditFormClick);
    this.#editPointFormComponent.setFormSubmitHandler(this.#handleFormSubmit);

    //Если значения в переменных равны null, значит рендер точки маршрута выполняется впервые. Просто рендерим компонент точки маршрута
    if (prevPointComponent === null || prevEditPointFormComponent === null) {
      return render(this.#pointComponent, this.#eventsListContainer);
    }

    //Проверки на наличие элемента в DOM. Нужна, чтобы не пытаться заменить то, что не было отрисовано
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointFormComponent, prevEditPointFormComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointFormComponent);
  }

  destroy () {
    remove(this.#pointComponent);
    remove(this.#editPointFormComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#editPointFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  //Функция обработки нажатия клавиши "Esc" в момент когда открыта формы редактирования, для её замены на точку маршрута
  #escKeyDownHandler = (evt) => {
    if (isEscKeyPressed(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  //Обработка клика кнопки добавления в Избранное
  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  //Замена точки маршрута на форму по клику на кнопку в виде галочки
  #handleOpenEditFormClick = () => {
    this.#replacePointToForm();
  };

  //Замена формы на точку маршрута по клику на кнопку с изображением галочки
  #handleCloseEditFormClick = () => {
    this.#replaceFormToPoint();
  };

  //Замена формы на точку маршрута по клику на кнопку "Save"
  #handleFormSubmit = () => {
    this.#changeData({...this.#point});
    this.#replaceFormToPoint();
  };
}
