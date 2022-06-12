import Observable from '../framework/observable';

export default class OffersModel extends Observable{
  #offersApiService = null;
  #offers = [];

  constructor(offerssApiService){
    super();
    this.#offersApiService = offerssApiService;
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offers = offers.map();
    } catch(err) {
      this.#offers = [];
    }
  };
}
