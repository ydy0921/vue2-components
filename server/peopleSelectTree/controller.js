const { returnJson } = require('../utils')
const { getAllDepartments, getPeopleByDepartment, getAllPeopleByDepartment, search } = require('./service')

module.exports = {
  '/department/all': {
    method: 'get',
    callback: function (req, res) {
      res.send(returnJson(getAllDepartments()))
    }
  },
  '/people/getByDepartment/:code': {
    method: 'get',
    callback: function (req, res) {
      res.send(returnJson(getPeopleByDepartment(req.params.code)))
    }
  },
  '/people/getAllByDepartment/:code': {
    method: 'get',
    callback: function (req, res) {
      res.send(returnJson(getAllPeopleByDepartment(req.params.code)))
    }
  },
  '/people/search/:key': {
    method: 'get',
    callback: function (req, res) {
      res.send(returnJson(search(req.params.key)))
    }
  }
}
