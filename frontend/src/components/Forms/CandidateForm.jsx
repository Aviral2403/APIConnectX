/* eslint-disable react/prop-types */
import { useState } from 'react'
import { addCandidate } from '../../services/api'
import toast from 'react-hot-toast'

function CandidateForm({ onCandidateAdded }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await addCandidate(formData)
      setFormData({ first_name: '', last_name: '', email: '' })
      toast.success('Candidate added successfully')
      onCandidateAdded()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add candidate')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 bg-blue-50"
          required
          placeholder='John'
        />
      </div>

      <div>
        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 bg-blue-50"
          required
          placeholder='Doe'
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 bg-blue-50"
          required
          placeholder='JohnDoe@gmail.com'
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Adding...' : 'Add Candidate'}
      </button>
    </form>
  )
}

export default CandidateForm
