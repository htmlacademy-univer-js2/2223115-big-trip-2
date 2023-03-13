import { getRandomInteger } from '../utils';
import { generateDestination } from './destination';

const TYPE_POINT = [
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

const generateTypePoint = () => TYPE_POINT[getRandomInteger(0, TYPE_POINT.length - 1)];

const generatePoint = () => ({
  'base_price': getRandomInteger(1, 500),
  'date_from': null,
  'date_to': null,
  'destination': generateDestination(),
  'is_favorite': false,
  'offers': [],
  'type': generateTypePoint()
});

export default generatePoint;
