// Circular primes

// The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.

// There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.

// How many circular primes are there below one million?

// expected result:
// 55

const {
  arrayOfNaturalNumsLessThan,
  createArrayFromNumber,
  checkIsPrime,
} = require("./lib/common_tools");

// create an array of prime numbers to test
// filter out numbers that include digits which will definitely not be prime
// or will include a leading zero
const arrToTest = (belowNum) => {
  return arrayOfNaturalNumsLessThan(belowNum)
    .filter((elem) => {
      const str = String(elem);
      return str.length > 1
        ? !str.includes("0") &&
            !str.includes("2") &&
            !str.includes("4") &&
            !str.includes("5") &&
            !str.includes("6") &&
            !str.includes("8")
        : true;
    })
    .filter((elem) => checkIsPrime(elem));
};

let meetCriteria = [];

// return an array of all prime rotations of the number provided, exclude duplicate numbers
const rotate = (num) => {
  let arr = [num];

  let digits = createArrayFromNumber(num);
  let newNumber = digits[0];
  for (let i = digits.length - 1; i >= 0; i--) {
    // console.log(digits);
    let toMove = digits.shift();
    digits = digits.concat(toMove);
    newNumber = toMove;
    // console.log(digits); // 4
    if (num > 9) {
      for (let p = 1; p < digits.length; p++) {
        newNumber += digits[digits.length - 1 - p] * 10 ** p;
      }
    }
    // console.log(newNumber);

    // if the array doesn't include this new number
    // and the length of the original number and the new number match,
    // then push the new number to the array
    if (!checkIsPrime(newNumber)) {
      return null;
    } else if (
      !arr.includes(newNumber) &&
      String(newNumber).length === String(num).length
    ) {
      arr.push(newNumber);
    }
  }
  return arr;
};

const countCircularPrimesBelow = (upperLimit) => {
  arrToTest(upperLimit).forEach((elem) => {
    if (!meetCriteria.includes(elem)) {
      const circularResult = rotate(elem);
      if (circularResult !== null) {
        circularResult.forEach((num) => {
          if (num > 1 && !meetCriteria.includes(num)) meetCriteria.push(num);
        });
      }
    }
  });
  console.log(`
How many circular primes are there below ${upperLimit}?
${meetCriteria.length}`);
};

countCircularPrimesBelow(100);
countCircularPrimesBelow(1000000);
