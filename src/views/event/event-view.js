import AbstractView from '../../framework/view/abstract-view.js';
import {createEventTemplate} from './event.tpl.js';

export default class EventView extends AbstractView{
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createEventTemplate(this.#point);
  }
}
