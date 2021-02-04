// Number spiral diagonals
//
// Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:

// 21 22 23 24 25
// 20  7  8  9 10
// 19  6  1  2 11
// 18  5  4  3 12
// 17 16 15 14 13

// It can be verified that the sum of the numbers on the diagonals is 101.

// What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in the same way?
// Expected result: 669171001

const { sumOfElements } = require("./lib/common_tools");

// identify and sum the diagonal numbers in a spiral array of the specified size
const sumOfSpiralDiagonals = (size) => {
  let arrOfDiagonals = [];
  // iterate through each side of the spiral & push the diagonals onto the array of diagonals
  // the first side length is the outermost side with the specified size
  // each inner side length is decremented by 2
  for (let side = size; side > 1; side -= 2) {
    for (let i = 0; i < 4; i++) {
      arrOfDiagonals.push(side ** 2 - (side - 1) * i);
    }
  }
  // the innermost part of the spiral only gets one push because it has only one element
  arrOfDiagonals.push(1);
  return sumOfElements(arrOfDiagonals);
};

console.log(sumOfSpiralDiagonals(5), "101");
console.log(sumOfSpiralDiagonals(1001), "669171001");
