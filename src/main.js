import { render } from './render';
import FiltersView from './view/filters';
import Trip from './presenter/trip';


const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripContainerElement = document.querySelector('.trip-events');
const tripPresenter = new Trip(tripContainerElement);

render(new FiltersView(), filtersContainerElement);
tripPresenter.init();
