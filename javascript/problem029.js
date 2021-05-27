// Distinct powers

// Consider all integer combinations of a**b for 2 ≤ a ≤ 5 and 2 ≤ b ≤ 5:

//     2**2=4, 2**3=8, 2**4=16, 2**5=32
//     3**2=9, 3**3=27, 3**4=81, 3**5=243
//     4**2=16, 4**3=64, 4**4=256, 4**5=1024
//     5**2=25, 5**3=125, 5**4=625, 5**5=3125

// If they are then placed in numerical order, with any repeats removed, we get the following sequence of 15 distinct terms:

// 4, 8, 9, 16, 25, 27, 32, 64, 81, 125, 243, 256, 625, 1024, 3125

// How many distinct terms are in the sequence generated by a**b for 2 ≤ a ≤ 100 and 2 ≤ b ≤ 100?
const { checkIsPrime, objPrimeFactors } = require("./lib/common_tools");

const expoPowers = (x, y) => {
  let xPrimes = checkIsPrime(x) ? { [x]: 1 } : objPrimeFactors(x); // { 2: 2 }
  Object.keys(xPrimes).forEach((r) => (xPrimes[r] = xPrimes[r] * y));
  return xPrimes;
};

const distinctPowers = (low, high) => {
  // get the maximum amount of distinct powers possible
  let result = 0;
  let arr = [];
  for (var i = low; i <= high; i++) {
    arr.push(i);
  }
  let distinctPowersObj = {};

  arr.forEach((x) => {
    arr.forEach((y) => {
      let tierOne = expoPowers(x, y);
      let keyOne = Object.keys(tierOne).toString();
      let powOne = Object.values(tierOne).toString();
      if (!distinctPowersObj[keyOne]) {
        distinctPowersObj[keyOne] = [powOne];
      } else {
        if (!distinctPowersObj[keyOne].includes(powOne))
          distinctPowersObj[keyOne].push(powOne);
      }
    });
  });
  Object.keys(distinctPowersObj).forEach((x) => {
    result += distinctPowersObj[x].length;
  });
  return result;
};

console.log(`
      expected result: 15
               result: ${distinctPowers(2, 5)}
      expected result: 9183
               result: ${distinctPowers(2, 100)}`);
