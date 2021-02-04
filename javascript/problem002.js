// Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be:
//
// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
//
// By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.
// expected result: 4613732

const {
  checkIsEven,
  fibSeqLessThanLimit,
  sumOfElements,
} = require("./lib/common_tools");

const sumEvenTerms = (arr) => {
  return sumOfElements(arr.filter((x) => checkIsEven(x)));
};

console.log(sumEvenTerms(fibSeqLessThanLimit(4000000)), "4613732");
