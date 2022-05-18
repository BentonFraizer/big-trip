import EditEventFormView from '../views/edit_event_form/edit-event-form-view';
import EventView from '../views/event/event-view';
import EventsListView from '../views/events_list/events-list-view';
import SortFormView from '../views/sort_form/sort-form-view';
import {isEscKeyPressed} from '../utils';
import SortAndEventsContainerView from '../views/sort_and_events_container/sort-and-events-container-view';
import EventsListEmptyView from '../views/events_list_empty/events-list-empty-view';
import {render, replace} from '../framework/render';

export default class RoutePresenter {
  #pageBodyContainer = null;
  #pointsModel = null;
  #offersModel = null;

  #sortAndEventsContainer = new SortAndEventsContainerView(); // section class="trip-events"
  #eventsListComponent = new EventsListView();                // ul      class="trip-events__list"

  #listPoints = [];
  #allOffers = [];

  constructor(pageBodyContainer, pointsModel, offersModel) {
    this.#pageBodyContainer = pageBodyContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
  }

  init () {
    this.#listPoints = [...this.#pointsModel.points]; //количество точек событий из points-model.js.
    this.#allOffers = [...this.#offersModel.offers];  //массив вообще всех офферов

    this.#renderSortAndEventsContainer();
  }

  #renderPoint (point, points, offers) {
    const pointComponent = new EventView(point);
    const editPointFormComponent = new EditEventFormView(points, offers);

    const replacePointToForm = () => {
      replace(editPointFormComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, editPointFormComponent);
    };

    //Функция обработки нажатия клавиши "Esc" в момент когда открыта формы редактирования, для её замены на точку маршрута
    const onEscKeyDown = (evt) => {
      if (isEscKeyPressed(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    //Замена точки маршрута на форму по клику на кнопку в виде галочки
    pointComponent.setOpenEditFormClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    //Замена формы на точку маршрута по клику на кнопку с изображением галочки
    editPointFormComponent.setCloseEditFormClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    //Замена формы на точку маршрута по клику на кнопку "Save"
    editPointFormComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#eventsListComponent.element);
  }

  #renderSortAndEventsContainer () {
    render(this.#sortAndEventsContainer, this.#pageBodyContainer);
    render(new SortFormView(), this.#sortAndEventsContainer.element);
    render(this.#eventsListComponent, this.#sortAndEventsContainer.element);

    if (!this.#listPoints.length) {
      render(new EventsListEmptyView(), this.#sortAndEventsContainer.element);
      return;
    }

    this.#listPoints.forEach((element, index) => {
      this.#renderPoint(this.#listPoints[index], this.#listPoints, this.#allOffers);
    });
  }
}
