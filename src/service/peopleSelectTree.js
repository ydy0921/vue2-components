import axios from './index'

export const getAllDepartmentsApi = () => {
  return axios.send('/peopleSelectTree/getAllDepartments', 'get')
}

export const getPeopleByDepartmentApi = code => {
  return axios.send('/peopleSelectTree/getPeopleByDepartment/' + code, 'get')
}

export const getAllPeopleByDepartmentApi = code => {
  return axios.send('/peopleSelectTree/getAllPeopleByDepartment/' + code, 'get')
}

export const Api = key => {
  return axios.send('/peopleSelectTree/search/' + key, 'get')
}
