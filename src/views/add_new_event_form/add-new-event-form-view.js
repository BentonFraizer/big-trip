import AbstractView from '../../framework/view/abstract-view.js';
import {createNewEventFormTemplate} from './add-new-event-form.tpl.js';

export default class NewEventFormView extends AbstractView {
  get template() {
    return createNewEventFormTemplate();
  }
}
