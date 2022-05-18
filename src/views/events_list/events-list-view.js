import AbstractView from '../../framework/view/abstract-view';
import {createEventsListTemplate} from './events-list.tpl';

export default class EventsListView extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }
}
