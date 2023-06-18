import AbstractView from "../framework/view/abstract-view";

const createFilterItemTemplate = (filter, isChecked) => {
  const {name} = filter

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`)
}

const createFiltersTemplate = (filterItems, currentFilter) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilter === filter)).join(' ');

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
}

export default FiltersView;
