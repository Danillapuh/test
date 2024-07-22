export function getRandomHex() {
  const getColorValue = () =>
    Math.floor(Math.random() * 128 + 128)
      .toString(16)
      .padStart(2, "0");
  return `#${getColorValue()}${getColorValue()}${getColorValue()}`;
}
