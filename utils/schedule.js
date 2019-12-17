const cron = require("node-cron");

const notifyBill = (day, month) => cron.schedule(`* 0 ${day} ${month} *`, () => {

})

module.exports = {notifyBill}
