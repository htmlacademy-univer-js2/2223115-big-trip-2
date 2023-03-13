import { getRandomInteger } from '../utils';

const CITIES = [
  'Tokyo',
  'Toronto',
  'Cape Town',
  'Paris',
  'Milan'
];

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


const generateDescription = () => {
  const randomLength = getRandomInteger(0, DESCRIPTIONS.length - 1);
  const randomDescription = [];

  for (let i = 0; i < randomLength - 1; i++) {
    randomDescription[i] = DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
  }

  return randomDescription;
};

const generateCity = () => CITIES[getRandomInteger(0, CITIES.length - 1)];

const generateSrc = () => `http://picsum.photos/300/200?r=${getRandomInteger()}`;

const generateDestination = () => ({
  'id': 1,
  'description': generateDescription(),
  'name': generateCity(),
  'pictures': [
    {
      'src': generateSrc(),
      'description': this.description
    }
  ]
});

export default generateDestination;
