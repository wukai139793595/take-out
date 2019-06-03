import Axios from 'axios'

const server = Axios.create({
  baseURL: '',
  timeout: 5e3
})

server.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})

server.interceptors.response.use((response) => {
  return response.data
}, (err) => {
  return Promise.reject(err)
})

export default server
