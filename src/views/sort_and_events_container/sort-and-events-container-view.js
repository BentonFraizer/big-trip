import AbstractView from '../../framework/view/abstract-view';
import {createSortAndEventsContainerTemplate} from './sort-and-events-container.tpl';

export default class SortAndEventsContainerView extends AbstractView {
  get template() {
    return createSortAndEventsContainerTemplate();
  }
}


