// import axios from 'axios'

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL
// })

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// export const loginUser = async (credentials) => {
//   const response = await api.post('/api/login', credentials)
//   return response.data
// }

// export const registerUser = async (userData) => {
//   const response = await api.post('/api/register', userData)
//   return response.data
// }

// export const getCurrentUser = async () => {
//   const response = await api.get('/api/user/profile')
//   return response.data
// }

// export const getCandidates = async () => {
//   const response = await api.get('/api/candidate')
//   return response.data
// }

// export const addCandidate = async (candidateData) => {
//   const response = await api.post('/api/candidate', candidateData)
//   return response.data
// }

// export default api




import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  const apiKey = localStorage.getItem('apiKey')
  if (apiKey) {
    config.headers['x-api-key'] = apiKey
  }
  
  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('apiKey')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const loginUser = async (credentials) => {
  return await api.post('/api/login', credentials)
}

export const registerUser = async (userData) => {
  return await api.post('/api/register', userData)
}

export const getCurrentUser = async () => {
  return await api.get('/api/user/profile')
}

export const getCandidates = async () => {
  return await api.get('/api/candidate')
}

export const addCandidate = async (candidateData) => {
  return await api.post('/api/candidate', candidateData)
}

export default api