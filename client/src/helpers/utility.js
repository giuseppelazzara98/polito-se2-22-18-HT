import dayjs from "dayjs";

let duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
let toObject = require('dayjs/plugin/toObject')
dayjs.extend(toObject)

export const formatDuration = (duration) => {
  let days = parseInt(dayjs.duration(duration, "hours").asDays()) ?? "";
  let hours = dayjs.duration(duration, "hours").format("HH");
  let minutes = dayjs.duration(duration, "hours").format("mm");
  if(days > 0){
    return `${days} d ${hours} h ${minutes} m`;
  }
  return `${hours} h ${minutes} m`;
}
export const formatAscent = (ascent) => {
  return `${ascent/100} %`;
}

export const getBase64 = (file) => {
  return new Promise((onSuccess, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => onSuccess(reader.result);
    reader.onerror = (error) => reject(error);
  })
}
