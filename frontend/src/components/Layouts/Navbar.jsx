import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-semibold text-gray-400 hover:text-gray-200">
            APIConnectX
          </Link>

          {/* Hamburger menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-gray-900 hover:bg-blue-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/api-docs"
                  className="text-gray-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-200"
                >
                  Docs
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block text-gray-300 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium hover:bg-blue-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/api-docs"
                    className="block text-gray-300 hover:text-gray-900  px-3 py-2 rounded-md text-base font-medium hover:bg-blue-200"
                  >
                    Docs
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-gray-300 hover:text-gray-900  px-3 py-2 rounded-md text-base font-medium hover:bg-blue-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-gray-300 hover:text-gray-900 hover:bg-blue-500 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-white bg-blue-500  px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar