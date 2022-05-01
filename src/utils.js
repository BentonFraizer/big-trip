// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//Функция создания одного типа для структур данных Point и Offer
const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const getType = () => types[getRandomInteger(0, types.length - 1)];
const commonType = getType ();

//Функция для получения случайного названия города из массива cities
const cities = ['Berlin', 'Monaco', 'Barcelona', 'Kioto', 'Amsterdam', 'Hiroshima', 'Rome', 'Madrid', 'Tokio', 'Den Haag'];
const getCity = () => cities[getRandomInteger(0, cities.length - 1)];

//Функция получения строки случайной длины для полей description
const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phaselus eros mauris, condime.';
const getRandomDescription = () => loremText.substring(0, (getRandomInteger(1, 6) * 50));

//Функция получения строки случайной длины для полей title
const getRandomTitle = () => loremText.substring(0, (getRandomInteger(1, 6) * 25));

export {getRandomInteger, commonType, getCity, getRandomDescription, getRandomTitle};
