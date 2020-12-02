// Largest palindrome product
// A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
// Find the largest palindrome made from the product of two 3-digit numbers.
//
// expected result: 906609

const { createArrayFromNumber } = require("./lib/common_tools");

const largestPalindromicProductOfThreeDigits = () => {
  // limit var that is the largest palindromic number below 999 * 999 = 998001
  let productUpperLimit = 997799;
  let productLowerLimit = 10000;
  let factorUpperLimit = 999;
  let factorLowerLimit = 100;
  var theValue = productUpperLimit;
  var success = false;

  while (!success && theValue > productLowerLimit) {
    var firstFactor = factorUpperLimit;
    // find largest 3-digit divisor that produces a natural 3-digit quotient
    while (theValue % firstFactor !== 0 && firstFactor >= factorLowerLimit) {
      firstFactor--;
    }

    // if conditions are not met, decrement to next largest palindromic number
    // else conditions are met & theValue gets passed as successful result
    if (
      theValue / firstFactor > factorUpperLimit ||
      firstFactor < factorLowerLimit
    ) {
      var varArr = createArrayFromNumber(theValue);
      if (varArr[1] === 0 && varArr[2] === 0) {
        theValue -= 11;
      } else if (varArr[2] === 0) {
        theValue -= 110;
      } else {
        theValue -= 1100;
      }
    } else {
      success = true;
    }

    // 997799 - 7700
    // 990099 - 110
    // 989989 - (1100 * 99)
    // 980089 - 110
    // ...
    // 909909 - (1100 * 99)
    // 900009 - 11
  }
  return theValue;
};

console.log(largestPalindromicProductOfThreeDigits()); // expected result: 906609
