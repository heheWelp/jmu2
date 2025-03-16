import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  BarChart2, 
  MessageSquare, 
  Clock,
  Plus,
  CheckSquare,
  AlertTriangle
} from 'lucide-react'

export default function InstructorDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Course Overview Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Course Overview</h2>
            <BookOpen className="text-green-600" size={24} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Courses</span>
              <span className="text-xl font-bold">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Students</span>
              <span className="text-xl font-bold">127</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Course Materials</span>
              <span className="text-xl font-bold">43</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Rating</span>
              <span className="text-xl font-bold">4.8/5</span>
            </div>
          </div>
        </div>
        
        {/* Student Statistics Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Student Statistics</h2>
            <Users className="text-green-600" size={24} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Students</span>
              <span className="text-xl font-bold">112</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Attendance Rate</span>
              <span className="text-xl font-bold">87%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Assignment Completion</span>
              <span className="text-xl font-bold">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">At-Risk Students</span>
              <span className="text-xl font-bold text-red-600">15</span>
            </div>
          </div>
        </div>
        
        {/* Today's Schedule Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Today's Schedule</h2>
            <Clock className="text-green-600" size={24} />
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium">Web Development</p>
              <p className="text-sm text-gray-600">10:00 AM - 11:30 AM</p>
              <p className="text-xs text-gray-500 mt-1">Room 302</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium">Office Hours</p>
              <p className="text-sm text-gray-600">1:00 PM - 3:00 PM</p>
              <p className="text-xs text-gray-500 mt-1">Online</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium">JavaScript Fundamentals</p>
              <p className="text-sm text-gray-600">3:30 PM - 5:00 PM</p>
              <p className="text-xs text-gray-500 mt-1">Room 201</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Management Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Course Management</h2>
          <BarChart2 className="text-green-600" size={24} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Course Name</th>
                <th className="px-6 py-3">Students</th>
                <th className="px-6 py-3">Progress</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Web Development Fundamentals</td>
                <td className="px-6 py-4">32</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">75% Complete</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">JavaScript Advanced Concepts</td>
                <td className="px-6 py-4">28</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">45% Complete</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">React Framework</td>
                <td className="px-6 py-4">24</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">30% Complete</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Database Design</td>
                <td className="px-6 py-4">18</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">60% Complete</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">UI/UX Design Principles</td>
                <td className="px-6 py-4">25</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">15% Complete</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">New</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="flex items-center justify-center gap-2 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Plus size={20} />
          <span>Create Assignment</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <CheckSquare size={20} />
          <span>Grade Submissions</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <MessageSquare size={20} />
          <span>Message Students</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <AlertTriangle size={20} />
          <span>At-Risk Students</span>
        </button>
      </div>
    </div>
  )
} 