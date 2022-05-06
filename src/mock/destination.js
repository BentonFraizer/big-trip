import {getRandomInteger} from '../utils';
import {CITIES, LOREM_TEXT} from '../const';

//Функция для получения случайного названия города из массива cities
const getCity = () => CITIES[getRandomInteger(0, CITIES.length - 1)];

//Функции получения строки случайной длины для полей description и pictures.description
const getRandomDescription = () => LOREM_TEXT.substring(0, (getRandomInteger(1, 6) * 50));
const getRandomPictureDescription = () => LOREM_TEXT.substring(0, (getRandomInteger(3, 9) * 2));

//Функция для получения случайной картинки
const randomPicture = () => Math.random().toFixed(15);

const getPictures = () => {
  const pictures = [];
  const iterationsAmount = getRandomInteger(0, 5);
  for (let i = 0; i < iterationsAmount; i++) {
    pictures.push({
      'src': `http://picsum.photos/300/200?r=${randomPicture()}`,
      'description': `${getRandomPictureDescription()}`
    });
  }
  return pictures;
};

export const generateDestination = () => ({
  name: getCity(),
  description: getRandomDescription(),
  pictures: getPictures(),
});
