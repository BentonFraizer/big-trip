import EventsListView from '../views/events_list/events-list-view';
import SortFormView from '../views/sort_form/sort-form-view';
import SortAndEventsContainerView from '../views/sort_and_events_container/sort-and-events-container-view';
import EventsListEmptyView from '../views/events_list_empty/events-list-empty-view';
import {render} from '../framework/render';
import PointPresenter from './point-presenter';

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

  constructor(pageBodyContainer, pointsModel, offersModel) {
    this.#pageBodyContainer = pageBodyContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
  }

  init () {
    this.#listPoints = [...this.#pointsModel.points]; //количество точек событий из points-model.js.
    this.#allOffers = [...this.#offersModel.offers];  //массив вообще всех офферов

    this.#renderSortAndEventsBoard();
  }

  //Метод отрисовки компонента сортировки
  #renderSort () {
    render(this.#sortComponent, this.#sortAndEventsContainer.element);
  }

  //Метод отрисовки компонента списка <ul>, в который будут попадать либо точки маршрута либо информационные сообщения как элементы списка
  #renderPointsOrInfoContainer () {
    render(this.#eventsListContainer, this.#sortAndEventsContainer.element);
  }

  //Метод отрисовки компонента точки маршрута
  #renderPoint (point, points, offers) {
    const pointPresenter = new PointPresenter(this.#eventsListContainer.element);
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