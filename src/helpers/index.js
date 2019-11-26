import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

// helper functions

export function convertTime(time) {
time = time.split(':'); // convert to array

// fetch
var hours = Number(time[0]);
var minutes = Number(time[1]);

// calculate
var timeValue;

if (hours > 0 && hours <= 12) {
  timeValue= "" + hours;
} else if (hours > 12) {
  timeValue= "" + (hours - 12);
} else if (hours === 0) {
  timeValue= "12";
}
 
timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM

return timeValue;
}


export function filterTime(arrive, leave, other_arrive, other_leave, filter) {
 // filter
  var f = filter * 60000;

  // times to check against
  var m = new Date('01/01/1970 ' + other_arrive).getTime();
  var n = new Date('01/01/1970 ' + other_leave).getTime();

  // arrive
  var x = new Date('01/01/1970 ' + arrive).getTime() - f;
  var y = new Date('01/01/1970 ' + arrive).getTime() + f;

  // leave
  var a = new Date('01/01/1970 ' + leave).getTime() - f;
  var b = new Date('01/01/1970 ' + leave).getTime() + f;

  // create ranges
  const range_arrive = moment.range(x, y);
  const range_leave = moment.range(a, b);

  return (range_arrive.contains(m) && range_leave.contains(n))
  }