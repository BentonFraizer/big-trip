import EditEventFormView from '../view/edit_event_form/edit-event-form-view.js';
import EventView from '../view/event/event-view.js';
import EventsListItemView from '../view/events_list_item/events-list-item-view.js';
import EventsListView from '../view/events_list/events-list-view.js';
import SortFormView from '../view/sort_form/sort-form-view.js';
import {render} from '../utils.js';
import SortAndEventsContainerView from '../view/sort_and_events_container/sort-and-events-container-view.js';

export default class RoutePresenter {
  #pageBodyContainer = null;
  #pointsModel = null;
  #offersModel = null;

  #sortAndEventsContainer = new SortAndEventsContainerView(); // section class="trip-events"
  #eventsListComponent = new EventsListView();                // ul      class="trip-events__list"
  #eventsListItemComponent = new EventsListItemView();        // li      class="trip-events__item"

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
    render(this.#eventsListItemComponent, this.#eventsListComponent.element);
    render(new EditEventFormView(this.#listPoints, this.#allOffers), this.#eventsListItemComponent.element);

    this.#listPoints.forEach((element, index) => {
      const emptyListItem = new EventsListItemView();
      render(emptyListItem, this.#eventsListComponent.element);
      render(new EventView(this.#listPoints[index]), emptyListItem.element);
    });
  }
}
