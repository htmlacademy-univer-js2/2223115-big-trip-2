import { getRandomInteger } from '../utils';
import { CITIES, DESCRIPTIONS } from '../const';


const generateDescription = () => {
  const randomLength = getRandomInteger(0, DESCRIPTIONS.length - 1);
  const randomDescription = [];

  for (let i = 0; i < randomLength - 1; i++) {
    randomDescription[i] = DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
  }

  return randomDescription;
};

const generateCity = () => CITIES[getRandomInteger(0, CITIES.length - 1)];

const generateSrc = () => `http://picsum.photos/300/200?r=${getRandomInteger(1, 10)}`;

const generateDestination = () => ({
  'id': 1,
  'description': generateDescription(),
  'name': generateCity(),
  'pictures': [
    {
      'src': generateSrc(),
      'description': generateDescription(),
    }
  ]
});

export default generateDestination;
