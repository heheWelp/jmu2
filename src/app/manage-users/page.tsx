import AdminLayout from "@/components/layout/AdminLayout";
import { useState } from "react";
import { 
  Search, 
  Filter, 
  UserPlus, 
  Download, 
  Trash, 
  Edit, 
  MoreHorizontal,
  ChevronDown
} from "lucide-react";
import Image from "next/image";

// This is a client component that will be used inside the page
const UserManagementClient = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  // Sample user data
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active", avatar: "https://picsum.photos/id/1/40/40" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Instructor", status: "Active", avatar: "https://picsum.photos/id/2/40/40" },
    { id: 3, name: "Robert Johnson", email: "robert.johnson@example.com", role: "Provider", status: "Inactive", avatar: "https://picsum.photos/id/3/40/40" },
    { id: 4, name: "Emily Davis", email: "emily.davis@example.com", role: "Admin", status: "Active", avatar: "https://picsum.photos/id/4/40/40" },
    { id: 5, name: "Michael Wilson", email: "michael.wilson@example.com", role: "Student", status: "Active", avatar: "https://picsum.photos/id/5/40/40" },
  ];

  const toggleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedUsers(prev => 
      prev.length === users.length 
        ? [] 
        : users.map(user => user.id)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on users:`, selectedUsers);
    // Implementation would go here
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="py-2 pl-10 pr-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={() => setFilterOpen(!filterOpen)}
              aria-expanded={filterOpen}
              aria-controls="filter-panel"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <button 
              className="flex items-center justify-center px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8]"
              aria-label="Add new user"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </button>
            
            <button 
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              aria-label="Export users"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
        
        {filterOpen && (
          <div id="filter-panel" className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="instructor">Instructor</option>
                  <option value="provider">Provider</option>
                  <option value="student">Student</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Joined</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="text-sm text-gray-600 hover:text-gray-900 mr-4">
                Reset Filters
              </button>
              <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8]">
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#2563EB] border-gray-300 rounded"
                      checked={selectedUsers.length === users.length && users.length > 0}
                      onChange={toggleSelectAll}
                      aria-label="Select all users"
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#2563EB] border-gray-300 rounded"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                      aria-label={`Select ${user.name}`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'Admin' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'Instructor' ? 'bg-green-100 text-green-800' :
                      user.role === 'Provider' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-1 rounded-md hover:bg-gray-100"
                        aria-label={`Edit ${user.name}`}
                      >
                        <Edit className="h-4 w-4 text-gray-500" />
                      </button>
                      <button 
                        className="p-1 rounded-md hover:bg-gray-100"
                        aria-label={`Delete ${user.name}`}
                      >
                        <Trash className="h-4 w-4 text-gray-500" />
                      </button>
                      <div className="relative group">
                        <button 
                          className="p-1 rounded-md hover:bg-gray-100"
                          aria-label="More options"
                        >
                          <MoreHorizontal className="h-4 w-4 text-gray-500" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 hidden group-hover:block">
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            View Profile
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Reset Password
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Disable Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {selectedUsers.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              {selectedUsers.length} {selectedUsers.length === 1 ? 'user' : 'users'} selected
            </div>
            <div className="flex space-x-2">
              <button 
                className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => handleBulkAction('export')}
              >
                Export Selected
              </button>
              <button 
                className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => handleBulkAction('delete')}
              >
                Delete Selected
              </button>
              <button 
                className="px-3 py-1 bg-[#2563EB] text-white rounded-md text-sm hover:bg-[#1d4ed8]"
                onClick={() => handleBulkAction('edit')}
              >
                Edit Selected
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">20</span> users
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// This is the actual page component
export default function ManageUsersPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-gray-600">User administration and management interface</p>
      </div>
      
      <UserManagementClient />
    </AdminLayout>
  );
} 