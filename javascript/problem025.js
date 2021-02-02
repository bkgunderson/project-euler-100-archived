// 1000-digit Fibonacci number
// The Fibonacci sequence is defined by the recurrence relation:

// Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.

// Hence the first 12 terms will be:

// F1 = 1
// F2 = 1
// F3 = 2
// F4 = 3
// F5 = 5
// F6 = 8
// F7 = 13
// F8 = 21
// F9 = 34
// F10 = 55
// F11 = 89
// F12 = 144

// The 12th term, F12, is the first term to contain three digits.

// What is the index of the first term in the Fibonacci sequence to contain 1000 digits?
// expected result: 4782

let fibSeq = [[1], [1]];
let digitMax = 1000;

// sumArraysOfPlaceValues has mostly been tested with arr1 being larger than arr2
// also mostly arr1 being < 100 times larger than arr2

// add two arrays which represent integers too large for JavaScript to handle
// return an array which represents the sum
// with resultArray[0] being the 10**0 place
// resultArray[1] being the 10**1 place, etc.
const sumArraysOfPlaceValues = (arr1, arr2) => {
  let resultArray = [];
  // carry is a variable that takes value 1 in order to increment the next higher place value
  let carry = 0;
  resultArray.push((arr1[0] + arr2[0] + carry) % 10);
  arr1[0] + arr2[0] + carry < 10 ? (carry = 0) : (carry = 1);

  for (let p = 1; p < arr1.length + 1; p++) {
    if (arr1[p] || arr2[p] || arr1[p - 1] + arr2[p - 1] + carry >= 10)
      resultArray.push(
        ((arr1[p] ? arr1[p] : 0) + (arr2[p] ? arr2[p] : 0) + carry) % 10
      );
    else if (arr1[p] === 0 && arr2[p] === 0) resultArray.push(0);
    arr1[p] + arr2[p] + carry < 10 ? (carry = 0) : (carry = 1);
  }

  return resultArray;
};

const firstFibTermWithNDigits = (nDigits) => {
  // add terms of the Fibonacci Sequence to the fibSeq array
  // while that array length is shorter than the provided nDigits argument
  while (fibSeq[fibSeq.length - 1].length < nDigits) {
    fibSeq.push(
      sumArraysOfPlaceValues(
        fibSeq[fibSeq.length - 1],
        fibSeq[fibSeq.length - 2]
      )
    );
  }
  return fibSeq.filter((x) => x.length < nDigits).length + 1;
};

// solution(n) comes from Robert Eisele's site
// https://www.xarg.org/puzzle/project-euler/problem-25/

function solution(n) {
  return Math.ceil(4.78497 * n - 3.1127);
}

// expected result: 4782
console.log(firstFibTermWithNDigits(digitMax));
// console.log(solution(digitMax));

// broken case when adding 0 + 0 as paired place values in arr1 & arr2 ::20210127

// "tests"
// console.log(sumArraysOfPlaceValues([8, 1], [8, 1]), "[ 6, 3 ]");
// console.log(sumArraysOfPlaceValues([0, 9], [0, 1]), "[ 0, 0, 1 ]");
// console.log(sumArraysOfPlaceValues([1, 0, 1, 1], [1, 0, 1]), "[ 2, 0, 2, 1 ]");
// console.log(fibSeq[10], "[ 9, 8 ]");
// console.log(fibSeq[11], "[ 4, 4, 1 ]");
// console.log(fibSeq[18], "[ 1, 8, 1, 4 ]");
// console.log(fibSeq[21].length, 5);
// console.log(fibSeq[25], "[ 3, 9, 3, 1, 2, 1 ]");
