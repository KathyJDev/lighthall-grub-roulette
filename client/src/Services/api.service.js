export const setYelpUrl = (locationData, priceData) => {
  return `http://localhost:4000?location=${locationData}&price=${priceData}&limit=10`;
};
