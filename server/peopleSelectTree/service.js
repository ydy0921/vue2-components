const { departments, people } = require('./data.js')

const map = {}
const data = []
for (const department of departments) {
  const code = department.code
  const pCode = department.pCode
  map[code] = map[code] ? { ...department, ...map[code] } : department
  const item = map[code]
  if (pCode === '0') {
    data.push(item)
  } else {
    if (!map[pCode]) {
      map[pCode] = {}
    }
    if (!map[pCode].children) {
      map[pCode].children = []
    }
    map[pCode].children.push(item)
  }
}

function getAllDepartments () {
  return data
}

function getPeopleByDepartment (code) {
  return people.filter(i => i.deptCode === code)
}

function getAllPeopleByDepartment (code) {
  const filterDepartments = []
  const result = [];
  (function searchDepartment (item) {
    if (item) {
      filterDepartments.push(item.code)
      if (item.children && item.children.length) {
        item.children.forEach(i => {
          searchDepartment(i)
        })
      }
    }
  })(map[code])
  for (const person of people) {
    if (filterDepartments.indexOf(person.deptCode) !== -1) {
      result.push(person)
    }
  }
  return result
}

function search (key) {
  const result = []
  people.forEach(i => {
    (i.userName.indexOf(key) !== -1 || i.id.indexOf(key) !== -1) && result.push(i)
  })
  return result
}

module.exports = {
  getAllDepartments,
  getPeopleByDepartment,
  getAllPeopleByDepartment,
  search
}
