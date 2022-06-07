import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/utils';
import dayjs from 'dayjs';

const MAX_DAYS = 7;

const generateDateFrom = () => {
  const daysGap = getRandomInteger(-MAX_DAYS, 0);

  return dayjs().add(daysGap, 'day').toDate();
};

const generateDateTo = () => {
  const daysGap = getRandomInteger(1, MAX_DAYS);

  return dayjs().add(daysGap, 'day').toDate();
};

export const getPoint = () => ({
  'id': nanoid(),
  'type': 'ship',
  'dateFrom': dayjs(generateDateFrom()).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
  'dateTo': dayjs(generateDateTo()).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
  'destination': {
    'name': 'Amsterdam',
    'description': 'Amsterdam, full of of cozy canteens where you can try the best coffee in the Middle East.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.700731223516265',
        'description': 'Amsterdam street market'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6684245168235923',
        'description': 'Amsterdam kindergarten'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.9453892681873937',
        'description': 'Amsterdam zoo'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.9600475220826747',
        'description': 'Amsterdam city centre'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.09547748775081266',
        'description': 'Amsterdam zoo'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5786684727329405',
        'description': 'Amsterdam city centre'
      }
    ],
  },
  'basePrice': getRandomInteger(100, 500),
  'isFavorite': true,
  'offers': [1, 3],
});
