import AbstractView from '../../framework/view/abstract-view.js';
import {createEventListItemFilledTemplate} from './events-list-item-filled.tpl.js';

export default class EventListItemFilledView extends AbstractView {
  get template() {
    return createEventListItemFilledTemplate();
  }
}
