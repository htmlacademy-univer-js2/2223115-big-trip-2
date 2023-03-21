import { createElement } from '../render';
import { humanizeDate, humanizeTime } from '../utils';

const createNewPointTemplate = (point = {}) => {
  const {
    type = 'taxi',
    basePrice = 99,
    destination = {
      'description': 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
      'name': 'Toronto',
      'pictures': [
        {
          'src': 'http://picsum.photos/300/200?r=1'
        },
        {
          'src': 'http://picsum.photos/300/200?r=2'
        }
      ]
    },
    dateFrom = '2019-07-10T22:55:56.845Z',
    dateTo = '2019-07-11T11:22:13.375Z',
    offers = {
      'offers': [
        {
          'title': 'Add lunch',
          'price': 30
        },
        {
          'title': 'Use the translator service',
          'price': 70
        }
      ]
    }
  } = point;

  const checkTypeDestination = (currentType) => {
    if (currentType === type) {
      return 'checked';
    }

    return '';
  };

  const getTemplateOffer = (offer) => (
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
        <label class="event__offer-label" for="event-offer-comfort-1">
      <span class="event__offer-title">${offer['title']}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer['price']}</span>
        </label>
      </div>`);

  const createOffersElement = () => {
    let container ='';

    if (offers['offers'].length === 0) {
      return '';
    } else {
      for (let i = 0; i < offers['offers'].length; i++) {
        container += getTemplateOffer(offers['offers'][i]);
      }
    }

    return container;
  };

  const getTemplatePhoto = (photo) => (
    `<img class="event__photo" src="${photo['src']}" alt="Event photo">`
  );

  const createPhotosElement = () => {
    let container = '';

    if (destination['pictures'].length === 0) {
      return '';
    } else {
      for (let i = 0; i < destination['pictures'].length; i++) {
        container += getTemplatePhoto(destination['pictures'][i]);
      }
    }

    return container;
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
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${checkTypeDestination('taxi')}>
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${checkTypeDestination('bus')}>
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${checkTypeDestination('train')}>
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${checkTypeDestination('ship')}>
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${checkTypeDestination('drive')}>
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${checkTypeDestination('flight')}>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${checkTypeDestination('check-in')}>
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${checkTypeDestination('sightseeing')}>
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${checkTypeDestination('restaurant')}>
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                  </div>
              </fieldset>
              </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination['name']}" list="destination-list-1">
              <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
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
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
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
              <p class="event__destination-description">${destination['description']}</p>

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

class NewPointView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createNewPointTemplate(this.point);
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

export default NewPointView;
