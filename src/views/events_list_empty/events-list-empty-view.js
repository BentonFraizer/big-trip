import AbstractView from '../../framework/view/abstract-view';
import {createEventsListEmptyTemplate} from './events-list-empty.tpl';

export default class EventsListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEventsListEmptyTemplate(this.#filterType);
  }
}
