import moment from 'moment';

export function groupByDate(data) {
  const today = moment(new Date()).format('YYYY-MM-DD');
  const sections = [];
  let index = 0;
  for (let i = 0; i < data.length; i += 1) {
    if (sections.length <= 0) {
      sections.push({ date: today, data: [] });
    }

    if (sections[index].date === data[i].date) {
      sections[index].data.push(data[i]);
    } else {
      index += 1;
      sections.push({ date: data[i].date, data: [data[i]] });
    }
  }
  
  return sections;
}