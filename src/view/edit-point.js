import AbstractStatefulView from '../framework/view/abstract-stateful-view'
import { humanizeDate, humanizeTime, getFinalPrice } from '../utils';
import { CITIES } from '../const';
import dayjs from 'dayjs';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  type: 'taxi',
  basePrice: 99,
  destination: 1,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  offers: []
}

const BLANK_OFFERS =[
      {
        'id': 0,
        'title': 'Add a child safety seat',
        'price': 100
      },
      {
        'id': 1,
        'title': 'Rent a polaroid',
        'price': 100
      },
      {
        'id': 2,
        'title': 'Upgrade to a business class',
        'price': 100
      }
]

const BLANK_DESTINATION = {
  'id': 1,
  'description': ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.'],
  'name': 'Toronto',
  'pictures': []
}

const createEditPointTemplate = (point, currentOffers, currentDestination) => {
  const {
    type,
    dateFrom,
    dateTo,
    offers} = point;

  const checkTypePoint = (currentType) => {

    if (currentType === type) {
      return 'checked';
    }

    return '';
  };

  const getOption = (option) => {
    return(
      `<option value="${option.city}"></option>`
    )
  }

  const createOption = () => {
    const options = CITIES.map(getOption)

    return options.join('')
  }

  const getTemplateOffer = (offer) => {
      return(
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${offer['id']}" type="checkbox" name="event-offer-comfort" ${offers.find((x) => x === offer['id'])? 'checked': '' }>
          <label class="event__offer-label" for="event-offer-comfort-${offer['id']}">
          <span class="event__offer-title">${offer['title']}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer['price']}</span>
          </label>
        </div>`);
  } 

  const createOffersElement = () => {
    const offersView = currentOffers.map(getTemplateOffer);

    return offersView.join(' ');
  };

  const getTemplatePhoto = (photo) => (
    `<img class="event__photo" src="${photo['src']}" alt="Event photo">`
  );

  const createPhotosElement = () => {
    const photosView = currentDestination['pictures'].map(getTemplatePhoto);

    return photosView.join(' ');
  };

  return(
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
          <header class="event__header">
          <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
              <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>

                  <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${checkTypePoint('taxi')}>
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${checkTypePoint('bus')}>
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${checkTypePoint('train')}>
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${checkTypePoint('ship')}>
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${checkTypePoint('drive')}>
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${checkTypePoint('flight')}>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${checkTypePoint('check-in')}>
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${checkTypePoint('sightseeing')}>
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${checkTypePoint('restaurant')}>
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                  </div>
              </fieldset>
              </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(currentDestination['name'])}" list="destination-list-1">
              <datalist id="destination-list-1">
              ${createOption()}
              </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom, 'DD/MM/YY')} ${humanizeTime(dateFrom)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, 'DD/MM/YY')} ${humanizeTime(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${getFinalPrice(currentOffers, point)}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
          </button>
          </header>
          <section class="event__details">
          <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              ${createOffersElement()}
          </section>

          <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${currentDestination['description']}</p>

              <div class="event__photos-container">
              <div class="event__photos-tape">
                ${createPhotosElement()}
              </div>
              </div>
          </section>
          </section>
      </form>
    </li>`
  );
};

class EditPointView extends AbstractStatefulView {
  constructor(point = BLANK_POINT, offers = BLANK_OFFERS, destination = BLANK_DESTINATION) {
    super()
    this._state = EditPointView.parsePointToState(point);
    this._offers = offers;
    this._destination = destination;
    this._prevOffers = offers;
    this._prevDestination = destination;
    this._datepicker = null;
    this._setInnerHandlers();
    this._setDatepickerTo();
    this._setDatepickerFrom();
  }

  get template() {
    return createEditPointTemplate(this._state, this._offers, this._destination);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.submit = callback
    this.element.querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit(EditPointView.parseStateToPoint(this._state));
  }

  setButtonClickHandler = (callback) => {
    this._callback.click = callback
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this._buttonClickHandler);
  }

  _buttonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  setDeleteClickHandler = (callback) => {
    this._callback.delete = callback
    this.element.querySelector('.event__reset-btn').addEventListener('click', this._deleteClickHandler)
  }

  _deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.delete(EditPointView.parseStateToPoint(this._state));
  }

  _priceChangeHandler = (evt) => {
    evt.preventDefault();
    if (isNaN(Number(evt.target.value))) {
      return this._state;
    }
    this._setState({
      basePrice: Number(evt.target.value),
    });
  }

  _offersChangeHandler = (evt) => {
    const checkedOfferId = Number(evt.target.id.slice(-1));
    if (this._state.offers.includes(checkedOfferId)) {
      this._state.offers = this._state.offers.filter((x) => x !== checkedOfferId);
    }
    else {
      this._state.offers.push(checkedOfferId);
    }
    this.updateElement({
      offers: this._state.offers,
    });
  };

  _destinationChangeHandler = (evt) => {
    evt.preventDefault()
    const currentCity = evt.target.value
    const currentId = CITIES.find((x) => x.city === currentCity)['id']
    this._destination = destinations.find((x) => x.id === currentId)
    this.updateElement({destination: currentId})
  }

  _typeChangeHandler = (evt) => {
    this._offers = offersByType.find((x) => x.type === evt.target.value)['offers']
    this.updateElement({type: evt.target.value, offers: []})
  }

  _restoreHandlers = () => {
    this._setInnerHandlers();
    this._setDatepickerTo();
    this._setDatepickerFrom();
    this.setFormSubmitHandler(this._callback.submit);
    this.setButtonClickHandler(this._callback.click);
    this.setDeleteClickHandler(this._callback.delete);
  };

  _setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change',  this._typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this._destinationChangeHandler);
    this.element.querySelector('.event__section--offers').addEventListener('change', this._offersChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this._priceChangeHandler);
  }

  reset = (point) => {
    this._offers = this._prevOffers;
    this._destination = this._prevDestination;
    this.updateElement(
      EditPointView.parsePointToState(point)
    )
  }

  removeElement = () => {
    super.removeElement();
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  };

  _pointDateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  _pointDateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  _setDatepickerFrom = () => {
    if (this._state.dateFrom) {
      this._datepicker = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateFrom,
          minDate: this._state.dateFrom,
          maxDate: this._state.dateTo,
          onChange: this._pointDateFromChangeHandler,
        },
      );
    }
  };

  _setDatepickerTo = () => {
    if (this._state.dateTo) {
      this._datepicker = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateTo,
          minDate: this._state.dateFrom,
          onChange: this._pointDateToChangeHandler,
        },
      );
    }
  };

  static parsePointToState = (point) => ({...point,
    dateTo: dayjs(point.dateTo).toDate(),
    dateFrom: dayjs(point.dateFrom).toDate()
  });

  static parseStateToPoint = (state) => ({...state})
}


export default EditPointView;
