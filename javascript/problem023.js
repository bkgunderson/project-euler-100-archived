// Non-abundant sums
// A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.

// A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.

// As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.

// Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.
// expected result: 4179871

const { generateSetOfNumbersBelow } = require("./lib/common_tools");

// following two functions taken from problem 021
const createArrayProperDivisors = (num) =>
  generateSetOfNumbersBelow(num).filter((x) => num % x === 0);

const sumOfProperDivisors = (num) =>
  createArrayProperDivisors(num).reduce((acc, x) => acc + x, 0);

const checkIsAbundant = (num) => sumOfProperDivisors(num) > num;

const arrToCheck = generateSetOfNumbersBelow(28124);
let arrOfAbundantNums = arrToCheck.filter((x) => checkIsAbundant(x));
let arrNotSumOfAbundant = [];

const checkSumOfAbundant = (num) => {
  let upperBound =
    num - 11 > Math.floor(num / 2) ? num - 11 : Math.floor(num / 2);
  for (let i = 11; i < upperBound; i++) {
    if (
      arrOfAbundantNums.indexOf(num - i) !== -1 &&
      arrOfAbundantNums.indexOf(i) !== -1
    ) {
      return true;
    }
  }
  return false;
};

arrToCheck.forEach((x) => {
  if (!checkSumOfAbundant(x)) arrNotSumOfAbundant.push(x);
});
console.log(arrNotSumOfAbundant.reduce((acc, x) => acc + x, 0));
// expected result: 4179871
