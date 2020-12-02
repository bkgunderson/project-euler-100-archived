// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
//
// Find the sum of all the multiples of 3 or 5 below 1000.
// expected result: 233168

const { generateSetOfNumbersBelow } = require("./lib/common_tools");

const checkMultipleMultiples = (number, arr) => {
  var isMultiple = false;
  arr.forEach((x) => {
    if (number % x === 0) isMultiple = true;
  });
  return isMultiple;
};

const arrayOfMultiples = (arr, num) => {
  // if num is one number return its multiples in the array
  if (typeof num === "number") {
    return arr.filter((mult) => mult % num === 0);
  } else {
    // otherwise assume num is an array & test using another fcn
    return arr.filter((mult) => checkMultipleMultiples(mult, num));
  }
};

const sumOfElements = (arr) => {
  // add all of the elements of the supplied array
  return arr.reduce((acc, x) => {
    return acc + x;
  });
};

// sum the multiples of the numbers provided that are less than the upper limit
console.log(
  sumOfElements(arrayOfMultiples(generateSetOfNumbersBelow(1000), [3, 5]))
); // expected result: 233168
