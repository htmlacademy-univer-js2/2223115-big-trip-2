import { render } from './framework/render';
import FiltersModel from './model/filters-model';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model';
import FilterPresenter from './presenter/filter-presenter';
import NewPointButtonView from './view/new-point-button-view';
import PointsApiService from './api-services/points-api-service';

const AUTHORIZATION = 'Basic hsdhdnbmfklvsdkebndi';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const newPointContainerElement = document.querySelector('.trip-main')
const tripContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FiltersModel();
const newPointButtonComponent = new NewPointButtonView();

const tripPresenter = new TripPresenter(tripContainerElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersContainerElement, filterModel, pointsModel)

const handleNewPointFormClose = () => {
    newPointButtonComponent.element.disabled = false;
  };
  
const handleNewPointButtonClick = () => {
    tripPresenter.createPoint(handleNewPointFormClose);
    newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, newPointContainerElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick)

filterPresenter.init();
tripPresenter.init();