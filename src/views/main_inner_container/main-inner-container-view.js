import AbstractView from '../../framework/view/abstract-view';
import {createMainInnerContainerTemplate} from './main-inner-container-view.tpl';

export default class MainInnerContainerView extends AbstractView {
  get template() {
    return createMainInnerContainerTemplate();
  }
}
