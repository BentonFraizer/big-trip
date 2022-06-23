import AbstractView from '../../framework/view/abstract-view';
import {createHeaderTemplate} from './header.tpl';

export default class HeaderView extends AbstractView {
  get template() {
    return createHeaderTemplate();
  }
}
