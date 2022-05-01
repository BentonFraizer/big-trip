import FiltersFormView from './view/filters_form/filters-form-view.js';
import RoutePresenter from './presenter/route-presenter.js';
import {render} from './render.js';
import PointsModel from './model/points-model.js';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsSectionElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const routePresenter = new RoutePresenter();

render(new FiltersFormView(), filtersContainerElement);

routePresenter.init(tripEventsSectionElement, pointsModel);
