import dayjs from 'dayjs';
import {getRandomInteger} from '../utils';
import {generateDestination} from './destination.js';
import {TYPES, MIN_BASE_PRICE, MAX_BASE_PRICE, MAX_DAYS_BEFORE, MAX_DAYS_AFTER} from '../const';

const generateDateFrom = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_BEFORE, 0);

  return dayjs().add(daysGap, 'day').toDate();
};

const generateDateTo = () => {
  const daysGap = getRandomInteger(1, MAX_DAYS_AFTER);

  return dayjs().add(daysGap, 'day').toDate();
};

export const generatePoint = () => ({
  basePrice: getRandomInteger(MIN_BASE_PRICE, MAX_BASE_PRICE),
  dateFrom: dayjs(generateDateFrom()).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
  dateTo: dayjs(generateDateTo()).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
  destination: generateDestination(),
  id: String(getRandomInteger(0, 50)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: [1, 3],
  type: TYPES[getRandomInteger(0, TYPES.length - 1)],
});
