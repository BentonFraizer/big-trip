import AbstractView from '../../framework/view/abstract-view.js';
import {createEventsListTemplate} from './events-list.tpl.js';

export default class EventsListView extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }
}
