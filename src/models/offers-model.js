export default class OffersModel {
  #offers = null;

  constructor(outerOffers){
    this.#offers = outerOffers;
  }

  get offers() {
    return this.#offers;
  }
}
