import axios from 'axios'

const Chapar = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    common: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...(typeof window !== 'undefined' &&
        localStorage.getItem('token') && {
          Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
        }),
    },
  },
})

Chapar.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
   
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
   
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject({ error, status: error?.response?.status })
  },
)

export default Chapar
