// ж-з-ж / к-ф-к / з-ж-з / ф-к-ф
const colors = [
  ['yellow', 'green'],
  ['blue', 'red'],
  ['green', 'yellow'],
  ['red', 'blue'],
];

export default (idx) => {
  let groupIndex;
  if (idx % 12 < 3) groupIndex = 0;
  if (idx % 12 < 6 && idx % 12 >= 3) groupIndex = 1;
  if (idx % 12 < 9 && idx % 12 >= 6) groupIndex = 2;
  if (idx % 12 < 12 && idx % 12 >= 9) groupIndex = 3;
  return colors[groupIndex][idx % 2];
};
