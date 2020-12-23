// Counting Sundays
// You are given the following information, but you may prefer to do some research for yourself.

//     1 Jan 1900 was a Monday.
//     Thirty days has September,
//     April, June and November.
//     All the rest have thirty-one,
//     Saving February alone,
//     Which has twenty-eight, rain or shine.
//     And on leap years, twenty-nine.
//     A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.

// How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
// expected result: 171

// Tuesday is day zero because 1 Jan 1901 was a Tuesday
const dayOfWeek = {
  0: "Tue",
  1: "Wed",
  2: "Thu",
  3: "Fri",
  4: "Sat",
  5: "Sun",
  6: "Mon",
};

const calcDaysInMonth = (arr) => {
  switch (arr[1]) {
    case 1:
      return 31;
    case 2:
      return arr[0] % 4 === 0 ? 29 : 28; // this lacks the handling of centuries i.e. not on a century unless it is divisible by 400
    case 3:
      return 31;
    case 4:
      return 30;
    case 5:
      return 31;
    case 6:
      return 30;
    case 7:
      return 31;
    case 8:
      return 31;
    case 9:
      return 30;
    case 10:
      return 31;
    case 11:
      return 30;
    case 12:
      return 31;
    default:
      break;
  }
};

let twentiethCentury = [];
let arrYearMonth = [1901, 0];
let dayCount = 0;
let daysInMonth = 0;

for (let y = 0; y < 100; y++) {
  for (let m = 0; m < 12; m++) {
    // increment the month count
    arrYearMonth[1] += 1;
    // use the year and month to calculate the number of days in this month
    daysInMonth = calcDaysInMonth(arrYearMonth);
    // push an array [ YYYY, MM, DD, day-of-the-week ] for each day in the month
    for (let i = dayCount; i < dayCount + daysInMonth; i++) {
      twentiethCentury.push([
        arrYearMonth[0],
        arrYearMonth[1],
        i - (dayCount - 1),
        dayOfWeek[i % 7],
      ]);
    }

    dayCount += daysInMonth;
  }
  // increment the year
  arrYearMonth[0] += 1;
  // reset the month count to 0
  arrYearMonth[1] = 0;
}

console.log(
  twentiethCentury.filter((x) => x[2] === 1 && x[3] === "Sun").length
);
// expected result: 171
