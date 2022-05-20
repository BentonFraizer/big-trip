import {nanoid} from 'nanoid';
export const getPoint = () => ({
  'id': nanoid(),
  'type': 'ship',
  'dateFrom': '2022-05-07T02:25:22.724Z',
  'dateTo': '2022-05-07T21:12:38.219Z',
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
  'basePrice': 300,
  'isFavorite': true,
  'offers': [1, 3],
});
