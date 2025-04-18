'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:5000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      console.log('Response:', data)

      if (data.success) {
        localStorage.setItem('token', data.token)

        const role = data.data.role
        if (role === 'admin') {
          router.push('/admin')
        } else if (role === 'citizen') {
          router.push('/dashboard')
        } else {
          console.warn('Unknown role:', role)
        }
      } else {
        console.error('Login failed:', data)
      }
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 font-semibold text-gray-700">Password</label>
        <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          Login
        </button>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account?</span>
          <button
            type="button"
            onClick={() => router.push('/register')}
            className="ml-2 text-purple-700 hover:underline font-medium"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}
