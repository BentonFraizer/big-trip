import AbstractView from '../../framework/view/abstract-view';
import {createEventsListEmptyTemplate} from './events-list-empty.tpl';

export default class EventsListEmptyView extends AbstractView {
  get template() {
    return createEventsListEmptyTemplate();
  }
}
