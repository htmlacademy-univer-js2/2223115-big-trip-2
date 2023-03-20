import { getRandomInteger } from '../utils';
import generateDestination from './destination';
import generateOffersByType from './offer';
import { TYPES_POINT } from '../const';


const generateTypePoint = () => TYPES_POINT[getRandomInteger(0, TYPES_POINT.length - 1)];

const identifyFavorite = () => {
  const id = getRandomInteger();
  return id === 1;
};

const generatePoint = () => ({
  'basePrice': getRandomInteger(1, 500),
  'dateFrom': `2019-07-10T${getRandomInteger(10,23)}:${getRandomInteger(10,59)}:00.845Z`,
  'dateTo': `2019-07-11T${getRandomInteger(10,23)}:${getRandomInteger(10,59)}:00.375Z`,
  'destination': generateDestination(),
  'isFavorite': identifyFavorite(),
  'offers': generateOffersByType(),
  'type': generateTypePoint()
});

export default generatePoint;
