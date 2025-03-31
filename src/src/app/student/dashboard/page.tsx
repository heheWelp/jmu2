import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  Award, 
  Calendar,
  Clock,
  Search,
  Upload,
  Eye
} from 'lucide-react'

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Learning Progress Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Learning Progress</h2>
            <LayoutDashboard className="text-amber-600" size={24} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Enrolled Courses</span>
              <span className="text-xl font-bold">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed Courses</span>
              <span className="text-xl font-bold">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Assignments</span>
              <span className="text-xl font-bold text-amber-600">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Grade</span>
              <span className="text-xl font-bold">B+</span>
            </div>
          </div>
        </div>
        
        {/* Upcoming Deadlines Card */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Deadlines</h2>
            <Clock className="text-amber-600" size={24} />
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-md border-l-4 border-amber-500">
              <div className="flex justify-between">
                <p className="font-medium">JavaScript Assignment</p>
                <p className="text-sm text-red-600 font-medium">Due Tomorrow</p>
              </div>
              <p className="text-sm text-gray-600">Web Development Fundamentals</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md border-l-4 border-amber-500">
              <div className="flex justify-between">
                <p className="font-medium">Database Quiz</p>
                <p className="text-sm text-amber-600 font-medium">Due in 3 days</p>
              </div>
              <p className="text-sm text-gray-600">Database Design</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md border-l-4 border-amber-500">
              <div className="flex justify-between">
                <p className="font-medium">Final Project Proposal</p>
                <p className="text-sm text-amber-600 font-medium">Due in 5 days</p>
              </div>
              <p className="text-sm text-gray-600">UI/UX Design Principles</p>
            </div>
          </div>
        </div>
        
        {/* Weekly Calendar Card */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">This Week</h2>
            <Calendar className="text-amber-600" size={24} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-8 text-center text-xs font-medium text-gray-500">Mon</div>
              <div className="ml-2 flex-1 p-2 bg-amber-50 rounded text-xs">
                <p className="font-medium">Web Dev Class</p>
                <p className="text-gray-500">10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 text-center text-xs font-medium text-gray-500">Tue</div>
              <div className="ml-2 flex-1 p-2 bg-amber-50 rounded text-xs">
                <p className="font-medium">Study Group</p>
                <p className="text-gray-500">2:00 PM</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 text-center text-xs font-medium text-gray-500">Wed</div>
              <div className="ml-2 flex-1 p-2 bg-amber-50 rounded text-xs">
                <p className="font-medium">Database Class</p>
                <p className="text-gray-500">11:00 AM</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 text-center text-xs font-medium text-gray-500">Thu</div>
              <div className="ml-2 flex-1 p-2 bg-amber-50 rounded text-xs">
                <p className="font-medium">UI/UX Workshop</p>
                <p className="text-gray-500">3:30 PM</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 text-center text-xs font-medium text-gray-500">Fri</div>
              <div className="ml-2 flex-1 p-2 bg-amber-50 rounded text-xs">
                <p className="font-medium">Office Hours</p>
                <p className="text-gray-500">1:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Enrollment Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">My Courses</h2>
          <BookOpen className="text-amber-600" size={24} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Course Name</th>
                <th className="px-6 py-3">Instructor</th>
                <th className="px-6 py-3">Progress</th>
                <th className="px-6 py-3">Grade</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Web Development Fundamentals</td>
                <td className="px-6 py-4">Dr. John Smith</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">75% Complete</span>
                </td>
                <td className="px-6 py-4">A-</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Database Design</td>
                <td className="px-6 py-4">Prof. Sarah Johnson</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">60% Complete</span>
                </td>
                <td className="px-6 py-4">B+</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">UI/UX Design Principles</td>
                <td className="px-6 py-4">Dr. Michael Brown</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">30% Complete</span>
                </td>
                <td className="px-6 py-4">B</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">JavaScript Advanced Concepts</td>
                <td className="px-6 py-4">Prof. Emily Davis</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">15% Complete</span>
                </td>
                <td className="px-6 py-4">--</td>
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
        <button className="flex items-center justify-center gap-2 p-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
          <Search size={20} />
          <span>Browse Courses</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
          <Upload size={20} />
          <span>Submit Assignment</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
          <Eye size={20} />
          <span>View Grades</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
          <Calendar size={20} />
          <span>Calendar</span>
        </button>
      </div>
    </div>
  )
} 