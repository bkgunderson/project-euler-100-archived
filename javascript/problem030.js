// Digit fifth powers

// Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:

//     1634 = 1^4 + 6^4 + 3^4 + 4^4
//     8208 = 8^4 + 2^4 + 0^4 + 8^4
//     9474 = 9^4 + 4^4 + 7^4 + 4^4

// As 1 = 1^4 is not a sum it is not included.

// The sum of these numbers is 1634 + 8208 + 9474 = 19316.

// Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.

// expected result:
// 443839

const {
  arrayOfNaturalNumsLessThan,
  createArrayFromNumber,
  sumOfElements,
} = require("./lib/common_tools");

// create an array of possible numbers to test
const arrToTest = arrayOfNaturalNumsLessThan(354294).slice(1);
// const arrToTest = arrayOfNaturalNumsLessThan(9604).slice(1);
// const arrToTest = [1634, 8208, 9474];

const testCriteria = (numToTest) => {
  if (
    numToTest ===
    sumOfElements(
      createArrayFromNumber(numToTest).map((digit) => {
        return digit ** 5;
      })
    )
  ) {
    meetCriteria.push(numToTest);
  }
};

let meetCriteria = [];

// test each element in the array
// if the element matches criteria, add to meetCriteria array
arrToTest.forEach((elem) => testCriteria(elem));

// sum the numbers in meetCriteria array
console.log(sumOfElements(meetCriteria));
