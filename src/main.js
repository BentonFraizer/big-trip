import FiltersFormView from './views/filters_form/filters-form-view.js';
import RoutePresenter from './presenters/route-presenter.js';
import {render} from './framework/render.js';
import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import {getOffers} from './mock/offers.js';
import {getPoint} from './mock/point.js';

const POINTS_AMOUNT = 3;

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const pageBodyContainerElement = document.querySelector('main .page-body__container');

const pointsModel = new PointsModel(POINTS_AMOUNT, getPoint);
const offersModel = new OffersModel(getOffers());
const routePresenter = new RoutePresenter(pageBodyContainerElement, pointsModel, offersModel);

render(new FiltersFormView(), filtersContainerElement);

routePresenter.init();
