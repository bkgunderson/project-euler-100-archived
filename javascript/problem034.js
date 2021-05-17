// Digit factorials

// 145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.

// Find the sum of all numbers which are equal to the sum of the factorial of their digits.

// Note: As 1! = 1 and 2! = 2 are not sums they are not included.

const {
  createArrayFromNumber,
  factorialFromNum,
  arrayOfNaturalNumsLessThanEqual,
} = require("./lib/common_tools");

const curiousCheck = (num) => {
  // extract an array of the single digits of the arg number
  // sum the factorial of each digit in the array
  // return the strict comparison of the result to the arg number
  return (
    createArrayFromNumber(num).reduce(
      (acc, x) => acc + factorialFromNum(x),
      0
    ) === num
  );
};

// the factorial value of all digits
// let factAllDigits = [];
// createArrayFromNumber(1234567890).forEach((y) =>
//   factAllDigits.push([y, factorialFromNum(y)])
// );

// what limits bind the curious numbers?
// - largest curious number will be less than 9999999 because largest possible value of digit factorial is 362880 & continuing to add that does not nearly approach the digit count of the arg Number

let arr = [];

arrayOfNaturalNumsLessThanEqual(999999).forEach((x) => {
  if (curiousCheck(x)) arr.push(x);
});

console.log(`
  expected result: true
           result: ${curiousCheck(145)}
  expected result: false
           result: ${curiousCheck(115)}
  expected result: 40730
           result: ${arr
             .filter((x) => x !== 1 && x !== 2)
             .reduce((acc, x) => acc + x, 0)}`);
