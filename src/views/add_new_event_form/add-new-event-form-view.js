import AbstractView from '../../framework/view/abstract-view';
import {createNewEventFormTemplate} from './add-new-event-form.tpl';

export default class NewEventFormView extends AbstractView {
  get template() {
    return createNewEventFormTemplate();
  }
}
