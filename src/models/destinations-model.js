import Observable from '../framework/observable';

export default class DestinationsModel extends Observable{
  #destinationsApiService = null;
  #destinations = [];

  constructor(destinationsApiService) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  init = async () => {
    try {
      const destinations = await this.destinationsApiService.destinations;
      this.#destinations = destinations.map();
    } catch(err){
      this.#destinations = [];
    }
  };
}
