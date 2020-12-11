//Power digit sum
// 2 ** 15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

// What is the sum of the digits of the number 2 ** 1000?
// expected result: 1366

// 2 ** 1000 is too large for regular Number in JavaScript, so try long multiplication

const longMultipToArray = (n) => {
  let productArr = [2];
  let currentLength = 1;
  // multiply times 2 as many times as supplied exponent
  for (let i = 2; i <= n; i++) {
    currentLength = productArr.length;
    for (let place = currentLength - 1; place >= 0; place--) {
      productArr[place] *= 2;
    }
    if (productArr[0] >= 10) productArr.unshift(0);
    for (let i = productArr.length - 1; i > 0; i--) {
      if (productArr[i] >= 10) {
        productArr[i - 1] += Math.floor(productArr[i] / 10);
        productArr[i] = productArr[i] % 10;
      }
    }
  }
  return productArr;
};

// console.log(longMultipToArray(15).reduce((acc, n) => acc + n, 0)); // expected result: 26
console.log(longMultipToArray(1000).reduce((acc, n) => acc + n, 0)); // expected result: 1366
