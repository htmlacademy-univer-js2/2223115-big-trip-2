import { remove, render, RenderPosition } from "../framework/render";
import EditPointView from "../view/edit-point";
import { UserAction, UpdateType } from "../const";

class NewPointPresenter {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._pointEditComponent = null;
    this._destroyCallback = null
  }

  init = (callback, offers, destinations, cities) => {
    this._destroyCallback = callback;
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new EditPointView(cities, offers, destinations);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pointEditComponent, this._pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  };

  destroy = () => {
    if (this._pointEditComponent === null) {
      return;
    }

    this._destroyCallback?.();

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  };

  setSaving = () => {
    this._pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this._pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._pointEditComponent.shake(resetFormState);
  };

  _handleFormSubmit = (point) => {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  _handleDeleteClick = () => {
    this.destroy();
  };

  _escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

export default NewPointPresenter;