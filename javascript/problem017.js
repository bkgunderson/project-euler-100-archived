//Number letter counts
// If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
// If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?
// NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.
// expected result: 21124

const { generateSetOfNumbersBelow } = require("./lib/common_tools");

const writtenBelowTwenty = {
  0: 0,
  1: 3,
  2: 3,
  3: 5,
  4: 4,
  5: 4,
  6: 3,
  7: 5,
  8: 5,
  9: 4,
  10: 3,
  11: 6,
  12: 6,
  13: 8,
  14: 8,
  15: 7,
  16: 7,
  17: 9,
  18: 8,
  19: 8,
};

const tensPlace = {
  0: 0,
  1: 0, // (included in writtenBelowTwenty)
  2: 6, // twenty
  3: 6, // thirty
  4: 5, // forty
  5: 5, // fifty
  6: 5, // sixty
  7: 7, // seventy
  8: 6, // eighty
  9: 6, // ninety
};

const hundreds = {
  0: 0,
  1: 10, // onehundred
  2: 10, // twohundred
  3: 12, // threehundred
  4: 11, // fourhundred
  5: 11, // fivehundred
  6: 10, // sixhundred
  7: 12, // sevenhundred
  8: 12, // eighthundred
  9: 11, // ninehundred
};

const oneThroughNine = 36; // sum of the characters in digits one through nine
const oneThroughNineTeen = 106;
const andValue = 3;
const oneThroughNinetyNineValue = 854;

const lettersInWords = (num) => {
  let letterSum = 0;
  //   all the single digits for current
  if (num % 100 < 20) {
    letterSum += generateSetOfNumbersBelow((num % 100) + 1).reduce(
      (acc, x) => writtenBelowTwenty[x] + acc,
      0
    );
  } else {
    letterSum += generateSetOfNumbersBelow((num % 10) + 1).reduce(
      (acc, x) => writtenBelowTwenty[x] + acc,
      0
    );
    letterSum += oneThroughNineTeen;
    // all the "xxxxty"s less than current
    for (var i = 2; i < Math.floor((num % 100) / 10); i++) {
      letterSum += tensPlace[i] * 10 + oneThroughNine;
    }
    // all the "xxxxty"s for current
    letterSum += tensPlace[Math.floor((num % 100) / 10)] * ((num % 10) + 1);
  }
  if (num >= 100) {
    // handle the "xxxx" for prior hundreds
    letterSum += oneThroughNinetyNineValue * Math.floor(num / 100);
    // handle all of the "and"s for prior hundreds
    letterSum += andValue * 99 * (Math.floor(num / 100) - 1);
    // handle all of the "xxxhundred"s for prior hundreds
    let counter = 0;
    letterSum += Object.values(hundreds).reduce((acc, x) => {
      counter++;
      if (num / 100 >= counter) return acc + x * 100;
      return acc;
    }, 0);
    // handle the "xxxx hundred"s for current
    letterSum +=
      hundreds[
        Math.floor(num / 100) < 10 ? Math.floor(num / 100) : num % 1000
      ] *
      ((num % 100) + 1);
    // handle the "and" for current
    letterSum += andValue * (num % 100);
  }
  if (num >= 1000) {
    letterSum += 11;
  }
  return letterSum;
};

console.log(lettersInWords(5), lettersInWords(9)); // expected result: 19 36
console.log(lettersInWords(10), lettersInWords(19)); // expected result: 39 106
console.log(lettersInWords(30), lettersInWords(31)); // expected result: 208 217
console.log(lettersInWords(99), lettersInWords(100), lettersInWords(101));
// expected result: 854 864 880
console.log(lettersInWords(120)); // expected result: 1236
console.log(lettersInWords(342) - lettersInWords(341)); // expected result: 23
console.log(lettersInWords(1000)); // expected result: 21124
