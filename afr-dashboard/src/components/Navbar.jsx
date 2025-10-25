import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-afrGreen">Afrimash</div>
          <div className="text-sm text-gray-600">Customer Intelligence Dashboard</div>
        </div>

        <div className="flex items-center gap-3">
          <select className="border rounded-md px-3 py-1 text-sm bg-white">
            <option>All Regions</option>
            <option>Ogun</option>
            <option>Kano</option>
          </select>

          <select className="border rounded-md px-3 py-1 text-sm bg-white">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>

          <button className="flex items-center gap-2 px-3 py-1 border rounded-md bg-white">
            <FaUserCircle className="text-gray-600" />
            <span className="text-sm">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
