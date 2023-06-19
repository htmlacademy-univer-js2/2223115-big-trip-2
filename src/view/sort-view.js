import AbstractView from '../framework/view/abstract-view';
import { SortedType } from '../const';

const createSortTemplate = (sortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${sortType === SortedType.DAY? 'checked': ''}>
      <label class="trip-sort__btn" for="sort-day" data-sort-type="${SortedType.DAY}">Day</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event" data-sort-type="${SortedType.EVENT}">Event</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${sortType === SortedType.TIME? 'checked': ''}>
      <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortedType.TIME}">Time</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${sortType === SortedType.PRICE? 'checked': ''}>
      <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortedType.PRICE}">Price</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer" data-sort-type="${SortedType.OFFERS}">Offers</label>
    </div>
  </form>`
);

class SortView extends AbstractView {
  constructor(sortType) {
    super();
    this._sortType = sortType;
  };

  get template() {
    return createSortTemplate(this._sortType);
  };

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this._sortTypeChangeHandler);
  };

  _sortTypeChangeHandler = (evt) => {
    if (!evt.target.dataset.sortType) {
      return
    } 
    
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}

export default SortView;
