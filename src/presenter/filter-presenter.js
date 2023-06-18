import { remove, render, replace } from "../framework/render";
import FiltersView from "../view/filters";
import { filters } from "../utils";
import { UpdateType, FILTERS_TYPE } from "../const";

class FilterPresenter {
    constructor(filterContainer, filterModel, pointsModel) {
        this._filterContainer = filterContainer;
        this._filterComponent = null;
        this._filterModel = filterModel;
        this._pointsModel = pointsModel;

        this._pointsModel.addObserver(this._handleModelEvent);
        this._filterModel.addObserver(this._handleModelEvent);
    }

    get filters() {
        const points = this._pointsModel.points;

        return [
            {
                type: FILTERS_TYPE.EVERYTHING,
                name: 'EVERYTHING',
                count: filters[FILTERS_TYPE.EVERYTHING](points).length
            },
            {
                type: FILTERS_TYPE.FUTURE,
                name: 'FUTURE',
                count: filters[FILTERS_TYPE.FUTURE](points).length
            },
            {
                type: FILTERS_TYPE.PAST,
                name: 'PAST',
                count: filters[FILTERS_TYPE.PAST](points).length
            }
        ]
    }

    init = () => {
        const filters = this.filters;
        const prevFilterComponent = this._filterComponent;

        this._filterComponent = new FiltersView(filters, this._filterModel.filter);
        this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

        if (prevFilterComponent === null) {
            render(this._filterComponent, this._filterContainer);
            return;
          }

        replace(this._filterComponent, prevFilterComponent);
        remove(prevFilterComponent);
    }

    _handleModelEvent = () => {
        this.init();
    }

    _handleFilterTypeChange = (filterType) => {
        if (this._filterModel.filter === filterType) {
            return;
        }

        this._filterModel.setFilter(UpdateType.MAJOR, filterType);
    }
}

export default FilterPresenter;