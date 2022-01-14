import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

axios.send = function ajax (url, method, params) {
  return new Promise((resolve, reject) => {
    const config = {
      url: url,
      method: method,
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    }
    if (method === 'get') {
      config.params = params
    } else {
      config.data = params
    }
    axios(config).then(response => {
      if (response.status === 200) {
        resolve(response.data)
      } else if (response.status === 400) {
        reject(response.data)
      } else if (response || response.data) {
        resolve(response.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export default axios
