import { getRandomInteger } from '../utils';

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

const TITLE_OFFER = [
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

