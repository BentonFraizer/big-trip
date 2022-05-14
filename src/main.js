import FiltersFormView from './views/filters_form/filters-form-view.js';
import RoutePresenter from './presenters/route-presenter.js';
import {render} from './framework/render.js';
import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import {getOffers} from './mock/offers.js';
import {getPoint} from './mock/point.js';
import TripInfoView from './views/trip_info/trip-info-view.js';
import NewEventButtonView from './views/new_event_button/new-event-button-view.js';

const POINTS_AMOUNT = 3;

const tripMainElement = document.querySelector('.trip-main');
const pageBodyContainerElement = document.querySelector('main .page-body__container');

const pointsModel = new PointsModel(POINTS_AMOUNT, getPoint);
const offersModel = new OffersModel(getOffers());
const routePresenter = new RoutePresenter(pageBodyContainerElement, pointsModel, offersModel);

render(new TripInfoView(), tripMainElement);
render(new FiltersFormView(), tripMainElement);
render(new NewEventButtonView(), tripMainElement);

routePresenter.init();
