// Reusable bits of code for solving math problems!
const generateSetOfNumbersBelow = (upperLimit) => {
  var arr = [];
  // if upper limit is not positive, send error to console
  if (upperLimit < 1) {
    console.error("Invalid upper limit provided.");
  }
  // push every natural number less than the upper limit provided to an array
  for (var i = 1; i < upperLimit; i++) {
    arr.push(i);
  }
  return arr;
};

const arrayOfNaturalNumsLessThanEqual = (upperLimit) => {
  var arr = [];
  for (var i = 1; i <= upperLimit; i++) {
    arr.push(i);
  }
  return arr;
};

const arrayOfNaturalNumsLessThan = (upperLimit) => {
  var arr = [];
  for (var i = 1; i < upperLimit; i++) {
    arr.push(i);
  }
  return arr;
};

const createArrayFromNumber = (num) => {
  let arr = [];
  while (num > 9) {
    var nextElement = num % 10;
    arr.unshift(nextElement);
    num = (num - nextElement) / 10;
  }
  arr.unshift(num);
  return arr;
};

const checkIsPrime = (num) => {
  if (num === 1) {
    return false;
  }
  for (var i = 3; i < num; i += 2) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

const checkIsEven = (num) => {
  return num % 2 === 0;
};

// this was a slower function for checking prime status
// this fcn is originally from problem005, modified to identify 1 as non-prime & check ascending rather than descending natural numbers
// const checkIsPrime = (num) => {
//   for (var i = num - 1; i > 1; i--) {
//     if (num % i === 0) {
//       return false;
//     }
//   }
//   return true;
// };

module.exports = {
  generateSetOfNumbersBelow,
  arrayOfNaturalNumsLessThanEqual,
  arrayOfNaturalNumsLessThan,
  createArrayFromNumber,
  checkIsPrime,
  checkIsEven,
};
