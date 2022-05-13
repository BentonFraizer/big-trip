import AbstractView from '../../framework/view/abstract-view.js';
import {createEventsListEmptyTemplate} from './events-list-empty.tpl.js';

export default class EventsListEmptyView extends AbstractView {
  get template() {
    return createEventsListEmptyTemplate();
  }
}
