import Observable from "../framework/observable";
import { FiltersType } from "../const";

class FiltersModel extends Observable {
    constructor() {
        super();
        this._filter = FiltersType.EVERYTHING;
    };

    get filter() {
        return this._filter;
    };

    setFilter = (UpdateType, filter) => {
        this._filter = filter;
        this._notify(UpdateType, filter)
    };
}

export default FiltersModel;
