import {createElement} from '../../utils.js';
import {createEventsListItemTemplate} from './events-list-item.tpl.js';

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
