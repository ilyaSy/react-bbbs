export function setActiveFilters(filters, newTag) {
  if (filters.length === 1 && filters[0] === 'Все' && newTag === 'Все') {
    return filters;
  }

  let newFilters = filters.length === 1 && filters[0] === 'Все' ? [] : [...filters];
  const index = newFilters.indexOf(newTag);
  if (newTag === 'Все') {
    newFilters = ['Все'];
  } else if (index !== -1) {
    newFilters.splice(index, 1);
  } else {
    newFilters.unshift(newTag);
  }

  if (!newFilters.length) newFilters = ['Все'];

  return newFilters;
}

export function filterItemByFiltersList(filters, item) {
  if (filters.includes('Все')) {
    return true;
  }
  // массив
  if (Array.isArray(item)) {
    return item.some((e) => filters.includes(e));
  }
  return filters.includes(item);
}

export function getMultipleTagsIndex(filters, items) {
  let index = 100;
  items.forEach((item) => {
    const itemIndex = filters.includes(item) ? filters.indexOf(item) : 10;
    index = Math.min(itemIndex, index);
  });
  return index;
}
