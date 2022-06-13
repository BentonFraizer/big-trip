import dayjs from 'dayjs';

//Функция преобразующая дату из формата '2022-04-29T15:59:39.600Z' в формат 'Apr 29'
const humanizeDateMonthDay = (anyDate) => dayjs(anyDate).format('MMM DD');

//Функция определения нажатия клавиши Escape
const isEscKeyPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

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

//Функция для проверки равны ли две даты (т.е. совпадает ли дата)
const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

//Функция проверки на равенство двух чисел (поле PRICE)
const isPricesEqual = (priceOne, priceTwo) => {
  if (Number(priceOne) === Number(priceTwo)) {
    return true;
  }

  return false;
};

export {humanizeDateMonthDay, isEscKeyPressed, sortPriceDown, sortTimeDown, sortDateDown, isDatesEqual, isPricesEqual};
