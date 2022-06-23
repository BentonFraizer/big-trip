import AbstractView from '../../framework/view/abstract-view';
import {createMainTemplate} from './main.tpl';

export default class MainView extends AbstractView {
  get template() {
    return createMainTemplate();
  }
}
