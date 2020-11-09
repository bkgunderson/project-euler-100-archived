// The prime factors of 13195 are 5, 7, 13 and 29.
//
// What is the largest prime factor of the number 600851475143 ?

// const checkIsPrime = (num) => {
//   for (var i = num - 1; i > 1; i--) {
//     if (num % i === 0) {
//       return false;
//     }
//   }
//   return true;
// };

const findLargestPrimeFactor = (num) => {
  var factors = [];
  var product = num;
  while (product > 1) {
    var i = 1;
    if (product % 2 === 0) {
      factors.push(2);
      product = product / 2;
    } else if (product % 3 === 0) {
      factors.push(3);
      product = product / 3;
    } else {
      i = 5;
      while (product % i !== 0) {
        i = i + 2;
      }
      factors.push(i);
      product = product / i;
    }
  }
  return factors[factors.length - 1];
};

console.log(findLargestPrimeFactor(600851475143));
