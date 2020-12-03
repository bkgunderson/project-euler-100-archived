//Lattice paths
// Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
// How many such routes are there through a 20×20 grid?
//
// expected result: 137846528820

var createTheRoute = (dimens, route = "") => {
  let downCount = route.match(/d/g) ? route.match(/d/g).length : 0;
  let rightCount = route.match(/r/g) ? route.match(/r/g).length : 0;
  while (route.length < dimens * 2) {
    if (Math.trunc(Math.random(1) * 1000) % 2 === 1 && downCount < dimens) {
      route += "d";
      downCount++;
    }
    if (Math.trunc(Math.random(1) * 1000) % 2 === 1 && rightCount < dimens) {
      route += "r";
      rightCount++;
    }
    if (route.length === dimens * 2 - 1 && dimens > 2) {
      if (downCount === 2) {
        route += "d";
      } else if (rightCount === dimens * 2 - 1) {
        route += "r";
      }
    }
  }
  return route;
};

const routeCountThroughGrid = (dimensions) => {
  let arrRoutes = [];
  let newRoute = createTheRoute(dimensions);
  for (var i = 0; i < 30000; i++) {
    while (!arrRoutes.includes(newRoute)) {
      arrRoutes.push(newRoute);
      newRoute = newRoute.slice(-1) + newRoute.slice(0, -1);
    }
    var tryMe =
      arrRoutes.filter((x) => x.startsWith("r").length) <
      arrRoutes.filter((x) => x.startsWith("d").length)
        ? arrRoutes.filter((x) => x.startsWith("rr").length) <
          arrRoutes.filter((x) => x.startsWith("rd").length)
          ? "rr"
          : "rd"
        : arrRoutes.filter((x) => x.startsWith("dd").length) <
          arrRoutes.filter((x) => x.startsWith("dr").length)
        ? arrRoutes.filter((x) => x.startsWith("ddr").length) <
          arrRoutes.filter((x) => x.startsWith("ddd").length)
          ? arrRoutes.filter((x) => x.startsWith("ddrr").length) <
            arrRoutes.filter((x) => x.startsWith("ddrd").length)
            ? "ddrr"
            : "ddrd"
          : "ddd"
        : "dr";
    if (
      arrRoutes.filter((x) => x.startsWith("d").length) <=
      arrRoutes.filter((x) => x.startsWith("r").length)
    ) {
      tryMe = "d";
    }
    if (i > 15000) {
      tryMe = "";
    }
    newRoute = createTheRoute(dimensions, tryMe);
  }
  return arrRoutes.length;
};
// 1 x 1 ~~~ 2 moves per route ~~~ 2 routes
// "rd" - 2

// 2 x 2 ~~~ 4 moves per route ~~~ 6 routes
// [ "rrdd", "rdrd", "rddr", "drrd", "drdr", "ddrr" ]
// "rrdd" - 4
// "rdrd" - 2

// 3 x 3 ~~~ 6 moves per route ~~~ 20 routes
// ["rrrddd", "drrrdd", "ddrrrd", "dddrrr", "rdddrr", "rrdddr", "rdrdrd", "drdrdr", "rrdrdd", "rdrddr", "drddrr", "rddrrd", "ddrrdr", "drrdrd", "ddrdrr", "drdrrd", "rdrrdd", "drrddr", "rrddrd", "rddrdr"]
// "rrdrdd" - 6
// "rrddrd" - 6
// "rrrddd" - 6
// "rdrdrd" - 2
// "r" - 10
// "rr" - 4
// "rrr" - 1

// 4 x 4 ~~~ 8 moves per route ~~~ 70 routes
// "r" - 35
// "rr" - 15
// "rrr" - 5
// "rrrr" - 1

// 5 x 5 ~~~ 10 moves per route ~~~ 252 routes [1,6,21,56,126]
// "r" - 126
// "rr" - 56
// "rrr" - 21
// "rrrr" - 6
// "rrrrr" - 1

// 6 x 6 ~~~ 12 moves per route ~~~ 924 routes [1,7,28,84,210,462]
// "r" - 462
// "rr" - 210
// "rrr" - 84
// "rrrr" - 28
// "rrrrr" - 7
// "rrrrrr" - 1

// this method doesn't work reliably
// console.log(routeCountThroughGrid(20)); // expected result: 137846528820

const getRouteTotal = (gridDimens, arr = [1]) => {
  var newArr = [1];
  for (var i = 1; i < arr.length; i++) {
    newArr.push(arr[i] + newArr[i - 1]);
  }
  newArr.push(newArr[newArr.length - 1] + arr[arr.length - 1] * 2);
  // if the array length is less than the grid dimensions, call the function on the array
  // when finished, double the final element of the array & return
  return newArr.length < gridDimens
    ? getRouteTotal(gridDimens, newArr)
    : newArr[gridDimens - 1] * 2;
};
// console.log(getRouteTotal(2)); // expected result: 6
// console.log(getRouteTotal(3)); // expected result: 20
console.log(getRouteTotal(20)); // expected result: 137846528820
