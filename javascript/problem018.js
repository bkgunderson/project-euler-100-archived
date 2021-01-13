// Maximum path sum I
// By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

//    3
//   7 4
//  2 4 6
// 8 5 9 3

// That is, 3 + 7 + 4 + 9 = 23.

// Find the maximum total from top to bottom of the triangle below:

//                             75
//                           95  64
//                         17  47  82
//                       18  35  87  10
//                     20  04  82  47  65
//                   19  01  23  75  03  34
//                 88  02  77  73  07  63  67
//               99  65  04  28  06  16  70  92
//             41  41  26  56  83  40  80  70  33
//           41  48  72  33  47  32  37  16  94  29
//         53  71  44  65  25  43  91  52  97  51  14
//       70  11  33  28  77  73  17  78  39  68  17  57
//     91  71  52  38  17  14  91  43  58  50  27  29  48
//   63  66  04  68  89  53  67  30  73  16  69  87  40  31
// 04  62  98  27  23  09  70  98  73  93  38  53  60  04  23

// NOTE: As there are only 16384 routes, it is possible to solve this problem by trying every route. However, Problem 67, is the same challenge with a triangle containing one-hundred rows; it cannot be solved by brute force, and requires a clever method! ;o)

// total number of possible routes is 2 ** (the number of rows in the triangle)

const arrSmallTriangle = [[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]];
const arrMediumTriangle = [
  [1],
  [7, 2],
  [5, 4, 6],
  [7, 1, 2, 3],
  [2, 0, 0, 0, 6],
  [1, 0, 0, 0, 0, 9],
];

const arrOnesAndFives = [
  [1],
  [1, 5],
  [1, 1, 5],
  [5, 5, 1, 1],
  [5, 1, 1, 1, 1],
  [5, 1, 1, 1, 1, 1],
];

const arrTriangleToSolve = [
  [75],
  [95, 64],
  [17, 47, 82],
  [18, 35, 87, 10],
  [20, 4, 82, 47, 65],
  [19, 1, 23, 75, 3, 34],
  [88, 2, 77, 73, 7, 63, 67],
  [99, 65, 4, 28, 6, 16, 70, 92],
  [41, 41, 26, 56, 83, 40, 80, 70, 33],
  [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
  [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
  [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
  [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
  [63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
  [4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23],
];

const highestTotalRoute = (arr) => {
  let arrPositions = [[0]];
  let highestTotal = 0;

  for (var i = 1; i < arr.length; i++) {
    arrPositions.forEach((arrPosit) => {
      arrPositions.push(arrPosit.concat(arrPosit[arrPosit.length - 1] + 1));
      arrPosit.push(arrPosit[arrPosit.length - 1]);
    });
    // console.log(2 ** i, arrPositions.length);
  }

  let arrPossibleRoutes = [];
  // run through the positions to create possible routes
  // if the sum of the elements in a route is higher than current total, update that variable
  arrPositions.forEach((element) => {
    var routeToPush = [];
    for (let i = 0; i < element.length; i++) {
      routeToPush.push(arr[i][element[i]]);
    }
    arrPossibleRoutes.push(routeToPush);
    if (routeToPush.reduce((acc, x) => acc + x, 0) > highestTotal)
      highestTotal = routeToPush.reduce((acc, x) => acc + x, 0);
  });

  return highestTotal;
};

// I started this problem with the wrong assumption that identifying the highest sum
// from two rows at a time could determine the path. This is faulty!
// If a route gets higher numbers at the lower rows, it could end up having the highest total.
//
// Ideas for how to not do brute force:
//   - find the max number per element & use that to cut out routes that fall too low halfway through
//     (i.e.) even if they got the max value for each row, they would still not reach the highest total

// console.log(highestTotalRoute(arrSmallTriangle)); // expected result: 23
// console.log(highestTotalRoute(arrMediumTriangle)); // expected result: 27
// console.log(highestTotalRoute(arrOnesAndFives)); // expected result: 18
console.log(highestTotalRoute(arrTriangleToSolve)); // expected result: 1074

// solution route is:
// [
//   75, 64, 82, 87, 82, 75,
//   73, 28, 83, 32, 91, 78,
//   58, 73, 93
// ]
