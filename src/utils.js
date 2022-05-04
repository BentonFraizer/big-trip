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

//!Функция на данный момент не используется. Пригодится в будущем
//Функция которая помогает определить, передаваемая дата (день) раньше текущего или нет
//Пример, сегодня следующая дата: '2022-05-02T15:59:39.600Z'
//Передавая '2022-06-29T15:59:39.600Z' получим 'false'
//Передавая '2022-03-29T15:59:39.600Z' получим 'true'
const isPastDate = (anyDate) => anyDate && dayjs().isAfter(anyDate, 'D');

//Функция для проверки отображения того, относится ли точка маршрута к избранному или нет
const getFavoriteState = (isFavorite) => {
  if (isFavorite) {
    return '--active';
  }
  return '';
};

export {getRandomInteger, humanizeDateMonthDay, isPastDate, getFavoriteState};
