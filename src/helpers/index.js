import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

// helper functions
export function convertTime(time) {
time = time.split(':'); // convert to array

// get values for hours/minutes
var hours = Number(time[0]);
var minutes = Number(time[1]);

var timeValue;

// handles 0/12 case
if (hours > 0 && hours <= 12) {
  timeValue= "" + hours;
} else if (hours > 12) {
  timeValue= "" + (hours - 12);
} else if (hours === 0) {
  timeValue= "12";
}

// Add AM/PM
timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM

return timeValue;
}

export function filterTime(arrive, leave, other_arrive, other_leave, time_arrive, time_leave) {
 // filter is minutes times miliseconds
  var fa = time_arrive * 60000;
  var fl = time_leave * 60000;

  // timestamps are calculated as milliseconds since 01/01/1970
  // times to check against
  var m = new Date('01/01/1970 ' + other_arrive).getTime();
  var n = new Date('01/01/1970 ' + other_leave).getTime();

  // arrive
  var x = new Date('01/01/1970 ' + arrive).getTime() - fa;
  var y = new Date('01/01/1970 ' + arrive).getTime() + fa;

  // leave
  var a = new Date('01/01/1970 ' + leave).getTime() - fl;
  var b = new Date('01/01/1970 ' + leave).getTime() + fl;

  // create ranges
  const range_arrive = moment.range(x, y);
  const range_leave = moment.range(a, b);

  // make sure both times are in the respective ranges
  return (range_arrive.contains(m) && range_leave.contains(n)) 
  }