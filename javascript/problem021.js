//Amicable numbers

// Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
// If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

// For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

// Evaluate the sum of all the amicable numbers under 10000.
// expected result: 31626

const { generateSetOfNumbersBelow } = require("./lib/common_tools");

// I considered getting array of proper divisors from the Prime Factor object, but the method I chose was more straightforward. What would be the bigO notation for these two ways?
// const { objPrimeFactors } = require("./lib/common_tools");

// const generateArrayProperDivisors = (num) => {
//   const primes = objPrimeFactors(num);
//   const properDivisors = [];
//   console.log(typeof Object.keys(primes)[0]);
//   return properDivisors;
// };

// console.log(objPrimeFactors(220)); // { '2': 2, '5': 1, '11': 1 }
// console.log(objPrimeFactors(284)); // { '2': 2, '71': 1 }
// console.log(generateArrayProperDivisors(220)); // expected result: [ 1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110 ]

const createArrayProperDivisors = (num) =>
  generateSetOfNumbersBelow(num).filter((x) => num % x === 0);

// console.log(createArrayProperDivisors(220)); // expected result: [ 1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110 ]

const sumOfProperDivisors = (num) =>
  createArrayProperDivisors(num).reduce((acc, x) => acc + x, 0);

// amicable numbers must paired, so the first statement is required to filter out unpaired results
// trying to run 0 through generateSetOfNumbersBelow will create an error, so the second statement avoids that error
// third statement checks the number for the requirement of amicable pair (i.e. d(d(a)) = a)
const checkAmicableNumber = (n) => {
  let sum = sumOfProperDivisors(n);
  return sum !== n && sum !== 0 && sumOfProperDivisors(sum) === n;
};

const sumAmicableNumbersBelow = (n) => {
  return generateSetOfNumbersBelow(n)
    .filter((p) => checkAmicableNumber(p))
    .reduce((acc, x) => acc + x, 0);
};

console.log(sumAmicableNumbersBelow(10000)); // expected result: 31626
