import { departments, people } from './data.js'

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

function getAllDepartmentsApi () {
  return mockRequest(data)
}

function getPeopleByDepartmentApi (code) {
  return mockRequest(people.filter(i => i.deptCode === code))
}

function getAllPeopleByDepartmentApi (code) {
  const filterDepartments = []
  const result = [];
  (function search (item) {
    if (item) {
      filterDepartments.push(item.code)
      if (item.children && item.children.length) {
        item.children.forEach(i => {
          search(i)
        })
      }
    }
  })(map[code])
  for (const person of people) {
    if (filterDepartments.indexOf(person.deptCode) !== -1) {
      result.push(person)
    }
  }
  return mockRequest(result)
}

function searchApi (name) {
  const result = []
  people.forEach(i => {
    i.userName.indexOf(name) !== -1 && result.push(i)
  })
  return mockRequest(result)
}

function mockRequest (data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })
}

export {
  getAllDepartmentsApi,
  getPeopleByDepartmentApi,
  getAllPeopleByDepartmentApi,
  searchApi
}
