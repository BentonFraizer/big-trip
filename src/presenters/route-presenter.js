import EventsListView from '../views/events_list/events-list-view';
import SortFormView from '../views/sort_form/sort-form-view';
import SortAndEventsContainerView from '../views/sort_and_events_container/sort-and-events-container-view';
import EventsListEmptyView from '../views/events_list_empty/events-list-empty-view';
import {render} from '../framework/render';
import PointPresenter from './point-presenter';
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

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor(pageBodyContainer, pointsModel, offersModel) {
    this.#pageBodyContainer = pageBodyContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
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

  //Метод-обработчик для отслеживания обновления данных в компоненте точки маршрута
  //На второй строке метода повторно инициализируется Point-презентер уже с новыми данными
  #handlePointChange = (updatedPoint) => {
    //Здесь будем вызывать обновление модели

    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.offers);
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
    const pointPresenter = new PointPresenter(this.#eventsListContainer.element, this.#handlePointChange, this.#handleModeChange);
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
