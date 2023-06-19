import dayjs from 'dayjs';
import { FILTERS_TYPE } from './const';

const humanizeDate = (date, form) => dayjs(date).format(form);
const humanizeTime = (date) => dayjs(date).format('HH:mm');
const getDifference = (date1, date2, param) => dayjs(date2).diff(date1, param);
const isPointExpired = (date) => date && dayjs().isAfter(date, 'D');

const filters = {
  [FILTERS_TYPE.EVERYTHING]: (points) => points,
  [FILTERS_TYPE.FUTURE]: (points) => points.filter((point) => !isPointExpired(point.dateFrom)),
  [FILTERS_TYPE.PAST]: (points) => points.filter((point) => isPointExpired(point.dateTo)),
}

const getFinalPrice = (currentOffers, point) => {
  let finalPrice = point.basePrice
  if (point.offers.length === 0) {
    return finalPrice
  }

  point.offers.forEach((id) => {
    finalPrice += currentOffers[id - 1]['price']
  })

  return finalPrice
}

const sortByDay = (points) => points.sort((prev,next) => getDifference(next.dateFrom, prev.dateFrom, ''))
const sortByTime = (points) => points.sort((prev, next) => getDifference(prev.dateFrom, prev.dateTo, 'second') - getDifference(next.dateFrom, next.dateTo, 'second'))
const sortByPrice = (points, offers) => points.sort((prev, next) => {
  const prevOffers = offers.find((x) => x.type === prev['type'])['offers']
  const nextOffers = offers.find((x) => x.type === next['type'])['offers']
  const prevFinalPrice = getFinalPrice(prevOffers, prev)
  const nextFinalPrice = getFinalPrice(nextOffers, next)
  return prevFinalPrice - nextFinalPrice;
})

export {humanizeDate, humanizeTime, getDifference, getFinalPrice, filters, sortByDay, sortByPrice, sortByTime};
