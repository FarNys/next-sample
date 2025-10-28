const generateNumbersList = () => {
  const emptyList = [];
  for (let i = 0; i < 8000; i++) {
    emptyList.push(i);
  }
  return emptyList;
};

export { generateNumbersList };
