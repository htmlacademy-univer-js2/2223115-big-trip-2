const CITIES = [
  {
    'id': 0,
    'city': 'Tokyo'
  },
  {
    'id': 1,
    'city': 'Toronto'
  },
  {
    'id': 2,
    'city': 'Cape Town'
  },
  {
    'id': 3,
    'city': 'Paris'
  },
  {
    'id': 4,
    'city': 'Milan'
  },
]

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const TITLES_OFFER = [
  'Add a child safety seat',
  'Stay overnight',
  'Add lunch',
  'Rent a polaroid',
  'Add a place for a pet',
  'Book a window seat',
  'Book a place in the recreation area',
  'Use the translator service',
  'Upgrade to a business class'
];

const TYPES_POINT = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const COUNT_POINT = 20;

const FILTERS_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
}

const FILTERS_MESSAGE = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  past: 'There are no past events now'
}

const SORTED_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
}

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
}

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
}

export {
  CITIES,
  TITLES_OFFER,
  DESCRIPTIONS,
  TYPES_POINT,
  COUNT_POINT,
  FILTERS_TYPE,
  FILTERS_MESSAGE,
  SORTED_TYPE,
  UserAction,
  UpdateType
};

