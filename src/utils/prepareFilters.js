const prepareFilters = (arr) =>
  // eslint-disable-next-line
  arr.map((item) => ({
    value: item.toLowerCase().split(' ').join('_'),
    title: item,
  }));

export default prepareFilters;
