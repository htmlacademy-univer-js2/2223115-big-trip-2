import { render } from './framework/render';
import FiltersView from './view/filters';
import TripPresenter from './presenter/trip';
import PointsModel from './model/points-model';
import generateFilter from './fish-data/filter';
import generateSortedPoints from './fish-data/sorted-point';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripContainerElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(tripContainerElement, pointsModel);

const filters = generateFilter(pointsModel.points)
const sortedPoints = generateSortedPoints(pointsModel.points)

render(new FiltersView(), filtersContainerElement);
tripPresenter.init();
