import Link from "next/link";
import { FileText, Home, MessageSquare, Phone, User } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-sky-600" />
          <span className="text-xl font-semibold">ComplaintCare</span>
        </div>
      </div>
      <nav className="mt-6">
        <Link href="/dashboard" className="flex items-center px-6 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
          <Home className="h-5 w-5 mr-3" />
          Home
        </Link>
        <Link href="/dashboard/profile" className="flex items-center px-6 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
          <User className="h-5 w-5 mr-3" />
          Profile
        </Link>
        <Link href="/dashboard/mycomplaints" className="flex items-center px-6 py-3 text-sky-600 bg-sky-50">
          <MessageSquare className="h-5 w-5 mr-3" />
          My Complaints
        </Link>
        <Link href="/contact" className="flex items-center px-6 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
          <Phone className="h-5 w-5 mr-3" />
          Contact Us
        </Link>
      </nav>
    </aside>
  );
}
