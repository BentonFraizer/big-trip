import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//Функция преобразующая дату из формата '2022-04-29T15:59:39.600Z' в формат 'Apr 29'
const humanizeDateMonthDay = (anyDate) => dayjs(anyDate).format('MMM DD');

//Функция определения нажатия клавиши Escape
const isEscKeyPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomInteger, humanizeDateMonthDay, isEscKeyPressed};
