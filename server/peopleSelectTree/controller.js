const { returnJson } = require('../utils')
const { getAllDepartments, getPeopleByDepartment, getAllPeopleByDepartment, search } = require('./service')

const controller = {
  '/peopleSelectTree/getAllDepartments': {
    method: 'get',
    callback: function (req, res) {
      res.send(returnJson(getAllDepartments()))
    }
  },
  '/peopleSelectTree/getPeopleByDepartment/:code': {
    method: 'get',
    callback: function (req, res) {
      res.send(returnJson(getPeopleByDepartment(req.params.code)))
    }
  },
  '/peopleSelectTree/getAllPeopleByDepartment/:code': {
    method: 'get',
    callback: function (req, res) {
      res.send(returnJson(getAllPeopleByDepartment(req.params.code)))
    }
  },
  '/peopleSelectTree/search/:key': {
    method: 'get',
    callback: function (req, res) {
      res.send(returnJson(search(req.params.key)))
    }
  }
}

module.exports = {
  controller
}
