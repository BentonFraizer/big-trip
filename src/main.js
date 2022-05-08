import FiltersFormView from './view/filters_form/filters-form-view.js';
import RoutePresenter from './presenter/route-presenter.js';
import {render} from './utils.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsSectionElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const routePresenter = new RoutePresenter();

render(new FiltersFormView(), filtersContainerElement);

routePresenter.init(tripEventsSectionElement, pointsModel, offersModel);
