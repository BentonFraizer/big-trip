import {remove, render, RenderPosition} from '../framework/render';
import EditEventFormView from '../views/edit_event_form/edit-event-form-view';
import {UserAction, UpdateType} from '../consts';

export default class PointNewPresenter {
  #eventsListContainer = null;
  #changeData = null;
  #offers = null;
  #destinations = null;
  #editPointFormComponent = null;
  #destroyCallback = null;

  constructor(eventsListContainer, changeData, offers, destinations) {
    this.#eventsListContainer = eventsListContainer;
    this.#changeData = changeData;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init (callback) {
    this.#destroyCallback = callback;

    if (this.#editPointFormComponent !== null) {
      return;
    }

    this.#editPointFormComponent = new EditEventFormView(undefined, this.#offers, this.#destinations);
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

  setSaving = (update, offers, destinations) => {
    this.#editPointFormComponent.updateElement({
      point: {
        ...update,
        isDisabled: true,
        isSaving: true,
      },
      offers: [...offers,],
      destinations: [...destinations,],
    });
  };

  setAborting = (update, offers, destinations) => {
    const resetFormState = () => {
      this.#editPointFormComponent.updateElement({
        point: {
          ...update,
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        },
        offers: [...offers,],
        destinations: [...destinations,],
      });
    };

    this.#editPointFormComponent.shake(resetFormState);
  };

  #handleFormSubmit = (update) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { ...update.point,},
      { ...update.offers,},
    );
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
