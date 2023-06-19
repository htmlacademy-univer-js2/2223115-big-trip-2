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

const FiltersType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const FiltersMessage = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  past: 'There are no past events now'
};

const SortedType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export {
  TYPES_POINT,
  FiltersType,
  FiltersMessage,
  SortedType,
  UserAction,
  UpdateType,
  Method
};
