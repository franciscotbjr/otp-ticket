const moment = require('moment');

let show = {
    startDate: moment([2019, 10, 06, 10, 0, 0]),
    endDate: moment([2019, 10, 06, 18, 0, 0]),
    openGatesDates: moment([2019, 10, 06, 16, 0, 0])
}

function validateStartTime(show) {
    //const timedifference = new Date().getTimezoneOffset()
    //console.log("timedifference " + (timedifference / 60));

    const currentDate = moment();
    //const currentDate = moment([date.year, date.month, date.day, date.hour, date.minute, date.second]);

    console.log("currentDate " + (currentDate.toDate()));

    console.log("currentDate.diff(show.openGatesDates) " + (currentDate.diff(show.openGatesDates)))
    console.log("currentDate.diff(show.endDate) " + (currentDate.diff(show.endDate)))

    return currentDate.isBetween(show.openGatesDates, show.endDate);
}

console.log("validateStartTime = " + validateStartTime(show));