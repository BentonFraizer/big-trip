import FiltersFormView from './view/filters_form/filters-form-view.js';
import RoutePresenter from './presenter/route-presenter.js';
import {render} from './utils.js';
import {getOffers} from './mock/offers.js';
import {generatePoint} from './mock/point.js';

const POINTS_AMOUNT = 5;
const filtersContainerElement = document.querySelector('.trip-controls__filters');
const pageBodyContainerElement = document.querySelector('main .page-body__container');


//Следующие объявления двух классов, используются как model (вынесены из файлов poins-model и offers-model).
class OffersModel {
  #offers = getOffers();

  get offers() {
    return this.#offers;
  }
}

class PointsModel {
  #points = Array.from({length: POINTS_AMOUNT}, generatePoint);

  get points() {
    return this.#points;
  }
}

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const routePresenter = new RoutePresenter();

render(new FiltersFormView(), filtersContainerElement);

routePresenter.init(pageBodyContainerElement, pointsModel, offersModel);
