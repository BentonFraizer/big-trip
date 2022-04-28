import FiltersFormView from './view/filters-form-view.js';
import RoutePresenter from './presenter/route-presenter.js';
import {render} from './render.js';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsSectionElement = document.querySelector('.trip-events');
const routePresenter = new RoutePresenter();

render(new FiltersFormView(), filtersContainerElement);

routePresenter.init(tripEventsSectionElement);
