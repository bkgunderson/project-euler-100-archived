// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
// a ** 2 + b ** 2 = c ** 2

// For example, 3 ** 2 + 4 ** 2 = 9 + 16 = 25 = 5 ** 2.

// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.

const pythagTripletProductFromSum = (sum) => {
  a = 1; // might be faster to set "a" at a higher number, not hard-coded to "1"
  b = Math.round(sum / 3); // this has been an acceptable guess for all of the Pyth triplets tested
  c = sum - (a + b);
  while (a < b && b < c) {
    while (a ** 2 + b ** 2 < c ** 2 && a + b + c === sum) {
      if (Math.sqrt(a ** 2 + b ** 2) == c) {
        console.log(a, b, c, "in the loop");
        return a * b * c;
      } else if (a ** 2 + b ** 2 < c ** 2) {
        b++;
        c = sum - (a + b);
      }
    }
    if (Math.sqrt(a ** 2 + b ** 2) === c && a + b + c <= sum) {
      console.log(a, b, c, "before reset");
      return a * b * c;
    }
    a++;
    b = Math.round(sum / 3);
    c = sum - (a + b);
    if (Math.sqrt(a ** 2 + b ** 2) === c && a + b + c <= sum) {
      console.log(a, b, c, "after reset");
      return a * b * c;
    }
  }
  if (Math.sqrt(a ** 2 + b ** 2) === c && a + b + c <= sum) {
    console.log(a, b, c, "at teh end");
    return a * b * c;
  }
  return "no success!";
};

console.log(pythagTripletProductFromSum(12)); // expected result: 60
// console.log(pythagTripletProductFromSum(24)); // expected result: 480
// console.log(pythagTripletProductFromSum(1000)); // expected result: 31875000
