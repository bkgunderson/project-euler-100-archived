// The sum of the squares of the first ten natural numbers is 385.
// The square of the sum of the first ten natural numbers is 3025.
// Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 2640.
// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

const arrayOfNaturalNumsLessThanEqual = (upperLimit) => {
  var arr = [];
  for (var i = 1; i <= upperLimit; i++) {
    arr.push(i);
  }
  return arr;
};

const sumOfSquares = (arr) => arr.reduce((acc, x) => x ** 2 + acc);

const squareOfSums = (arr) => arr.reduce((acc, x) => acc + x) ** 2;

const sumSquareDiff = (num) => {
  var arr = arrayOfNaturalNumsLessThanEqual(num);
  return Math.abs(squareOfSums(arr) - sumOfSquares(arr));
};

console.log(sumSquareDiff(100)); // expected result: 25164150
