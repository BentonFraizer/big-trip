import EventsListView from '../views/events_list/events-list-view';
import SortFormView from '../views/sort_form/sort-form-view';
import SortAndEventsContainerView from '../views/sort_and_events_container/sort-and-events-container-view';
import EventsListEmptyView from '../views/events_list_empty/events-list-empty-view';
import {render} from '../framework/render';
import PointPresenter from './point-presenter';
import {SortType, UserAction, UpdateType} from '../consts';
import {sortPriceDown, sortTimeDown, sortDateDown} from '../utils';

export default class RoutePresenter {
  #pageBodyContainer = null;
  #pointsModel = null;
  #offersModel = null;

  #sortAndEventsContainer = new SortAndEventsContainerView(); // section class="trip-events"
  #eventsListContainer = new EventsListView();                // ul      class="trip-events__list"
  #sortComponent = new SortFormView();                        // form    class="trip-events__trip-sort  trip-sort"
  #noPoinstComponent = new EventsListEmptyView();             // p       class="trip-events__msg">

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor(pageBodyContainer, pointsModel, offersModel) {
    this.#pageBodyContainer = pageBodyContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;

    //Подпивываемся на событие (!пока не понятно на какое) в points-model.
    //#handleModelEvent это обработчик-наблюдатель, который будет реагировать на изменения модели, т.е. будет вызван
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  //Метод (геттер) для получения данных о точке из модели PointsModel
  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortTimeDown);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPriceDown);
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortDateDown);
    }

    return this.#pointsModel.points;
  }

  //Метод (геттер) для получения данных о дополнительных предложениях из модели OffersModel
  get offers() {
    return this.#offersModel.offers;
  }

  init () {
    this.#renderSortAndEventsBoard();
  }

  //Метод-обработчик для "сворачивания" всех форм
  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  //Метод-обработчик для отслеживания обновления View (т.е. при внесении изменений пользователем в браузере)// Здесь будем вызывать обновление модели.
  // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
  // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
  // update - обновленные данные
  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  //Метод-обработчик для отслеживания обновления данных в Model
  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялась цена в точке маршрута)
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, при удалении точки маршрута)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  //Метод для сортировки точек маршрута. Здесь по порядку выполняются: сортировка, очистка списка, рендеринг нового списка
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    // - Сортируем задачи
    this.#currentSortType = sortType;
    // - Очищаем список
    this.#clearPoints();
    // - Рендерим список заново
    this.#renderPoints();
  };

  //Метод отрисовки компонента сортировки
  #renderSort () {
    render(this.#sortComponent, this.#sortAndEventsContainer.element);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  //Метод отрисовки компонента списка <ul>, в который будут попадать либо точки маршрута либо информационные сообщения как элементы списка
  #renderPointsOrInfoContainer () {
    render(this.#eventsListContainer, this.#sortAndEventsContainer.element);
  }

  //Метод отрисовки компонента точки маршрута
  #renderPoint (point, offers) {
    const pointPresenter = new PointPresenter(this.#eventsListContainer.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  //Метод очистки всех точек маршрута созданных из класса PointPresenter и помещенных в Map #pointPresenters
  #clearPoints () {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  //Метод отрисовки всех точек маршрута
  #renderPoints () {
    this.points.forEach((element, index) => {
      this.#renderPoint(this.points[index], this.offers);
    });
  }

  //Метод отрисовки компонента информационного сообщения об отсутствии точек маршрута
  #renderNoPoints () {
    render(this.#noPoinstComponent, this.#sortAndEventsContainer.element);
  }

  //Метод отрисовки представления (доски) с компонентами сортировки, точек маршрута, информационных сообщений
  #renderSortAndEventsBoard () {
    render(this.#sortAndEventsContainer, this.#pageBodyContainer);
    this.#renderSort();
    this.#renderPointsOrInfoContainer();

    if (!this.points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderPoints();
  }
}
