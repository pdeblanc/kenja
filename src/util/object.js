export const objMap = (f, obj) => {
  const returnObj = {};
  for (const key of Object.keys(obj)) {
    returnObj[key] = f(obj[key]);
  }
  return returnObj;
};
