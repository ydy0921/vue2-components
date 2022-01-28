import axios from './index'

export const getWeekDataApi = () => {
  return axios.send('/taskWeekCalendar/getWeekData', 'get')
}
