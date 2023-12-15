import axios from "axios"

const request = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000
})


request.interceptors.request.use((config) => {

  return config
}, (error) => {
  return Promise.reject(error)
})


request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (axios.isAxiosError(error)) {
    console.error('AxiosError:', error.toJSON());
  }
  return Promise.reject(error)
})

export { request }



