import dayjs from 'dayjs';
const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const createEditEventFormTemplate = (point, allOffers) => {
  const {basePrice, type, destination, dateFrom, dateTo, offers} = point;

  //Функция создания разметки для отрисовки картинок поля Destination
  const pictures = destination.pictures;
  const createPicturesForDestinationTemplate = (images) => {
    const imagesForContainer = images.map((image) =>
      `<img class="event__photo" src="${image.src}" alt="${image.description}">`
    ).join('');

    const resultTemplate = images.length !== 0
      ? `<div class="event__photos-container">
          <div class="event__photos-tape">
            ${imagesForContainer}
          </div>
        </div>`
      : '';

    return resultTemplate;
  };
  const picturesForDestinationTemplate = createPicturesForDestinationTemplate(pictures);

  //Функция создания разметки для отрисовки всей секции Description
  const destinationSectionTemplate = destination.description !== undefined
    ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        ${picturesForDestinationTemplate}
      </section>`
    : '';

  //Функция создания разметки элемента выбора типа события, выпадающего списка и установка отметки на выбранном типе события
  const createTypeCheckerTemplate = (typeOfEvent, allTypes) => {
    const typeItemsForFieldset = allTypes.map((currentType) =>
      `<div class="event__type-item">
        <input id="event-type-${currentType}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${currentType === typeOfEvent ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}">${currentType}</label>
      </div>`
    ).join('');

    return typeItemsForFieldset;
  };
  const typeCheckerTemplate = createTypeCheckerTemplate(type, TYPES);

  //Функция создания разметки всех возможных офферов для текущего типа события
  const createAvailableOffrersTemplate = (allAvailableOffrers, currentType, pointOffers) => {
    //Находим объект, совпадающий по типу с текущим типом события и массивом всех доступных предложений к данному типу события
    const pointWithCurrentType = allAvailableOffrers.find((currentOffer) => currentType === currentOffer.type);
    //Формирование шаблона всех доступных дополнительных функций по полученным данным. Выставление checked совпавшим по id опциям
    const resultTemplate = pointWithCurrentType.offers.map((offer) => {
      const checkedOffer = pointOffers.includes(offer.id) ? 'checked' : '';
      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${checkedOffer}>
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
    }).join('');
    return resultTemplate;
  };
  const availableOffrersTemplate = createAvailableOffrersTemplate(allOffers, type, offers);

  //Функция создания разметки всей секции с дополнительными опциями
  const createAvailableOffrersSectionTemplate = (allAvailableOffrers, currentType, templateWithOffers) => {
    const pointWithCurrentType = allAvailableOffrers.find((currentOffer) => currentType === currentOffer.type);
    if (pointWithCurrentType.offers.length !== 0){
      return `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${templateWithOffers}
        </div>
      </section>
      `;
    } else {
      return '';
    }
  };
  const availableOffrersSectionTemplate = createAvailableOffrersSectionTemplate(allOffers, type, availableOffrersTemplate);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typeCheckerTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
            —
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${availableOffrersSectionTemplate}

          ${destinationSectionTemplate}
        </section>
      </form>
    </li>`
  );
};

export {createEditEventFormTemplate};
