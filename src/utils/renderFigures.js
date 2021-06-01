// квадрат круг арка круг арка квадрат арка квадрат круг - повтор

const figures = [
  ['square', 'circle', 'semicircle'],
  ['circle', 'semicircle', 'square'],
  ['semicircle', 'square', 'circle'],
];

export default (idx) => {
  let groupIndex;
  if (idx % 9 < 3) groupIndex = 0;
  if (idx % 9 < 6 && idx % 9 >= 3) groupIndex = 1;
  if (idx % 9 < 9 && idx % 9 >= 6) groupIndex = 2;
  return figures[groupIndex][idx % 3];
};
