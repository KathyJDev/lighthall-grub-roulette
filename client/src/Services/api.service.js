export const setYelpUrl = (locationData, priceData) => {
  return `https://grub-roulette-server.onrender.com?location=${locationData}&price=${priceData}&limit=10`;
};
