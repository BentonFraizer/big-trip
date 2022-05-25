import EventsListView from '../views/events_list/events-list-view';
import SortFormView from '../views/sort_form/sort-form-view';
import SortAndEventsContainerView from '../views/sort_and_events_container/sort-and-events-container-view';
import EventsListEmptyView from '../views/events_list_empty/events-list-empty-view';
import {render} from '../framework/render';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils';
import {SortType} from '../consts';
import {sortPriceDown, sortTimeDown, sortDateDown} from '../utils';

export default class RoutePresenter {
  #pageBodyContainer = null;
  #pointsModel = null;
  #offersModel = null;

  #sortAndEventsContainer = new SortAndEventsContainerView(); // section class="trip-events"
  #eventsListContainer = new EventsListView();                // ul      class="trip-events__list"
  #sortComponent = new SortFormView();                        // form    class="trip-events__trip-sort  trip-sort"
  #noPoinstComponent = new EventsListEmptyView();             // p       class="trip-events__msg">

  #listPoints = [];
  #allOffers = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor(pageBodyContainer, pointsModel, offersModel) {
    this.#pageBodyContainer = pageBodyContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
  }

  init () {
    this.#listPoints = [...this.#pointsModel.points]; //количество точек событий из points-model.js.
    this.#allOffers = [...this.#offersModel.offers];  //массив вообще всех офферов
    this.#sortPoints();

    this.#renderSortAndEventsBoard();
  }

  //Метод-обработчик для "сворачивания" всех форм
  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  //Метод-обработчик для отслеживания обновления данных в компоненте точки маршрута
  //На второй строке метода повторно инициализируется Point-презентер уже с новыми данными
  #handlePointChange = (updatedPoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#listPoints, this.#allOffers);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#listPoints.sort(sortTimeDown);
        break;
      case SortType.PRICE:
        this.#listPoints.sort(sortPriceDown);
        break;
      default:
        this.#listPoints.sort(sortDateDown);
    }

    this.#currentSortType = sortType;
  };

  //Метод для сортировки точек маршрута. Здесь по порядку выполняются: сортировка, очистка списка, рендеринг нового списка
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    // - Сортируем задачи
    this.#sortPoints(sortType);
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
  #renderPoint (point, points, offers) {
    const pointPresenter = new PointPresenter(this.#eventsListContainer.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, points, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  //Метод очистки всех точек маршрута созданных из класса PointPresenter и помещенных в Map #pointPresenters
  #clearPoints () {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  //Метод отрисовки всех точек маршрута
  #renderPoints () {
    this.#listPoints.forEach((element, index) => {
      this.#renderPoint(this.#listPoints[index], this.#listPoints, this.#allOffers);
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

    if (!this.#listPoints.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderPoints();
  }
}
