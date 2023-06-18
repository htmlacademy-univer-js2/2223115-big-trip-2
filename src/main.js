import { render } from './framework/render';
import FiltersView from './view/filters';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model';
import FiltersModel from './model/filters-model';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();
const tripPresenter = new TripPresenter(tripContainerElement, pointsModel);

const filters = [
    {
        type: 'EVERYTHING',
        name: 'EVERYTHING'
    }
]

render(new FiltersView(filters, 'everything'), filtersContainerElement);

tripPresenter.init();
