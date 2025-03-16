import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart2, 
  Plus, 
  Settings 
} from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* System Overview Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">System Overview</h2>
            <LayoutDashboard className="text-blue-600" size={24} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Users</span>
              <span className="text-xl font-bold">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Courses</span>
              <span className="text-xl font-bold">45</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New Enrollments</span>
              <span className="text-xl font-bold">28</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">System Uptime</span>
              <span className="text-xl font-bold">99.9%</span>
            </div>
          </div>
        </div>
        
        {/* User Management Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
            <Users className="text-blue-600" size={24} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Admins</span>
              <span className="text-xl font-bold">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Instructors</span>
              <span className="text-xl font-bold">42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Providers</span>
              <span className="text-xl font-bold">15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Students</span>
              <span className="text-xl font-bold">1,169</span>
            </div>
          </div>
        </div>
        
        {/* Content Management Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Content Management</h2>
            <FileText className="text-blue-600" size={24} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Courses</span>
              <span className="text-xl font-bold">45</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Learning Materials</span>
              <span className="text-xl font-bold">287</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Assessments</span>
              <span className="text-xl font-bold">132</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tags</span>
              <span className="text-xl font-bold">94</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          <BarChart2 className="text-blue-600" size={24} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Resource</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">John Smith</td>
                <td className="px-6 py-4">Created</td>
                <td className="px-6 py-4">Web Development Course</td>
                <td className="px-6 py-4">2 hours ago</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Success</span>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Sarah Johnson</td>
                <td className="px-6 py-4">Updated</td>
                <td className="px-6 py-4">User Profile</td>
                <td className="px-6 py-4">3 hours ago</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Success</span>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Michael Brown</td>
                <td className="px-6 py-4">Deleted</td>
                <td className="px-6 py-4">Assignment</td>
                <td className="px-6 py-4">5 hours ago</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Success</span>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Emily Davis</td>
                <td className="px-6 py-4">Enrolled</td>
                <td className="px-6 py-4">JavaScript Course</td>
                <td className="px-6 py-4">6 hours ago</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Success</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">David Wilson</td>
                <td className="px-6 py-4">Submitted</td>
                <td className="px-6 py-4">Assignment</td>
                <td className="px-6 py-4">8 hours ago</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>Add User</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FileText size={20} />
          <span>Create Course</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <BarChart2 size={20} />
          <span>Generate Report</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Settings size={20} />
          <span>System Settings</span>
        </button>
      </div>
    </div>
  )
} 