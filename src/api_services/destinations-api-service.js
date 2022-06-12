import ApiService from '../framework/api-service';

export default class DestinationsApiService extends ApiService {
  get offers() {
    return this._load({url: 'destinations'}).then(ApiService.parseResponse);
  }
}
