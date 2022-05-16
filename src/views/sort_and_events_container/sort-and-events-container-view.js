import AbstractView from '../../framework/view/abstract-view.js';
import {createSortAndEventsContainerTemplate} from './sort-and-events-container.tpl.js';

export default class SortAndEventsContainerView extends AbstractView {
  get template() {
    return createSortAndEventsContainerTemplate();
  }
}


