'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'citizen',
    phone: '',
    adminSecret: '',
  })

  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const payload = { ...formData }
      if (formData.role !== 'admin') delete payload.adminSecret

      const res = await fetch('http://localhost:5000/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      console.log('Register response:', data)

      if (data.success) {
        localStorage.setItem('token', data.token)
        const role = data.data?.role
        router.push(role === 'admin' ? '/admin' : '/dashboard')
      } else {
        console.error('Registration failed:', data)
        alert(data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Error registering user:', error)
      alert('Something went wrong')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
        
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/2847/2847697.png" // Replace with relevant image
            alt="Register Illustration"
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-semibold">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />

            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />

            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />

            <label className="block mb-2 font-semibold">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />

            <label className="block mb-2 font-semibold">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
            </select>

            {formData.role === 'admin' && (
              <>
                <label className="block mb-2 font-semibold">Admin Secret</label>
                <input
                  name="adminSecret"
                  value={formData.adminSecret}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  required
                />
              </>
            )}

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-700 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
