const moment = require('moment');

let open = moment([2019, 10, 05, 20, 0, 0]);
let start = moment([2019, 10, 05, 22, 0, 0]);
let end = moment([2019, 10, 06, 04, 0, 0]);

console.log("start " + (start.toDate()));
console.log("end " + (end.toDate()));

let duration = (end.diff(start)  / (1000 * 60 * 60)) + (start.diff(open) / (1000 * 60 * 60));

console.log("Duration " + (duration))