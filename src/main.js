import { render } from './framework/render';
import FiltersView from './view/filters';
import TripPresenter from './presenter/trip';
import PointsModel from './model/points-model';
import generateFilter from './fish-data/filter';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripContainerElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(tripContainerElement, pointsModel);

const filters = generateFilter(pointsModel.points)

render(new FiltersView(filters), filtersContainerElement);
tripPresenter.init();
