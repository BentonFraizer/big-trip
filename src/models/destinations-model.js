import Observable from '../framework/observable';

export default class DestinationsModel extends Observable{
  #destinationsApiService = null;
  #destinations = null;

  constructor(destinationsApiService) {
    super();
    this.#destinationsApiService = destinationsApiService;

    this.#destinationsApiService.destinations.then((destinations)=> {
      console.log('Тут пункты назначения', destinations);
    });
  }
}
