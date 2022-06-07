import {FilterType} from '../../consts';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future points now',
  [FilterType.PAST]: 'There are no past points now',
};

const createEventsListEmptyTemplate = (filterType) => {
  const noPointsTextValue = NoPointsTextType[filterType];

  return(
    `<p class="trip-events__msg">
      ${noPointsTextValue}
    </p>`
  );
};

export {createEventsListEmptyTemplate};
