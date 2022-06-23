import UiBlocker from '../framework/ui-blocker/ui-blocker';
import EventsListView from '../views/events_list/events-list-view';
import SortFormView from '../views/sort_form/sort-form-view';
import SortAndEventsContainerView from '../views/sort_and_events_container/sort-and-events-container-view';
import EventsListEmptyView from '../views/events_list_empty/events-list-empty-view';
import {remove, render, RenderPosition} from '../framework/render';
import PointPresenter from './point-presenter';
import PointNewPresenter from './point-new-presenter';
import {filter} from '../utils/filter';
import {SortType, UserAction, UpdateType, FilterType} from '../consts';
import {sortPriceDown, sortTimeDown, sortDateDown} from '../utils/utils';
import MainView from '../views/main/main-view';
import MainInnerContainerView from '../views/main_inner_container/main-inner-container-view';
import TripInfoView from '../views/trip_info/trip-info-view';

const TimeLimit = {
  LOWER_LIMIT: 200,
  UPPER_LIMIT: 1000,
};

export default class RoutePresenter {
  #pageBodyContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;
  #LOADING = 'loading';
  #tripMainElement = null;
  #tripInfoElement = null;

  #sortAndEventsContainer = new SortAndEventsContainerView(); // section class="trip-events"
  #eventsListContainer = new EventsListView();                // ul      class="trip-events__list"
  #sortComponent = null;                                      // form    class="trip-events__trip-sort  trip-sort"
  #noPoinstComponent = null;                                  // p       class="trip-events__msg">
  #loadingComponent = new EventsListEmptyView(this.#LOADING);
  #mainContainer = new MainView();
  #mainInnerContainer = new MainInnerContainerView();

  #pointPresenters = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(pageBodyContainer, pointsModel, offersModel, filterModel, destinationsModel) {
    this.#pageBodyContainer = pageBodyContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;
    this.#tripMainElement = document.querySelector('.trip-main');

    this.#pointNewPresenter = new PointNewPresenter (this.#eventsListContainer.element, this.#handleViewAction, this.#offersModel.offers, this.#destinationsModel.destinations);

    //#handleModelEvent это обработчик-наблюдатель, который будет реагировать на изменения в каждой модели, т.е. будет вызван
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  //Метод (геттер) для получения данных о точке из модели PointsModel
  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortTimeDown);
      case SortType.PRICE:
        return filteredPoints.sort(sortPriceDown);
      case SortType.DAY:
        return filteredPoints.sort(sortDateDown);
    }

    return filteredPoints;
  }

  //Метод для получения отфильтрованных точек маршрута ТОЛЬКО ПО ДАТЕ
  //Необходимо для того, чтобы элементы в массиве не перемешивались при передаче их в tripInfoElement
  get filteredPoints() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (SortType.DAY) {
      case SortType.DAY:
        return filteredPoints.sort(sortDateDown);
    }

    return filteredPoints;
  }

  //Метод (геттер) для получения данных о дополнительных предложениях из модели OffersModel
  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init () {
    this.#renderBoard();
  }

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback, this.#offersModel.offers, this.#destinationsModel.destinations);
  };

  //Метод-обработчик для "сворачивания" всех форм
  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  //Метод-обработчик для отслеживания обновления View (т.е. при внесении изменений пользователем в браузере)// Здесь будем вызывать обновление модели.
  // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
  // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
  // update - обновленные данные
  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving(update);
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting(update, this.offers, this.destinations);
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving(update, this.offers, this.destinations);
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting(update, this.offers, this.destinations);
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting(update);
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting(update, this.offers, this.destinations);
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  //Метод-обработчик для отслеживания обновления данных в Model
  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда точка маршрута попадает в избранное)
        this.#pointPresenters.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, при удалении точки маршрута)
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        // - показать информационное сообщение в процессе ожидания загрузки данных с сервера
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      default:
        throw new Error ('The transferred update type does not exist');
    }
  };

  //Метод для сортировки точек маршрута. Здесь по порядку выполняются: сортировка, очистка списка, рендеринг нового списка
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    // - Сортируем задачи
    this.#currentSortType = sortType;
    // - Очищаем список
    this.#clearBoard();
    // - Рендерим список заново
    this.#renderBoard();
  };

  //Метод отрисовки компонента дополнительной информацией в header
  #renderTripInfo () {
    this.#tripInfoElement = new TripInfoView(this.filteredPoints, this.offers);
    render(this.#tripInfoElement, this.#tripMainElement, RenderPosition.AFTERBEGIN);
  }

  //Метод отрисовки компонента сортировки
  #renderSort () {
    this.#sortComponent = new SortFormView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#sortAndEventsContainer.element);
  }

  //Метод отрисовки компонента списка <ul>, в который будут попадать либо точки маршрута либо информационные сообщения как элементы списка
  #renderPointsOrInfoContainer () {
    render(this.#eventsListContainer, this.#sortAndEventsContainer.element);
  }

  //Метод отрисовки компонента точки маршрута
  #renderPoint (point, offers, destinations) {
    const pointPresenter = new PointPresenter(this.#eventsListContainer.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderLoading () {
    render (this.#loadingComponent, this.#sortAndEventsContainer.element);
  }

  //Метод отрисовки компонента информационного сообщения об отсутствии точек маршрута
  #renderNoPoints () {
    this.#noPoinstComponent = new EventsListEmptyView(this.#filterType);
    render(this.#noPoinstComponent, this.#sortAndEventsContainer.element);
  }

  //Метод для очистки представления (доски), т.е. всей страницы
  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPoinstComponent) {
      remove(this.#noPoinstComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  //Метод отрисовки представления (доски), т.е. всей страницы
  #renderBoard () {
    if (this.#tripInfoElement) {
      remove(this.#tripInfoElement);
    }
    this.#renderTripInfo();

    render(this.#mainContainer, this.#pageBodyContainer);
    render(this.#mainInnerContainer, this.#mainContainer.element);
    render(this.#sortAndEventsContainer, this.#mainInnerContainer.element);
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderSort();
    this.#renderPointsOrInfoContainer();

    if (!this.points.length) {
      this.#renderNoPoints();
      return;
    }

    this.points.forEach((element, index) => {
      this.#renderPoint(this.points[index], this.offers, this.destinations);
    });
  }
}
