import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser, getCurrentUser } from '../services/api'
import toast from 'react-hot-toast'
import Loader from '../components/Loader/Loader'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getCurrentUser()
        .then(data => {
          setUser(data)
        })
        .catch(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('apiKey')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials)
      const { token, api_key } = response
      
      localStorage.setItem('token', token)
      localStorage.setItem('apiKey', api_key)
      
      // Fetch user data after successful login
      const userData = await getCurrentUser()
      setUser(userData)
      
      toast.success('Login successful')
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed')
      return false
    }
  }

  const register = async (userData) => {
    try {
      const response = await registerUser(userData)
      const { token, api_key } = response
      
      localStorage.setItem('token', token)
      localStorage.setItem('apiKey', api_key)
      
      // Fetch user data after successful registration
      const userInfo = await getCurrentUser()
      setUser(userInfo)
      
      toast.success('Registration successful')
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('apiKey')
    setUser(null)
    toast.success('Logged out successfully')
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader/></div>
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)