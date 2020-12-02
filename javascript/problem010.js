// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

// Find the sum of all the primes below two million.

const {
  arrayOfNaturalNumsLessThan,
  checkIsPrime,
} = require("./lib/common_tools");

const sumPrimesBelowNum = (upperLimit) => {
  // get array of all numbers below upperLimit
  var arrToCheck = arrayOfNaturalNumsLessThan(upperLimit)
    .filter((x) => x % 2 !== 0 || x === 2)
    .filter((y) => y % 3 !== 0 || y === 3)
    .filter((z) => z % 5 !== 0 || z === 5)
    .filter((s) => s % 7 !== 0 || s === 7)
    .filter((t) => t % 11 !== 0 || t === 11)
    .filter((u) => u % 13 !== 0 || u === 13)
    .filter((v) => v % 17 !== 0 || v === 17)
    .filter((a) => a % 19 !== 0 || a === 19)
    .filter((b) => b % 23 !== 0 || b === 23)
    .filter((c) => c % 29 !== 0 || c === 29)
    .filter((d) => d % 31 !== 0 || d === 31)
    .filter((e) => e % 37 !== 0 || e === 37)
    .filter((f) => f % 41 !== 0 || f === 41)
    .filter((g) => g % 43 !== 0 || g === 43);
  // curious about how the addition of filters decreases the array to check
  console.log(arrToCheck.length);
  // get array of primes below upperLimit
  var primesToSum = arrToCheck.filter((x) => checkIsPrime(x));
  return primesToSum.reduce((acc, x) => acc + x);
};

console.log(sumPrimesBelowNum(10)); // expected result: 17
console.log(sumPrimesBelowNum(2000000)); // expected result: 142913828922
