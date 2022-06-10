import EventsListView from '../views/events_list/events-list-view';
import SortFormView from '../views/sort_form/sort-form-view';
import SortAndEventsContainerView from '../views/sort_and_events_container/sort-and-events-container-view';
import EventsListEmptyView from '../views/events_list_empty/events-list-empty-view';
import {remove, render} from '../framework/render';
import PointPresenter from './point-presenter';
import PointNewPresenter from './point-new-presenter';
import {filter} from '../utils/filter';
import {SortType, UserAction, UpdateType, FilterType} from '../consts';
import {sortPriceDown, sortTimeDown, sortDateDown} from '../utils/utils';

export default class RoutePresenter {
  #pageBodyContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #filterModel = null;

  #sortAndEventsContainer = new SortAndEventsContainerView(); // section class="trip-events"
  #eventsListContainer = new EventsListView();                // ul      class="trip-events__list"
  #sortComponent = null;                                      // form    class="trip-events__trip-sort  trip-sort"
  #noPoinstComponent = null;                                  // p       class="trip-events__msg">

  #pointPresenters = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor(pageBodyContainer, pointsModel, offersModel, filterModel) {
    this.#pageBodyContainer = pageBodyContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter (this.#eventsListContainer.element, this.#handleViewAction, this.#offersModel.offers);

    //#handleModelEvent это обработчик-наблюдатель, который будет реагировать на изменения в каждой модели, т.е. будет вызван
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  //Метод (геттер) для получения данных о точке из модели PointsModel
  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortTimeDown);
      case SortType.PRICE:
        return filteredPoints.sort(sortPriceDown);
      case SortType.DAY:
        return filteredPoints.sort(sortDateDown);
    }

    return filteredPoints;
  }

  //Метод (геттер) для получения данных о дополнительных предложениях из модели OffersModel
  get offers() {
    return this.#offersModel.offers;
  }

  init () {
    this.#renderSortAndEventsBoard();
  }

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  //Метод-обработчик для "сворачивания" всех форм
  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
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
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  //Метод-обработчик для отслеживания обновления данных в Model
  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда точка маршрута попадает в избранное)
        this.#pointPresenters.get(data.id).init(data, this.offers);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, при удалении точки маршрута)
        this.#clearSortAndEventsBoard();
        this.#renderSortAndEventsBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearSortAndEventsBoard({resetSortType: true});
        this.#renderSortAndEventsBoard();
        break;
      default:
        throw new Error ('The transferred update type does not exist');
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
    this.#clearSortAndEventsBoard();
    // - Рендерим список заново
    this.#renderSortAndEventsBoard();
  };

  //Метод отрисовки компонента сортировки
  #renderSort () {
    this.#sortComponent = new SortFormView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#sortAndEventsContainer.element);
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

  //Метод отрисовки компонента информационного сообщения об отсутствии точек маршрута
  #renderNoPoints () {
    this.#noPoinstComponent = new EventsListEmptyView(this.#filterType);
    render(this.#noPoinstComponent, this.#sortAndEventsContainer.element);
  }

  //Метод для очистки представления (доски) с компонентами сортировки, точек маршрута, информационных сообщений
  #clearSortAndEventsBoard = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (this.#noPoinstComponent) {
      remove(this.#noPoinstComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  //Метод отрисовки представления (доски) с компонентами сортировки, точек маршрута, информационных сообщений
  #renderSortAndEventsBoard () {
    render(this.#sortAndEventsContainer, this.#pageBodyContainer);
    this.#renderSort();
    this.#renderPointsOrInfoContainer();

    if (!this.points.length) {
      this.#renderNoPoints();
      return;
    }

    this.points.forEach((element, index) => {
      this.#renderPoint(this.points[index], this.offers);
    });
  }
}
