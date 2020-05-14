export const getRandomArrayElements = (arr, amount = 1, random = 0) => {
  const result = [];
  amount += Math.ceil(Math.random() * random);
  while (amount > 0) {
    result.push(arr[Math.floor(Math.random() * arr.length)]);
    amount--;
  }
  return Array.from(new Set(result));
};

export const getRandomDate = (year = 1888) => {
  return new Date(new Date(year, 6, 1).getTime() + Math.random() * (new Date().getTime() - new Date(1888, 6, 1).getTime()));
};

export const getRandomIds = (startId, maxAmount) => {
  const result = [];
  const amount = startId + Math.floor(Math.random() * maxAmount);
  while (startId < amount) {
    result.push(startId);
    startId++;
  }
  return result;
};
