import { getRandomInteger } from '../utils';
import generateDestination from './destination';
import generateOffersByType from './offer';
import { TYPE_POINT } from '../const';


const generateTypePoint = () => TYPE_POINT[getRandomInteger(0, TYPE_POINT.length - 1)];

const identifyFavorite = () => {
  const id = getRandomInteger();
  return id === 1;
};

const generatePoint = () => ({
  'basePrice': getRandomInteger(1, 500),
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': generateDestination(),
  'isFavorite': identifyFavorite(),
  'offers': generateOffersByType(),
  'type': generateTypePoint()
});

export default generatePoint;
