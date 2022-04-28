import NewEventFormView from '../view/add-new-event-form-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import EventView from '../view/event-view.js';
import EventsListItemView from '../view/events-list-item-view.js';
import EventsListItemFilledView from '../view/events-list-item-filled-view.js';
import EventsListView from '../view/events-list-view.js';
import FiltersFormView from '../view/filters-form-view.js';
import SortFormView from '../view/sort-form-view.js';
import {render} from '../render.js';

const EVENTS_AMOUNT = 3;

export default class RoutePresenter {
  eventsListComponent = new EventsListView();           // ul class="trip-events__list"
  eventsListItemComponent = new EventsListItemView();   // li class="trip-events__item
  eventComponent = new EventView();                     // div class="event"

  init = (sortEventsContainer) => {
    this.sortEventsContainer = sortEventsContainer;

    render(new SortFormView(), this.sortEventsContainer);
    render(this.eventsListComponent, this.sortEventsContainer);
    render(this.eventsListItemComponent, this.eventsListComponent.getElement())
    render(new EditEventFormView(), this.eventsListItemComponent.getElement());

    for (let i = 0; i < EVENTS_AMOUNT; i++) {
      render(new EventsListItemFilledView(), this.eventsListComponent.getElement());
    }
  };
}
