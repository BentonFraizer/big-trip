import dayjs from 'dayjs';
const createTripInfoTemplate = (allPoints, allOffers) => {
  //Функция для получения суммы базовой стоимости всех точек маршрута
  const getBasePricesSum = (pointsForBasePricesSum) => {
    let pricesSum = 0;
    pointsForBasePricesSum.forEach((pointForTotal) => {
      pricesSum += pointForTotal.basePrice;
    });

    return pricesSum;
  };
  const basePricesSum = getBasePricesSum(allPoints);

  //Функция для получения суммы всех дополнительных опций всех точек маршрута
  const getOffersSum = (pointsForOffersSum, offersForOffersSum) => {
    let offersSumResult = 0;
    pointsForOffersSum.forEach((pointForOffersSum) => {
      const currentPointType = pointForOffersSum.type;
      const currentPointOffers = pointForOffersSum.offers;
      const allOffersForCurrentPoint = offersForOffersSum.find((offerForCurrentPoint) => offerForCurrentPoint.type === currentPointType);
      allOffersForCurrentPoint.offers.forEach((offer) => {
        if (currentPointOffers.includes(offer.id)) {
          offersSumResult += offer.price;
        }
      });
    });
    return offersSumResult;
  };
  const offersSum = getOffersSum(allPoints, allOffers);
  const totalCost = basePricesSum + offersSum;

  //Функция для формирования маршрута путешествия из названий городов
  const createRouteTemplate = (pointsForRoute) => {
    const cities = [];
    const MAX_HIDE_AMOUNT = 3;
    pointsForRoute.map((pointForRoute) => {
      cities.push(pointForRoute.destination.name);
    });

    if (!cities.length) {
      return '-';
    }

    if (cities.length > 0 && cities.length <= MAX_HIDE_AMOUNT) {
      const resultTemplate = cities.reverse().map((city) => `${city}`).join('-');
      return resultTemplate;
    }

    if (cities.length > MAX_HIDE_AMOUNT) {
      const resultTemplate = `${cities[cities.length-1]}-...-${cities[0]}`;
      return resultTemplate;
    }

  };
  const routeTemplate = createRouteTemplate(allPoints);

  //Функция для формирования дат путешествия (начало - первая точка маршрута (dateFrom), окончание - последняя точка маршрута (dateTo))
  const createDurationTemplate = (pointsForDuration) => {
    const pointsAmount = pointsForDuration.length;
    if (!pointsAmount) {
      return '-';
    }

    if (pointsAmount > 0) {
      const startDate = dayjs(pointsForDuration[pointsForDuration.length-1].dateFrom);
      const endDate = dayjs(pointsForDuration[0].dateTo);
      const monthsDeffirence = startDate.format('M') - endDate.format('M');

      if (monthsDeffirence === 0) {
        return `${startDate.format('MMM')} ${startDate.format('D')} - ${endDate.format('D')}`;
      }

      return `${startDate.format('MMM')} ${startDate.format('D')} - ${endDate.format('MMM')} ${endDate.format('D')}`;
    }
  };
  const duration = createDurationTemplate(allPoints);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${routeTemplate}</h1>
        <p class="trip-info__dates">${duration}</p>
      </div>
      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
      </p>
    </section>`
  );
};

export {createTripInfoTemplate};
