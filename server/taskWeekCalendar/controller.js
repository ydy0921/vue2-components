const { returnJson } = require('../utils')
const { getWeekData } = require('./service')

const controller = {
  '/taskWeekCalendar/getWeekData': {
    method: 'get',
    callback: function (req, res) {
      res.send(returnJson(getWeekData()))
    }
  }
}

module.exports = {
  controller
}
