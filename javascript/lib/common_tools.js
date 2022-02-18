//
// Reusable bits of code for solving math problems!
//

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

// add an optional argument here which would allow changing the iterator in the for loop
const checkIsPrime = (num) => {
  if (num === 1) {
    return false;
  } else if (num === 2) {
    return true;
  } else if (num % 2 === 0) {
    return false;
  }
  // could one adjust the condition of this for loop to speed things up?
  for (var i = 3; i < num / 2 + 1; i += 2) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

const checkIsEven = (num) => {
  return num % 2 === 0;
};

const factorialFromNum = (n) => {
  return n === 0
    ? 1
    : generateSetOfNumbersBelow(n + 1).reduce((acc, x) => acc * x);
};

const fibSeqLessThanLimit = (upperLimit) => {
  var sequence = [0, 1, 1, 2];
  if (upperLimit <= 2) return sequence.filter((x) => x < upperLimit);
  var i = 2;
  while (sequence[i] + sequence[i + 1] < upperLimit) {
    sequence.push(sequence[i] + sequence[i + 1]);
    i++;
  }
  return sequence;
};

// this returns an object with primes as keys and exponents as values
const objPrimeFactors = (target) => {
  let objPrimes = {};
  let currentPrime = 2;
  let counter = 0;
  let remQuotient = target;
  // quotient goes through the process until it equals 1
  // number 1 and primes might break it
  while (currentPrime < target && remQuotient > 1) {
    // divide the target number by a prime until remainder is !== 0
    while (remQuotient % currentPrime === 0) {
      remQuotient /= currentPrime;
      counter++;
    }
    // number of times divided into target is the exponent for the prime
    // add it to the object if it's non-zero
    if (counter > 0) {
      objPrimes[currentPrime] = counter;
      counter = 0;
    }
    // find next prime number
    currentPrime++;
    while (!checkIsPrime(currentPrime)) {
      currentPrime++;
    }
  }
  return objPrimes;
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

const sumOfElements = (arr) => {
  // add all of the elements of the supplied array
  return arr.reduce((acc, x) => acc + x, 0);
};

module.exports = {
  generateSetOfNumbersBelow,
  arrayOfNaturalNumsLessThanEqual,
  arrayOfNaturalNumsLessThan,
  createArrayFromNumber,
  checkIsPrime,
  checkIsEven,
  factorialFromNum,
  fibSeqLessThanLimit,
  objPrimeFactors,
  sumOfElements,
};
