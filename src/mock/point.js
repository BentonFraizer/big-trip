import {getRandomInteger, commonType, getBasePrice, getMonth} from '../utils';

export const generatePoint = () => ({
  basePrice: getBasePrice(),
  dateFrom: `2022-${(getMonth()[0].toString()).padStart(2, '0')}-29T15:59:39.600Z`,
  dateTo: `2022-${(getMonth()[1].toString()).padStart(2, '0')}-30T07:16:28.382Z`,
  destination: {
    'name': 'Berlin',
    'description': 'Berlin, is a beautiful city, in a middle of Europe, with an embankment of a mighty river as a centre of attraction.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.571499150444382',
        'description': 'Berlin city centre'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.0986970118158419',
        'description': 'Berlin zoo'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.3269140381786213',
        'description': 'Berlin embankment'
      },
    ],
  },
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
  type: commonType,
});

