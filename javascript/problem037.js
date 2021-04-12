// Truncatable primes

//   The number 3797 has an interesting property. Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: 3797, 797, 97, and 7. Similarly we can work from right to left: 3797, 379, 37, and 3.

//   Find the sum of the only eleven primes that are both truncatable from left to right and right to left.

//   NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.

const { checkIsPrime, sumOfElements } = require("./lib/common_tools");

// a function to check whether a number is a truncatable prime
const checkTruncPrime = (num) => {
  if ([2, 3, 5, 7].includes(num)) return false;
  else if (!checkIsPrime(num)) return false;
  else {
    let strDigits = String(num);
    // check this prime from left to right
    while (strDigits.length > 1) {
      strDigits = strDigits.slice(1);
      if (!checkIsPrime(Number(strDigits))) return false;
    }
    // check this prime from right to left
    strDigits = String(num);
    while (strDigits.length > 1) {
      strDigits = strDigits.slice(0, strDigits.length - 1);
      if (!checkIsPrime(Number(strDigits))) return false;
    }
  }
  return true;
};

// console.log(checkTruncPrime(7)); // expected result: false
// console.log(checkTruncPrime(23)); // expected result: true
// console.log(checkTruncPrime(4337)); // expected result: false
// console.log(checkTruncPrime(3797)); // expected result: true

// get an array of primes
const getTruncPrimes = () => {
  let i = 3;
  var arrOfTruncPrimes = [];
  // 11 is the given number of truncatable primes, so add truncatable primes until the array reaches that length
  while (arrOfTruncPrimes.length < 11) {
    if (Number(String(i)[0]) % 2 !== 0 || Number(String(i)[0]) === 2) {
      if (String(i)[0] !== "1") {
        if (checkTruncPrime(i)) {
          console.log(i);
          arrOfTruncPrimes.push(i);
        }
      } else {
        i = 10 ** (String(i).length - 1) * (Number(String(i)[0]) + 1) + 1;
      }
    } else {
      i = 10 ** (String(i).length - 1) * (Number(String(i)[0]) + 1) + 1;
    }
    i += 2;
  }
  return arrOfPrimes;
};

console.log(sumOfElements(getTruncPrimes())); // expected result: 748317
