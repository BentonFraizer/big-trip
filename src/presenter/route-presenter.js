import EditEventFormView from '../view/edit_event_form/edit-event-form-view.js';
import EventView from '../view/event/event-view.js';
import EventsListItemView from '../view/events_list_item/events-list-item-view.js';
import EventsListView from '../view/events_list/events-list-view.js';
import SortFormView from '../view/sort_form/sort-form-view.js';
import {render} from '../render.js';

export default class RoutePresenter {
  eventsListComponent = new EventsListView();           // ul class="trip-events__list"
  eventsListItemComponent = new EventsListItemView();   // li class="trip-events__item"

  init = (sortEventsContainer, pointsModel, offersModel) => {
    this.sortEventsContainer = sortEventsContainer;
    this.pointsModel = pointsModel;
    this.listPoints = [...this.pointsModel.getPoints()]; //количество точек событий из points-model.js. (5шт.)
    this.offersModel = offersModel;
    this.allOffers = [...this.offersModel.getOffers()];  //массив вообще всех офферов

    render(new SortFormView(), this.sortEventsContainer);
    render(this.eventsListComponent, this.sortEventsContainer);
    render(this.eventsListItemComponent, this.eventsListComponent.getElement());
    render(new EditEventFormView(this.listPoints, this.allOffers), this.eventsListItemComponent.getElement());

    for (let i = 0; i < this.listPoints.length; i++) {
      const emptyListItem = new EventsListItemView();
      render(emptyListItem, this.eventsListComponent.getElement());
      render(new EventView(this.listPoints[i]), emptyListItem.getElement());
    }
  };
}
