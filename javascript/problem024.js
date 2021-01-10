// Lexicographic permutations
// A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4.
// If all of the permutations are listed numerically or alphabetically, we call it lexicographic order.
// The lexicographic permutations of 0, 1 and 2 are:
// 012   021   102   120   201   210
// What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

// expected result: 2783915460

const { generateSetOfNumbersBelow } = require("./lib/common_tools");

const myFactorial = (n) => {
  return n === 0
    ? 1
    : generateSetOfNumbersBelow(n + 1).reduce((acc, x) => acc * x);
};
// total number of permutations of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] is 3628800

// total number of permutations of [0, 1, 2, 3] is 24 (4!)
// [[n,n+1,n+2,n+3], [n,1,3,2], [n,2,1,3], [n,2,3,1], [n,3,1,2], [n,3,2,1]]
//   1         2           3         4           5           3! * 1
// [[ 1, 0, 2, 3 ], [ 1, 0, 3, 2 ], [ 1, 2, 0, 3], [1,2,3,0], [1,3,0,2], [1,3,2,0]]
//      1! * 1 + 3!          1! * 1 + 2! * 1 + 3! * 1           3 + 3!     1! * 0 + 2! * 2 + 3! * 1    5 + 3!     3! * 2
//
// total number of permutations of     [ 0, 1, 2, 3, 4 ] is 120           0 0 0 0 0
// 4! * 0 + 3! * 1 + 2! * 0 + 1! * 0 = [ 0, 1, 4, 3, 2 ] = 6 term         0 0 1 0 0
// 4! * 0 + 3! * 1 + 2! * 0 + 1! * 1 = [ 0, 2, 1, 3, 4 ] = 7 term         1 0 1 0 0
// 4! * 0 + 3! * 1 + 2! * 1 + 1! * 0 = [ 0, 2, 1, 4, 3 ] = 8 term         0 1 1 0 0
// 4! * 0 + 3! * 1 + 2! * 1 + 1! * 1 = [ 0, 2, 3, 1, 4 ] = 9 term         0 1 1 1 0
// 4! * 0 + 3! * 1 + 2! * 2 + 1! * 0 = [ 0, 2, 3, 4, 1 ] = 10 term        0 2 1 0 0
// . . .
// 4! * 1 + 3! * 0 + 2! * 0 + 1! * 0 = [ 0, 4, 3, 2, 1 ] = 24 term        0 0 0 1 0
// 4! * 1 + 3! * 0 + 2! * 0 + 1! * 1 = [ 1, 2, 3, 4, 0 ] = 25 term        1 0 0 1 0
// . . .
// 4! * 5 + 3! * 0 + 2! * 0 + 1! * 0 = [ 4, 3, 2, 1, 0 ] = 119 term       0 0 0 5 0

// looking for the nth Term (n) of permutations of an array (arr) sorted in lexigraphic order

let nthPermutationOfArray = (n, arr) => {
  let currentTerm = 1;
  let nthArr = [];
  let remainingArr = arr;
  let placeStep = myFactorial(arr.length - nthArr.length - 1);

  for (let i = 1; i < arr.length; i++) {
    // push an element from the remaining Array onto the nth Array
    nthArr.push(remainingArr[Math.floor((n - currentTerm) / placeStep)]);
    // adjust the remaining Array to reflect the removed element
    if (remainingArr.indexOf(nthArr[nthArr.length - 1]) === 0) {
      remainingArr.shift();
    } else if (
      remainingArr.indexOf(nthArr[nthArr.length - 1]) ===
      remainingArr.length - 1
    ) {
      remainingArr.pop();
    } else {
      remainingArr = remainingArr
        .slice(0, remainingArr.indexOf(nthArr[nthArr.length - 1]))
        .concat(
          remainingArr.slice(
            remainingArr.indexOf(nthArr[nthArr.length - 1]) + 1
          )
        );
    }
    // adjust the currentTerm
    currentTerm += placeStep * Math.floor((n - currentTerm) / placeStep);
    // adjust the placeStep for the next iteration
    placeStep = myFactorial(arr.length - nthArr.length - 1);
  }

  nthArr.push(remainingArr[Math.floor((n - currentTerm) / placeStep)]);
  // return a string representation of the nth permutation
  return nthArr.reduce((acc, x) => acc + x, "");
};

console.log(
  nthPermutationOfArray(1000000, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
  "2783915460"
); // expected result: 2783915460
// console.log(nthPermutationOfArray(6, [0, 1, 2, 3]), "0321"); // this breaks! case 1
// console.log(nthPermutationOfArray(7, [0, 1, 2, 3]), "1023");
// console.log(nthPermutationOfArray(10, [0, 1, 2, 3]), "1230");
// console.log(nthPermutationOfArray(11, [0, 1, 2, 3]), "1302");
// console.log(nthPermutationOfArray(12, [0, 1, 2, 3]), "1320");
// console.log(nthPermutationOfArray(18, [0, 1, 2, 3]), "2310");
// console.log(nthPermutationOfArray(19, [0, 1, 2, 3]), "????"); // this breaks! case 2
// console.log(nthPermutationOfArray(24, [0, 1, 2, 3]), "3210"); // this breaks! case ???

// console.log(nthPermutationOfArray(10, [0, 1, 2, 3, 4])); // [ 0, 2, 3, 4, 1 ]
// console.log(nthPermutationOfArray(24, [0, 1, 2, 3, 4])); // [ 0, 4, 3, 2, 1 ]

// console.log(nthPermutationOfArray(725760, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
// console.log(nthPermutationOfArray(725761, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
