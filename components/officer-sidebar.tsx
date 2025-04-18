"use client"

import Link from "next/link"
import { Contact2, Home, User, Users2 } from "lucide-react"

export function OfficerSidebar() {
  return (
    <aside className="w-64 bg-white">
        <div className="p-6">
          <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-sky-500 flex items-center justify-center text-white font-bold">O</div>
            <span className="text-xl font-semibold">Officer Panel</span>
          </div>
        </div>
        <nav className="mt-6">
          <Link href="/officer" className="flex items-center px-6 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
            <Home className="h-5 w-5 mr-3" />
            Home
          </Link>
          <Link href="/officer/profile" className="flex items-center px-6 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
            <User className="h-5 w-5 mr-3" />
            Profile
          </Link>
          <Link href="/officer" className="flex items-center px-6 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
            <Users2 className="h-5 w-5 mr-3" />
            User Dashboard
          </Link>
          <Link href="/contact" className="flex items-center px-6 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
            <Contact2 className="h-5 w-5 mr-3" />
            Contact Us
          </Link>
        </nav>
      </aside>
  )
}
