import {createElement} from '../render.js';

const createEventsListItemTemplate = () => (
  '<li class="trip-events__item"></li>'
);

export default class EventsListItemView {
  getTemplate() {
    return createEventsListItemTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
