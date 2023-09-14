import moment from 'moment';

export const convertTime = (time) => {
  const start = moment(time);
  const remainder = 30 - (start.minute() % 30);

  return moment(start).add(remainder, 'minutes').format('MM/DD/YYYY, HH:mm');
};
