// By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

// What is the 10 001st prime number?

// this fcn is from problem005.js
const checkIsPrime = (num) => {
  for (var i = num - 1; i > 1; i--) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

const getNthPrime = (n) => {
  let i = 3;
  var arrOfPrimes = [2];
  while (arrOfPrimes.length < n) {
    if (checkIsPrime(i)) {
      arrOfPrimes.push(i);
    }
    i += 2;
  }
  return arrOfPrimes[n - 1];
};

console.log(getNthPrime(6)); // expected result: 13
console.log(getNthPrime(10001)); // expected result: 104743
