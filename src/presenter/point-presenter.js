import { render, replace } from '../framework/render';
import PointView from '../view/point';
import EditPointView from '../view/edit-point';

class PointPresenter {
    constructor (tripList, points) {
        this._tripListComponent = tripList;
        this._pointsModel = points;
        this._point = null;
        this._offers = null;
        this._destination = null;
        this._pointComponent = null;
        this._pointEditComponent = null;
    }

    init = (point) => {
        this._point = point

        this._offers = this._pointsModel.getOffers(this._point)
        this._destination = this._pointsModel.getDestination(this._point)
        this._pointComponent = new PointView(this._point, this._offers, this._destination);
        this._pointEditComponent = new EditPointView(this._point, this._offers, this._destination);

        this._pointComponent.setEditClickHandler(() => {
            this._replacePointToForm();
            document.addEventListener('keydown', this._onEscKeyDown);
        });
    
        this._pointEditComponent.setFormSubmitHandler(() => {
            this._replaceFormToPoint()
            document.removeEventListener('keydown', this._onEscKeyDown);
        });
    
        this._pointEditComponent.setButtonClickHandler(() => {
            this._replaceFormToPoint()
            document.removeEventListener('keydown', this._onEscKeyDown);
        });

        render(this._pointComponent, this._tripListComponent);
    }   

    _replacePointToForm = () => {
        replace(this._pointEditComponent, this._pointComponent);
    };

    _replaceFormToPoint = () => {
        replace(this._pointComponent, this._pointEditComponent);
    };

    _onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this._replaceFormToPoint();
        document.removeEventListener('keydown', this._onEscKeyDown);
        }
    }; 
}

export default PointPresenter;