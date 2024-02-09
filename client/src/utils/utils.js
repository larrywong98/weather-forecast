const precedingZero = value => {
  if (value < 10) {
    return '0' + value;
  }
  return value;
};
const kelvinToCelsius = value => {
  return value - 273.15;
};
export { precedingZero, kelvinToCelsius };
