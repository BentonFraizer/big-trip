import RoutePresenter from './presenters/route-presenter';
import FilterPresenter from './presenters/filter-presenter';
import {render} from './framework/render';
import PointsModel from './models/points-model';
import OffersModel from './models/offers-model';
// import DestinationsModel from './models/destinations-model';
import FilterModel from './models/filter-model';
import TripInfoView from './views/trip_info/trip-info-view';
import NewEventButtonView from './views/new_event_button/new-event-button-view';
import PointsApiService from './api_services/points-api-service';
import OffersApiService from './api_services/offers-api-service';
// import DestinationsApiService from './api_services/destinations-api-service';

const AUTHORIZATION = 'Basic ljsu4yhgj4i4u4u4';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const tripMainElement = document.querySelector('.trip-main');
const pageBodyContainerElement = document.querySelector('main .page-body__container');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));
// const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const routePresenter = new RoutePresenter(pageBodyContainerElement, pointsModel, offersModel, filterModel);
const filterPresenter = new FilterPresenter(tripMainElement, filterModel, pointsModel);
const newPointButtonComponent = new NewEventButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  routePresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(new TripInfoView(), tripMainElement);
filterPresenter.init();
render(newPointButtonComponent, tripMainElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

routePresenter.init();
pointsModel.init();
