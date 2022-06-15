import EventView from '../views/event/event-view';
import EditEventFormView from '../views/edit_event_form/edit-event-form-view';
import {isEscKeyPressed, isDatesEqual, isPricesEqual} from '../utils/utils';
import {render, replace, remove} from '../framework/render';
import {UserAction, UpdateType} from '../consts';

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
  #destinations = null;
  #mode = Mode.DEFAULT;

  constructor(eventsListContainer, changeData, changeMode) {
    this.#eventsListContainer = eventsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init (point, offers, destinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    //Сохранение свойств в переменные для дальнейшего переиспользования
    const prevPointComponent = this.#pointComponent;
    const prevEditPointFormComponent = this.#editPointFormComponent;

    this.#pointComponent = new EventView(this.#point, this.#offers);
    this.#editPointFormComponent = new EditEventFormView(this.#point, this.#offers, this.#destinations);

    this.#pointComponent.setOpenEditFormClickHandler(this.#handleOpenEditFormClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editPointFormComponent.setCloseEditFormClickHandler(this.#handleCloseEditFormClick);
    this.#editPointFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editPointFormComponent.setDeleteClickHandler(this.#handleDeleteClick);

    //Если значения в переменных равны null, значит рендер точки маршрута выполняется впервые. Просто рендерим компонент точки маршрута
    if (prevPointComponent === null || prevEditPointFormComponent === null) {
      return render(this.#pointComponent, this.#eventsListContainer);
    }

    //Проверки на наличие элемента в DOM. Нужна, чтобы не пытаться заменить то, что не было отрисовано
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevEditPointFormComponent);
      this.#mode = Mode.DEFAULT;
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
      this.#editPointFormComponent.reset(this.#point, this.#offers, this.#destinations);
      this.#replaceFormToPoint();
    }
  };

  setSaving = (update) => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointFormComponent.updateElement({
        point: {
          ...update,
          isDisabled: true,
          isSaving: true,
        }
      },
      );
    }
  };

  setDeleting = (update) => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointFormComponent.updateElement({
        point: {
          ...update,
          isDisabled: true,
          isDeleting: true,
        }
      });
    }
  };

  setAborting = (update, offers, destinations) => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
    }

    const resetFormState = () => {
      this.#editPointFormComponent.updateElement({
        point: {
          ...update,
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        },
        offers: [...offers,],
        destinations: [...destinations,],
      });
    };

    this.#editPointFormComponent.shake(resetFormState);
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
      this.#editPointFormComponent.reset(this.#point, this.#offers, this.#destinations);
      this.#replaceFormToPoint();
    }
  };

  //Обработка клика кнопки добавления в Избранное
  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      //Возможно стоит поставить MINOR. Проверить позже.
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  //Замена точки маршрута на форму по клику на кнопку в виде галочки
  #handleOpenEditFormClick = () => {
    this.#replacePointToForm();
  };

  //Замена формы на точку маршрута по клику на кнопку с изображением галочки
  #handleCloseEditFormClick = () => {
    this.#editPointFormComponent.reset(this.#point, this.#offers, this.#destinations);
    this.#replaceFormToPoint();
  };

  //Замена формы на точку маршрута и обновление данных по клику на кнопку "Save"
  //В "update" попадают данные, изменённые пользователем в форме редактирования. Параметр ранее: "pointAndOffersData"
  #handleFormSubmit = (update) => {
    //Проверка. Поменялись ли в точке маршрута данные, которые попадают под сортировку (day, time, price)
    //Если да - обновляем список (MINOR), если нет обновляем только точку (PATCH)
    const isMinorUpdate =
      !isDatesEqual(this.#point.dateFrom, update.point.dateFrom) ||
      !isPricesEqual(this.#point.basePrice, update.point.basePrice) ||
      (this.#point.dateFrom === update.point.dateFrom && this.#point.dateTo === update.point.dateTo);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      {...update.point,},
      {...update.offers,});
  };

  //Удаление точки маршрута
  #handleDeleteClick = (pointAndOffersData) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      {...pointAndOffersData.point,},
      {...pointAndOffersData.offers,},
    );
  };
}
