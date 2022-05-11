import EditEventFormView from '../views/edit_event_form/edit-event-form-view.js';
import EventView from '../views/event/event-view.js';
import EventsListView from '../views/events_list/events-list-view.js';
import SortFormView from '../views/sort_form/sort-form-view.js';
import {render, isEscKeyPressed} from '../utils.js';
import SortAndEventsContainerView from '../views/sort_and_events_container/sort-and-events-container-view.js';
import EventsListEmptyView from '../views/events_list_empty/events-list-empty-view.js';

export default class RoutePresenter {
  #pageBodyContainer = null;
  #pointsModel = null;
  #offersModel = null;

  #sortAndEventsContainer = new SortAndEventsContainerView(); // section class="trip-events"
  #eventsListComponent = new EventsListView();                // ul      class="trip-events__list"

  #listPoints = [];
  #allOffers = [];

  init (pageBodyContainer, pointsModel, offersModel) {
    this.#pageBodyContainer = pageBodyContainer;
    this.#pointsModel = pointsModel;
    this.#listPoints = [...this.#pointsModel.points]; //количество точек событий из points-model.js.
    this.#offersModel = offersModel;
    this.#allOffers = [...this.#offersModel.offers];  //массив вообще всех офферов

    render(this.#sortAndEventsContainer, this.#pageBodyContainer);
    render(new SortFormView(), this.#sortAndEventsContainer.element);
    render(this.#eventsListComponent, this.#sortAndEventsContainer.element);

    if (!this.#listPoints.length) {
      render(new EventsListEmptyView(), this.#sortAndEventsContainer.element);
      return;
    }

    this.#listPoints.forEach((element, index) => {
      this.#renderPoint(this.#listPoints[index], this.#listPoints, this.#allOffers);
    });
  }

  #renderPoint (point, points, offers) {
    const pointComponent = new EventView(point);
    const editPointFormComponent = new EditEventFormView(points, offers);

    const replacePointToForm = () => {
      this.#eventsListComponent.element.replaceChild(editPointFormComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#eventsListComponent.element.replaceChild(pointComponent.element, editPointFormComponent.element);
    };

    //Функция обработки нажатия клавиши "Esc" в момент когда открыта формы редактирования, для её замены на точку маршрута
    const onEscKeyDown = (evt) => {
      if (isEscKeyPressed(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    //Замена точки маршрута на форму по клику на кнопку в виде галочки
    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    //Замена формы на точку маршрута по клику на кнопку с изображением галочки
    editPointFormComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    //Замена формы на точку маршрута по клику на кнопку "Save"
    editPointFormComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#eventsListComponent.element);
  }
}
