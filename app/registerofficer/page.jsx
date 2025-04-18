'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categories = [
  'Sanitation Officer',
  'Water Department Officer',
  'Electricity Department Officer',
  'Traffic Police',
  'Police Officer',
  'HR Officer',
  'Legal Officer',
  'Anti-Corruption Officer',
  'Consumer Rights Officer',
  'Telecom Officer',
]

export default function RegisterOfficer() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    badgeId: '',
    category: '',
    phone: '',
  })
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:5000/api/v1/officer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      console.log('Register response:', data)

      if (data.success) {
        localStorage.setItem('token', data.token)
        alert('Officer registered successfully!')
        router.push('/officer')
      } else {
        alert(data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl p-8 md:p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">Register Officer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Badge ID', name: 'badgeId', type: 'text' },
            { label: 'Phone', name: 'phone', type: 'text' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1 font-semibold text-gray-700">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold text-gray-700">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded-xl transition duration-300"
        >
          Register
        </button>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Already have an account?</span>
          <button
            type="button"
            onClick={() => router.push('/loginofficer')}
            className="ml-2 text-purple-700 hover:underline font-semibold"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
