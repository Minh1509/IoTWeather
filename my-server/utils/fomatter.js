const {format} = require('date-fns')

 const formatter = (timeString) => {
  return format(new Date(timeString), "yyyy/MM/dd HH:mm:ss");
};
 module.exports = {formatter}