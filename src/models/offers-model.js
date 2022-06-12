import Observable from '../framework/observable';

export default class OffersModel extends Observable{
  #offersApiService = null;
  #offers = null;

  constructor(offerssApiService){
    super();
    this.#offersApiService = offerssApiService;

    this.#offersApiService.offers.then((offers)=> {
      console.log('Тут доп.опции', offers);
    });
  }

  get offers() {
    return this.#offers;
  }
}
