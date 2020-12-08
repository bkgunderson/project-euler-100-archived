// Longest Collatz sequence
// The following iterative sequence is defined for the set of positive integers:

// n → n/2 (n is even)
// n → 3n + 1 (n is odd)

// Using the rule above and starting with 13, we generate the following sequence:
// 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1

// It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

// Which starting number, under one million, produces the longest chain?

// NOTE: Once the chain starts the terms are allowed to go above one million.

// expected result: 837799

const { checkIsEven } = require("./lib/common_tools");

const collatz = (n) => {
  return checkIsEven(n) ? (n /= 2) : (n = n * 3 + 1);
};

const createCollatzSeq = (startNum) => {
  let arr = [startNum];
  nextNum = collatz(startNum);
  while (nextNum > 1) {
    arr.push(nextNum);
    nextNum = collatz(nextNum);
  }
  arr.push(nextNum);
  return arr;
};

const findLargestStartNum = () => {
  let bigArr = createCollatzSeq(4);
  for (let i = 5; i < 1000000; i++) {
    let currentArr = createCollatzSeq(i);
    if (currentArr.length > bigArr.length) bigArr = currentArr;
  }
  return bigArr[0];
};

console.log(findLargestStartNum());
// expected result: 837799

const reverseCollatz = (num) => {
  let oddReverse = (num - 1) / 3;
  return oddReverse % 2 === 1 && (num - 1) % 3 === 0 ? oddReverse : num * 2;
};

const goInReverse = (num) => {
  let arr = createCollatzSeq(num);
  let priorNum = reverseCollatz(num);
  while (priorNum < 1000000) {
    arr.unshift(priorNum);
    priorNum = reverseCollatz(priorNum);
  }
  return arr.length;
};

console.log(goInReverse(837799));
