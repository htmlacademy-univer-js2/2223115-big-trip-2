import AbstractView from "../framework/view/abstract-view";

const createFilterItemTemplate = (filter, currentFilter) => {
  const {name, type, count} = filter

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${type === currentFilter ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`)
}

const createFiltersTemplate = (filterItems, currentFilter) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilter)).join(' ');

  return `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

class FiltersView extends AbstractView {
  constructor(filters, currentFilter){
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;
  }

  get template() {
    return createFiltersTemplate(this._filters, this._currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this._filterTypeChangeHandler);
  };

  _filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}

export default FiltersView;
