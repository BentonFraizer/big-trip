import EditEventFormView from '../view/edit_event_form/edit-event-form-view.js';
import EventView from '../view/event/event-view.js';
import EventsListView from '../view/events_list/events-list-view.js';
import SortFormView from '../view/sort_form/sort-form-view.js';
import {render} from '../utils.js';
import SortAndEventsContainerView from '../view/sort_and_events_container/sort-and-events-container-view.js';
import EventsListEmptyView from '../view/events_list_empty/events-list-empty-view.js';

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
    this.#listPoints = [...this.#pointsModel.points]; //количество точек событий из points-model.js. (5шт.)
    this.#offersModel = offersModel;
    this.#allOffers = [...this.#offersModel.offers];  //массив вообще всех офферов

    render(this.#sortAndEventsContainer, this.#pageBodyContainer);
    render(new SortFormView(), this.#sortAndEventsContainer.element);
    render(this.#eventsListComponent, this.#sortAndEventsContainer.element);

    if (this.#eventsListComponent.element.childElementCount === 0) {
      render(new EventsListEmptyView(), this.#sortAndEventsContainer.element);
    } else {
      this.#listPoints.forEach((element, index) => {
        this.#renderPoint(this.#listPoints[index], this.#listPoints, this.#allOffers);
      });
    }
  }

  #renderPoint = (point, points, offers) => {
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
      if (evt.key === 'Escape' || evt.key === 'Esc') {
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
  };
}
