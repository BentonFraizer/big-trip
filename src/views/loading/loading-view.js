import AbstractView from '../../framework/view/abstract-view';
import {createLoadingTemlpate} from './loading.tpl';

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemlpate();
  }
}
