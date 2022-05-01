import {getRandomInteger, commonType, getRandomTitle} from '../utils';
export const generateOffer = (id) => ({
  type: commonType,
  offers: [
    {
      'id': Number(id),
      'title': getRandomTitle(),
      'price': getRandomInteger(10, 500),
    },
  ]
});

// const new1 = [];
// for (let i = 0; i < 5; i++) {
//   new1.push(generateOffer(i));
// }
// console.log(new1);
