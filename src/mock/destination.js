import {getRandomInteger, getCity, getRandomDescription} from '../utils';


const getPictures = () => {
  const pictures = [];
  const picture = {
    'src': 'http://picsum.photos/300/200?r=0.571499150444382',
    'description': 'Berlin city centre'
  };
  const iterationsAmount = getRandomInteger(0, 10);
  for (let i = 0; i < iterationsAmount; i++) {
    pictures.push(picture);
  }
  return pictures;
};

export const generateDestination = () => ({
  name: getCity(),
  description: getRandomDescription(),
  pictures: getPictures(),
});
