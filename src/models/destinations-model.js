import Observable from '../framework/observable';
import {UpdateType} from '../consts';

export default class DestinationsModel extends Observable{
  #destinationsApiService = null;
  #destinations = [];

  constructor(destinationsApiService) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations;
    } catch(err){
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };
}
