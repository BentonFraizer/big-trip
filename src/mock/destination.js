import {getRandomInteger} from '../utils';

//Функция для получения случайного названия города из массива cities
const CITIES = ['Berlin', 'Monaco', 'Barcelona', 'Kioto', 'Amsterdam', 'Hiroshima', 'Rome', 'Madrid', 'Tokio', 'Den Haag'];
const getCity = () => CITIES[getRandomInteger(0, CITIES.length - 1)];

//Функции получения строки случайной длины для полей description и pictures.description
const LOREM_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phaselus eros mauris, condime.';
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
