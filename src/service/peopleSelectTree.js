import axios from './index'

export const getAllDepartmentsApi = () => {
  return axios.send('/department/all', 'get')
}

export const getPeopleByDepartmentApi = code => {
  return axios.send('/people/getByDepartment/' + code, 'get')
}

export const getAllPeopleByDepartmentApi = code => {
  return axios.send('/people/getAllByDepartment/' + code, 'get')
}

export const Api = key => {
  return axios.send('/people/search/' + key, 'get')
}
