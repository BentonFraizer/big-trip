import Observable from '../framework/observable';
import UpdateType from '../consts';

export default class OffersModel extends Observable{
  #offersApiService = null;
  #offers = [];

  constructor(offersApiService){
    super();
    this.#offersApiService = offersApiService;
  }

  init = async () => {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offers = offers;
    } catch(err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  };
}
