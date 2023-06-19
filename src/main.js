import { render } from './framework/render';
import NewPointButtonView from './view/new-point-button-view';
import FiltersModel from './model/filters-model';
import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointsApiService from './api-services/points-api-service';
import OffersApiService from './api-services/offers-api-service';
import DestinationsApiService from './api-services/destination-api-service';

const AUTHORIZATION = 'Basic hsdhdnbmfklvsdkebndi';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const newPointContainerElement = document.querySelector('.trip-main')
const tripContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION))
const filterModel = new FiltersModel();
const newPointButtonComponent = new NewPointButtonView();

const tripPresenter = new TripPresenter(tripContainerElement, pointsModel, offersModel, destinationsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersContainerElement, filterModel, pointsModel)

const handleNewPointFormClose = () => {
    newPointButtonComponent.element.disabled = false;
  };
  
const handleNewPointButtonClick = () => {
    tripPresenter.createPoint(handleNewPointFormClose);
    newPointButtonComponent.element.disabled = true;
};

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      render(newPointButtonComponent, newPointContainerElement);
      newPointButtonComponent.setClickHandler(handleNewPointButtonClick)
    });
  });
});

filterPresenter.init();
tripPresenter.init();



