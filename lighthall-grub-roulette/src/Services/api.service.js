export const setYelpUrl = (locationData, priceData, cuisineData) => {
  return `http://localhost:4000?location=${locationData}&categories=${cuisineData}&price=${priceData}&limit=10`;
};
