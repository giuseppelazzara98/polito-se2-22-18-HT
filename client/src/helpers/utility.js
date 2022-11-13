import dayjs from "dayjs";

var duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
var toObject = require('dayjs/plugin/toObject')
dayjs.extend(toObject)

export const formatDuration = (duration) => {
  let days = parseInt(dayjs.duration(duration, "hours").asDays()) ?? "";
  let hours = dayjs.duration(duration, "hours").format("HH");
  let minutes = dayjs.duration(duration, "hours").format("mm");
  
  return `${days > 0 ? `${days} d ` : ""}${hours} h ${minutes} m`;
}
export const formatAscent = (ascent) => {
  return `${ascent/100} %`;
}
