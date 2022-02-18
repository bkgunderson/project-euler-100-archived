// Digit cancelling fractions

// The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.

// We shall consider fractions like, 30/50 = 3/5, to be trivial examples.

// There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.

// If the product of these four fractions is given in its lowest common terms, find the value of the denominator.

const {
  generateSetOfNumbersBelow,
  createArrayFromNumber,
  objPrimeFactors,
} = require("./lib/common_tools");

// generate numbers between 10 & 99
const arrOfTwoDigits = generateSetOfNumbersBelow(100).filter((x) => x > 9);

// args: two numbers representing a numerator and denominator that both have two digits
// result: an array containing two numbers that represent single digit numerator and denominator
const singleDigitOption = (numer, denom) => {
  const numerDigits = createArrayFromNumber(numer);
  const denomDigits = createArrayFromNumber(denom);
  let result = [];
  // removed digit must not be zero
  if (numerDigits[1] !== 0)
    numerDigits.forEach((d) => {
      if (denomDigits.includes(d)) {
        result.push(
          numerDigits.filter((x) => {
            return numerDigits[0] !== numerDigits[1] ? x !== d : true;
          })[0]
        );
        result.push(denomDigits.filter((x) => x !== d)[0]);
      }
    });
  return result;
};

const checkIsCurious = ([num, denom]) => {
  const reduced = singleDigitOption(num, denom);
  return reduced.length > 0 ? num / denom === reduced[0] / reduced[1] : false;
};

let bigArr = [];

arrOfTwoDigits.forEach((n) => {
  arrOfTwoDigits.forEach((d) => {
    if (n < d) bigArr.push([n, d]);
  });
});

let endNumer = 1;
let endDenom = 1;

bigArr
  .filter((arr) => checkIsCurious(arr))
  .forEach((arr) => {
    endNumer *= arr[0];
    endDenom *= arr[1];
  });

const reduceFraction = (numer, denom) => {
  const numerFacts = Object.keys(numer);
  const denomFacts = Object.keys(denom);
  let reducedNumer = 1;
  let reducedDenom = 1;
  denomFacts.forEach((fact) => {
    if (numerFacts.includes(fact)) {
      if (denom[fact] - numer[fact] > 0) {
        reducedDenom *= fact ** (denom[fact] - numer[fact]);
      }
    } else {
      reducedDenom *= fact ** denom[fact];
    }
  });
  numerFacts.forEach((fact) => {
    if (denomFacts.includes(fact) && numer[fact] > denom[fact]) {
      reducedNumer *= fact ** (numer[fact] - denom[fact]);
    } else if (!denomFacts.includes(fact)) {
      reducedNumer *= fact ** numer[fact];
    }
  });
  return [reducedNumer, reducedDenom];
};

console.log(
  reduceFraction(objPrimeFactors(endNumer), objPrimeFactors(endDenom))[1]
);
