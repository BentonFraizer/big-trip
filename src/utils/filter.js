import dayjs from 'dayjs';
import {FilterType} from '../consts';

//Функция проверки. Возвращает true если дата из будущего
const isFutureDate = (outerDate) => outerDate && dayjs().isBefore(outerDate, 'D');

//Функция проверки. Возвращает true если переданная и текущая даты совпадают
const isSameDate = (outerDate) => outerDate && dayjs().isSame(outerDate, 'D');

//Функция проверки. Возвращает true если переданная из прошлого
const isPastDate = (outerDate) => outerDate && dayjs().isAfter(outerDate, 'D');

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom) || isSameDate(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastDate(point.dateTo))
};

export {filter};
