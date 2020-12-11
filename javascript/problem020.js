// Factorial Digit Sum
// n! means n × (n − 1) × ... × 3 × 2 × 1
// For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
// and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
// Find the sum of the digits in the number 100!
// expected result: 648

const longMultipToArray = (n) => {
  let productArr = [1];
  let currentLength = 1;
  // the iterator in this loop runs through all the factors of the factorial
  for (let i = 1; i <= n; i++) {
    currentLength = productArr.length;
    for (let place = currentLength - 1; place >= 0; place--) {
      productArr[place] *= i;
    }
    if (productArr[0] >= 10) productArr.unshift(0);
    if (productArr[1] >= 100) productArr.unshift(0);
    for (let i = productArr.length - 1; i > 0; i--) {
      if (productArr[i] >= 10) {
        productArr[i - 1] += Math.floor(productArr[i] / 10);
        productArr[i] = productArr[i] % 10;
      }
    }
  }
  return productArr;
};

// console.log(longMultipToArray(10)); // expected result: 27
console.log(longMultipToArray(100).reduce((acc, n) => acc + n, 0)); // expected result: 648
