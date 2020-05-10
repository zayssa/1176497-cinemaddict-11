import moment from 'moment';

export const formatDate = (date) => {
  const now = moment(new Date());
  const diffDate = moment(date);

  return moment.duration(diffDate.diff(now)).humanize(true);
};
