import { getRandomInteger } from '../utils';
import { TITLES_OFFER, TYPES_POINT } from '../const';


const generateTypeOffers = () => TYPES_POINT[getRandomInteger(0, TYPES_POINT.length - 1)];
const generateTitleOffer = () => TITLES_OFFER[getRandomInteger(0, TITLES_OFFER.length - 1)];

const generateOffer = () => ({
  'id': 1,
  'title': generateTitleOffer(),
  'price': getRandomInteger(1,200)
});

const generateOffersByType = () => ({
  'type': generateTypeOffers(),
  'offers': Array.from({length: getRandomInteger(0,3)}, generateOffer)
});

export default generateOffersByType;

