import AbstractView from '../../framework/view/abstract-view';
import {createEventListItemFilledTemplate} from './events-list-item-filled.tpl';

export default class EventListItemFilledView extends AbstractView {
  get template() {
    return createEventListItemFilledTemplate();
  }
}
