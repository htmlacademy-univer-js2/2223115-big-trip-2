import { render } from './framework/render';
import FiltersModel from './model/filters-model';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model';
import FilterPresenter from './presenter/filter-presenter';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FiltersModel();
const tripPresenter = new TripPresenter(tripContainerElement, pointsModel);
const filterPresenter = new FilterPresenter(filtersContainerElement, filterModel, pointsModel)

tripPresenter.init();
filterPresenter.init();