export const getRandomColor = () => {
  const randomColor = `background-random${Math.floor(Math.random() * 12) + 1}`;
  return randomColor;
};
