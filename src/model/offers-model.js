import {getOffers} from '../mock/offers.js';

export default class OffersModel {
  offers = getOffers();

  getOffers = () => this.offers;
}
