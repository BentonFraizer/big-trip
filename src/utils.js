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

/**
 * Функция для обновления точки маршрута
 * @param {Map} items Коллекция элементов, где хранится объект, который необходимо обновить
 * @param {ClassInstance} update Компонент, который необходимо обновить
 */
const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const getWeightForPrices = (pointA, pointB) => {
  if (pointA === pointB) {
    return 0;
  }

  if (pointA > pointB) {
    return -1;
  }

  if (pointA < pointB) {
    return 1;
  }
};

const getWeightForTime = (pointAFrom, pointATo, pointBFrom, pointBTo) => {
  const timeAFrom = dayjs(pointAFrom);
  const timeATo = dayjs(pointATo);
  const timeBFrom = dayjs(pointBFrom);
  const timeBTo = dayjs(pointBTo);
  const timeDifferenceForPointA = Math.abs(timeAFrom.diff(timeATo));
  const timeDifferenceForPointB = Math.abs(timeBFrom.diff(timeBTo));
  if (timeDifferenceForPointA === timeDifferenceForPointB) {
    return 0;
  }

  if (timeDifferenceForPointA > timeDifferenceForPointB) {
    return -1;
  }

  if (timeDifferenceForPointA < timeDifferenceForPointB) {
    return 1;
  }
};

const getWeightForDate = (pointAFrom, pointBFrom) => {
  const timeAFrom = dayjs(pointAFrom);
  const timeBFrom = dayjs(pointBFrom);
  const differencePointAFromAndNow = dayjs().diff(timeAFrom);
  const differencePointBFromAndNow = dayjs().diff(timeBFrom);

  if (differencePointAFromAndNow === differencePointBFromAndNow) {
    return 0;
  }

  if (differencePointAFromAndNow < differencePointBFromAndNow) {
    return -1;
  }

  if (differencePointAFromAndNow > differencePointBFromAndNow) {
    return 1;
  }
};

//Функция для сортировки точек маршрута по полю "PRICE"
const sortPriceDown = (pointA, pointB) => getWeightForPrices(pointA.basePrice, pointB.basePrice);

//Функция для сортировки точек маршрута по полю "TIME"
const sortTimeDown = (pointA, pointB) => getWeightForTime(pointA.dateFrom, pointA.dateTo, pointB.dateFrom, pointB.dateTo);

//Функция для сортировки точек по полю "DAY"
const sortDateDown = (pointA, pointB) => getWeightForDate(pointA.dateFrom, pointB.dateFrom);

export {getRandomInteger, humanizeDateMonthDay, isEscKeyPressed, updateItem, sortPriceDown, sortTimeDown, sortDateDown};
