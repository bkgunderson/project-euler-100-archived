// The sequence of triangle numbers is generated by adding the natural numbers. So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:

// 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

// Let us list the factors of the first seven triangle numbers:

//      1: 1
//      3: 1,3
//      6: 1,2,3,6
//     10: 1,2,5,10
//     15: 1,3,5,15
//     21: 1,3,7,21
//     28: 1,2,4,7,14,28

// We can see that 28 is the first triangle number to have over five divisors.

// What is the value of the first triangle number to have over five hundred divisors?

// this fcn is originally from problem005.js, modified in problem012.js
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

const arrayOfNaturalNumsLessThanEqual = (upperLimit) => {
  var arr = [];
  for (var i = 1; i <= upperLimit; i++) {
    arr.push(i);
  }
  return arr;
};

const firstSevenTriangleNums = [
  { nth: 1, sum: 1, factors: [1] },
  { nth: 2, sum: 3, factors: [1, 3] },
  { nth: 3, sum: 6, factors: [1, 2, 3, 6] },
  { nth: 4, sum: 10, factors: [1, 2, 5, 10] },
  { nth: 5, sum: 15, factors: [1, 3, 5, 15] },
  { nth: 6, sum: 21, factors: [1, 3, 7, 21] },
  { nth: 7, sum: 28, factors: [1, 2, 4, 7, 14, 28] },
];

// 28 ~~ [1, 2, 4, 7, 14, 28] = 6
// 2 ** 2, 7 ** 1
// 36 ~~ [1, 2, 3, 4, 6, 9, 12 , 18, 36] = 9
// 2 ** 2, 3 ** 2
// 45 ~~ [1, 3, 5, 15, 9, 45] = 6
// 3 ** 2, 5 ** 1 ~~ 3 * 2
// 55 ~~ [1, 5, 11, 55] = 4
// 5 ** 1, 11 ** 1 ~~ 2 * 2
// 66 ~~ [1, 2, 3, 6, 11, 22, 33, 66] = 8
// 2 ** 1, 3 ** 1, 11 ** 1 ~~ 2 * 2 * 2
// 78 ~~ [1, 2, 3, 6, 13, 26, 39, 78] = 8
// 2 ** 1, 3 ** 1, 13 ** 1 ~~ 2 * 2 * 2
// 91 ~~ [1,7,13,91] = 4
// 7 ** 1, 13 ** 1 ~~ 2 * 2
// 105 ~~ [1, 3, 5, 7, 15, 21, 35, 105] = 8
// 3 ** 1, 5 ** 1, 7 ** 1 ~~ 2 * 2 * 2
// 120 ~~ [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, 120] = 16
// 2 ** 3, 3 ** 1, 5 ** 1 ~~ 4 * 2 * 2
// 136 ~~ [1, 2, 4, 8, 17, 34, 68, 136] = 8
// 2 ** 3, 17 ** 1 ~~ 4 * 2

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

// find the prime factorization, add one to all exponents, multiply resulting numbers
// for example, 136 prime factors are: 2 ** 3, 17 ** 1
// (3 + 1) * (1 + 1) = 8
// expected result: the number of factors/divisors of all kinds (including 1 and the original number itself)

const triangleNumDivisors = (num) => {
  return Object.values(objPrimeFactors(num)).reduce(
    (acc, n) => acc * (n + 1),
    1
  );
};

const triangleNumDivisorCountAbove = (divisorCount) => {
  var triNum = 28;
  var numToAdd = 7;
  var highestTriNum = triangleNumDivisors(triNum);

  while (highestTriNum <= divisorCount) {
    numToAdd++;
    triNum += numToAdd;
    if (triangleNumDivisors(triNum) > highestTriNum) {
      highestTriNum = triangleNumDivisors(triNum);
      console.log(triNum, objPrimeFactors(triNum));
    }
  }
  return triNum;
};

console.log(triangleNumDivisorCountAbove(500)); // expected result: 76576500