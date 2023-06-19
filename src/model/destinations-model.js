import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  _destinations = [];
  _destinationsApiService = null;

  constructor(destinationsApiService) {
    super();
    this._destinationsApiService = destinationsApiService;
    this._destinations = []
  }

  init = async () => {
    try {
      this._destinations = await this._destinationsApiService.destinations;
    } catch(err) {
      this._destinations = [];
    }
  };

  get destinations() {
    return this._destinations;
  }
}