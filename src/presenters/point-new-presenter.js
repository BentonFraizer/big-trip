import {remove, render, RenderPosition} from '../framework/render';
import EditEventFormView from '../views/edit_event_form/edit-event-form-view';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../consts';

export default class PointNewPresenter {
  #eventsListContainer = null;
  #changeData = null;
  #offers = null;
  #editPointFormComponent = null;
  #destroyCallback = null;

  constructor(eventsListContainer, changeData, offers) {
    this.#eventsListContainer = eventsListContainer;
    this.#changeData = changeData;
    this.#offers = offers;
  }

  init (callback) {
    this.#destroyCallback = callback;

    if (this.#editPointFormComponent !== null) {
      return;
    }

    this.#editPointFormComponent = new EditEventFormView(undefined, this.#offers);
    this.#editPointFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editPointFormComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#editPointFormComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#editPointFormComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editPointFormComponent);
    this.#editPointFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (update) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      //при создании новой точки, ей нужно присваивать id
      {id: nanoid(), ...update.point,},
      { ...update.offers,},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
