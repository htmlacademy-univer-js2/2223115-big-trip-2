import Observable from '../framework/observable.js';

class DestinationsModel extends Observable {
  constructor(destinationsApiService) {
    super();
    this._destinationsApiService = destinationsApiService;
    this._destinations = []
  };

  get destinations() {
    return this._destinations;
  };

  get cities() {
    const cities = [];
    this._destinations.forEach((destination) => cities.push({id: destination.id, name: destination.name}));
    return cities;
  };

  init = async () => {
    try {
      this._destinations = await this._destinationsApiService.destinations;
    } catch(err) {
      this._destinations = [];
    }
  };
}

export default DestinationsModel;
