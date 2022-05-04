import {getRandomInteger} from '../utils';
import {CITIES, LOREM_TEXT} from '../const';

//Функция для получения случайного названия города из массива cities
const getCity = () => CITIES[getRandomInteger(0, CITIES.length - 1)];

//Функция получения строки случайной длины для полей description
const getRandomDescription = () => LOREM_TEXT.substring(0, (getRandomInteger(1, 6) * 50));

const getPictures = () => {
  const pictures = [];
  const picture = {
    'src': 'http://picsum.photos/300/200?r=0.571499150444382',
    'description': 'Berlin city centre'
  };
  const iterationsAmount = getRandomInteger(0, 10);
  for (let i = 0; i < iterationsAmount; i++) {
    pictures.push(picture);
  }
  return pictures;
};

export const generateDestination = () => ({
  name: getCity(),
  description: getRandomDescription(),
  pictures: getPictures(),
});
