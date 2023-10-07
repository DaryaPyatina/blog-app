export const tagFormater = (arr) => {
  if (arr.length > 2) {
    return [arr[0], arr[1], `+${arr.length - 2}`];
  }

  return arr;
};
