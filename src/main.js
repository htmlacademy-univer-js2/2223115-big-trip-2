import { render, RenderPosition } from './render';
import FiltersView from './view/filters';
import Trip from './presenter/trip';


const filtersContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip({container: tripContainer});

render(new FiltersView(), filtersContainer, RenderPosition.BEFOREEND);
tripPresenter.init();
