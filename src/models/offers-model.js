import Observable from '../framework/observable';

export default class OffersModel extends Observable{
  #offers = null;

  constructor(outerOffers){
    super();
    this.#offers = outerOffers;
  }

  get offers() {
    return this.#offers;
  }
}
