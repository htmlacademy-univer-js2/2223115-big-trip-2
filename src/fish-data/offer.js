import { getRandomInteger } from '../utils';
import { TITLE_OFFER, TYPE_POINT } from '../const';


const generateTypeOffers = () => TYPE_POINT[getRandomInteger(0, TYPE_POINT.length - 1)];
const generateTitleOffer = () => TITLE_OFFER[getRandomInteger(0, TITLE_OFFER.length - 1)];

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

