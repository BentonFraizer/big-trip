import FiltersFormView from './views/filters_form/filters-form-view';
import RoutePresenter from './presenters/route-presenter';
import {render} from './framework/render';
import PointsModel from './models/points-model';
import OffersModel from './models/offers-model';
import FilterModel from './models/filter-model';
import {getOffers} from './mock/offers';
import {getPoint} from './mock/point';
import TripInfoView from './views/trip_info/trip-info-view';
import NewEventButtonView from './views/new_event_button/new-event-button-view';

const POINTS_AMOUNT = 3;

const tripMainElement = document.querySelector('.trip-main');
const pageBodyContainerElement = document.querySelector('main .page-body__container');

const pointsModel = new PointsModel(POINTS_AMOUNT, getPoint);
const offersModel = new OffersModel(getOffers());
const filterModel = new FilterModel();
const routePresenter = new RoutePresenter(pageBodyContainerElement, pointsModel, offersModel);

render(new TripInfoView(), tripMainElement);
render(new FiltersFormView(), tripMainElement);
render(new NewEventButtonView(), tripMainElement);

routePresenter.init();
