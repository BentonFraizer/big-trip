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
  offers: [
    {
      'id': 1,
      'title': 'Infotainment system',
      'price': 50
    },
    {
      'id': 2,
      'title': 'Order meal',
      'price': 100
    },
    {
      'id': 3,
      'title': 'Choose seats',
      'price': 190
    }
  ],
  type: TYPES[getRandomInteger(0, TYPES.length - 1)],
});


//Структура объекта "point" для примера
// {
//   "base_price": 1100,
//   "date_from": "2019-07-10T22:55:56.845Z",
//   "date_to": "2019-07-11T11:22:13.375Z",
//   "destination": $Destination$,
//   "id": "0",
//   "is_favorite": false,
//   "offers": $Array<Offer>$,
//   "type": "bus"
// }
//================== Структура destination ============
// destination: {
//     name: "Oslo",
//     description: "Oslo, full of of cozy canteens where you can try the best coffee in the Middle East.",
//     pictures: [
//       {
//         "src": "http://picsum.photos/300/200?r=0.1586226483018922",
//         "description": "Oslo zoo"
//       },
//       {
//         "src": "http://picsum.photos/300/200?r=0.472025708529763",
//         "description": "Oslo kindergarten"
//       },
//     ],
//   },
//================== Структура offers =================
// offers: [
//     {
//       "id": 1,
//       "title": "With automatic transmission",
//       "price": 110
//     },
//     {
//       "id": 2,
//       "title": "With air conditioning",
//       "price": 180
//     }
//   ],
