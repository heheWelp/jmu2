import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  BarChart2, 
  MessageSquare, 
  Clock,
  Plus,
  CheckSquare,
  HelpCircle
} from 'lucide-react'

export default function ProviderDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Provider Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Services Overview Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Services Overview</h2>
            <BookOpen className="text-purple-600" size={24} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Services</span>
              <span className="text-xl font-bold">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Students</span>
              <span className="text-xl font-bold">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Service Requests</span>
              <span className="text-xl font-bold">23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Rating</span>
              <span className="text-xl font-bold">4.7/5</span>
            </div>
          </div>
        </div>
        
        {/* Student Activity Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Student Activity</h2>
            <Users className="text-purple-600" size={24} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Students</span>
              <span className="text-xl font-bold">142</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New Enrollments</span>
              <span className="text-xl font-bold">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Support Requests</span>
              <span className="text-xl font-bold">7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Discussion Posts</span>
              <span className="text-xl font-bold">34</span>
            </div>
          </div>
        </div>
        
        {/* Upcoming Schedule Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Schedule</h2>
            <Clock className="text-purple-600" size={24} />
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium">Career Counseling</p>
              <p className="text-sm text-gray-600">9:00 AM - 10:30 AM</p>
              <p className="text-xs text-gray-500 mt-1">Virtual Meeting</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium">Technical Support Hours</p>
              <p className="text-sm text-gray-600">1:00 PM - 3:00 PM</p>
              <p className="text-xs text-gray-500 mt-1">Help Center</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium">Resource Workshop</p>
              <p className="text-sm text-gray-600">4:00 PM - 5:30 PM</p>
              <p className="text-xs text-gray-500 mt-1">Room 105</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Management Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Service Management</h2>
          <BarChart2 className="text-purple-600" size={24} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Service Name</th>
                <th className="px-6 py-3">Students</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last Updated</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Career Counseling</td>
                <td className="px-6 py-4">42</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </td>
                <td className="px-6 py-4">Today</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">Manage</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Technical Support</td>
                <td className="px-6 py-4">38</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </td>
                <td className="px-6 py-4">Yesterday</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">Manage</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Resource Library</td>
                <td className="px-6 py-4">56</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </td>
                <td className="px-6 py-4">2 days ago</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">Manage</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Study Group Facilitation</td>
                <td className="px-6 py-4">24</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
                </td>
                <td className="px-6 py-4">3 days ago</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">Manage</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Tutoring Services</td>
                <td className="px-6 py-4">32</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </td>
                <td className="px-6 py-4">1 week ago</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">Manage</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="flex items-center justify-center gap-2 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Plus size={20} />
          <span>Create Service</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <HelpCircle size={20} />
          <span>Respond to Requests</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <MessageSquare size={20} />
          <span>Message Students</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <CheckSquare size={20} />
          <span>Update Profile</span>
        </button>
      </div>
    </div>
  )
} 