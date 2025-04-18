'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
  
      if (formData.role !== 'admin') {
        delete payload.adminSecret
      }
  
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
        // Save token to localStorage
        localStorage.setItem('token', data.token)
  
        // Redirect based on role
        const role = data.data?.role
        if (role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/dashboard')
        }
      } else {
        console.error('Registration failed:', data)
      }
    } catch (error) {
      console.error('Error registering user:', error)
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

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
  )
}
