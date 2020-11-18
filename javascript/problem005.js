// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
//
// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

const checkIsPrime = (num) => {
  for (var i = num - 1; i > 1; i--) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

const arrayOfNaturalNumsLessThan = (largest) => {
  var arr = [];
  for (var i = 1; i <= largest; i++) {
    arr.push(i);
  }
  return arr;
};

// this returns an object with the primes of the array as keys and number 1 as values
// the value assignment is specific to the need to count primes and multiply them
const objPrimeFactors = (arr) => {
  // remove 1 from the array because it is not technically prime
  arr.shift();
  // assign argument arr filtered through prime fcn
  let arrPrimes = arr.filter((x) => checkIsPrime(x));
  let objPrimes = {};
  arrPrimes.forEach((x) => {
    objPrimes[x] = 1;
  });
  return objPrimes;
};

const smallestMultiple = (num) => {
  var factorsObject = objPrimeFactors(arrayOfNaturalNumsLessThan(num));
  // { 2: 1, 3: 1, 5: 1, 7: 1 }
  // console.log(factorsObject, " factorsObject");
  let arrComposites = arrayOfNaturalNumsLessThan(num).filter(
    (x) => !checkIsPrime(x)
  );
  // [ 4, 6, 8, 9, 10 ]
  // console.log(arrComposites, " array of composites");
  let arrCompositesFactored = [];

  arrComposites.forEach((x) =>
    arrCompositesFactored.push(objPrimeFactors(arrayOfNaturalNumsLessThan(x)))
  );
  // here is an array of objects, each containing keys of the primes less than a composite, representative of all composites <= the original upper limit
  // [ { 2: 1, 3: 1 }, { 2: 1, 3: 1, 5: 1 }, { 2: 1, 3: 1, 5: 1, 7: 1 }, { 2: 1, 3: 1, 5: 1, 7: 1 }, { 2: 1, 3: 1, 5: 1, 7: 1 } ]
  // console.log(arrCompositesFactored, " primes less than each of the composites");

  for (var i = 0; i < arrComposites.length; i++) {
    Object.keys(arrCompositesFactored[i]).forEach((x) => {
      if (arrComposites[i] % x === 0) {
        var power = 1;
        while (arrComposites[i] % x ** power === 0) {
          power++;
        }
        arrCompositesFactored[i][x] = power - 1;
      } else {
        arrCompositesFactored[i][x] = 0;
      }
    });
  }

  // here is an array of objects representing the prime factors of each composite <= the original upper limit
  // the prime factors are keys. the power to which they are taken are the values
  // [ { 2: 2, 3: 0 }, { 2: 1, 3: 1, 5: 0 }, { 2: 3, 3: 0, 5: 0, 7: 0 }, { 2: 0, 3: 2, 5: 0, 7: 0 }, { 2: 1, 3: 0, 5: 1, 7: 0 } ]
  // console.log(arrCompositesFactored, " composites, factored");

  arrCompositesFactored.forEach((x) =>
    Object.keys(x).forEach((y) => {
      if (x[y] > factorsObject[y]) {
        factorsObject[y] = x[y];
      }
    })
  );
  // here is an object of the primes and the powers to which they will be taken for the final calculation of the smallest positive number evenly divisible by all the natural numbers <= the original upper limit
  // { 2: 3, 3: 2, 5: 1, 7: 1 }
  // { 2: 4, 3: 2, 5: 1, 7: 1, 11: 1, 13: 1, 17: 1, 19: 1 }
  // console.log(factorsObject);

  return Object.keys(factorsObject).reduce((acc, prime) => {
    return acc * prime ** factorsObject[prime];
  }, 1);
};

console.log(smallestMultiple(10)); // expected result: 2520
console.log(smallestMultiple(20)); // expected result: 232792560
