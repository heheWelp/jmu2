"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  User, 
  FileText, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Image from "next/image";

const ActivityLogPage = () => {
  const [dateRange, setDateRange] = useState<string>("last7days");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [userFilter, setUserFilter] = useState<string[]>([]);
  const [actionFilter, setActionFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  
  // Sample activity log data
  const activityLogs = [
    { 
      id: '1', 
      user: { name: 'John Doe', avatar: 'https://picsum.photos/id/1/40/40', role: 'Admin' }, 
      action: 'Content Update', 
      description: 'Updated JavaScript course content', 
      timestamp: '2023-06-15T10:30:00Z', 
      status: 'success',
      details: {
        itemId: 'course-123',
        itemName: 'JavaScript Fundamentals',
        changes: [
          { field: 'title', from: 'JS Fundamentals', to: 'JavaScript Fundamentals' },
          { field: 'description', from: 'Learn JS basics', to: 'Comprehensive JavaScript fundamentals course' }
        ],
        metadata: {
          ip: '192.168.1.1',
          browser: 'Chrome 98.0.4758.102',
          device: 'Desktop'
        }
      }
    },
    { 
      id: '2', 
      user: { name: 'Jane Smith', avatar: 'https://picsum.photos/id/2/40/40', role: 'Instructor' }, 
      action: 'User Login', 
      description: 'Logged in from new device', 
      timestamp: '2023-06-15T09:45:00Z', 
      status: 'warning',
      details: {
        itemId: 'user-456',
        itemName: 'Jane Smith',
        metadata: {
          ip: '192.168.1.2',
          browser: 'Firefox 97.0',
          device: 'Mobile',
          location: 'New York, USA'
        }
      }
    },
    { 
      id: '3', 
      user: { name: 'Robert Johnson', avatar: 'https://picsum.photos/id/3/40/40', role: 'Provider' }, 
      action: 'Content Creation', 
      description: 'Created new React course', 
      timestamp: '2023-06-14T14:20:00Z', 
      status: 'success',
      details: {
        itemId: 'course-789',
        itemName: 'React for Beginners',
        metadata: {
          ip: '192.168.1.3',
          browser: 'Safari 15.4',
          device: 'Desktop'
        }
      }
    },
    { 
      id: '4', 
      user: { name: 'Emily Davis', avatar: 'https://picsum.photos/id/4/40/40', role: 'Admin' }, 
      action: 'System Update', 
      description: 'Updated system settings', 
      timestamp: '2023-06-14T11:15:00Z', 
      status: 'success',
      details: {
        itemId: 'system-settings',
        itemName: 'System Settings',
        changes: [
          { field: 'maintenance_mode', from: 'false', to: 'true' },
          { field: 'maintenance_message', from: '', to: 'System under maintenance for upgrades' }
        ],
        metadata: {
          ip: '192.168.1.4',
          browser: 'Chrome 98.0.4758.102',
          device: 'Desktop'
        }
      }
    },
    { 
      id: '5', 
      user: { name: 'Michael Wilson', avatar: 'https://picsum.photos/id/5/40/40', role: 'Student' }, 
      action: 'Enrollment', 
      description: 'Enrolled in JavaScript course', 
      timestamp: '2023-06-13T16:50:00Z', 
      status: 'success',
      details: {
        itemId: 'enrollment-321',
        itemName: 'JavaScript Fundamentals Enrollment',
        metadata: {
          ip: '192.168.1.5',
          browser: 'Edge 99.0.1150.30',
          device: 'Tablet'
        }
      }
    },
    { 
      id: '6', 
      user: { name: 'Sarah Brown', avatar: 'https://picsum.photos/id/6/40/40', role: 'Instructor' }, 
      action: 'Content Update', 
      description: 'Failed to update Python course content', 
      timestamp: '2023-06-13T13:25:00Z', 
      status: 'error',
      details: {
        itemId: 'course-456',
        itemName: 'Python Programming',
        error: 'Database connection timeout',
        metadata: {
          ip: '192.168.1.6',
          browser: 'Chrome 98.0.4758.102',
          device: 'Desktop'
        }
      }
    },
  ];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  // Get status icon based on status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get action icon based on action
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Content Update':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'User Login':
        return <User className="h-5 w-5 text-purple-500" />;
      case 'Content Creation':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'System Update':
        return <Settings className="h-5 w-5 text-orange-500" />;
      case 'Enrollment':
        return <CheckCircle className="h-5 w-5 text-teal-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Toggle filter for user, action, or status
  const toggleFilter = (type: string, value: string) => {
    switch (type) {
      case 'user':
        setUserFilter(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value) 
            : [...prev, value]
        );
        break;
      case 'action':
        setActionFilter(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value) 
            : [...prev, value]
        );
        break;
      case 'status':
        setStatusFilter(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value) 
            : [...prev, value]
        );
        break;
    }
  };
  
  // Filter logs based on selected filters
  const filteredLogs = activityLogs.filter(log => {
    const userMatch = userFilter.length === 0 || userFilter.includes(log.user.name);
    const actionMatch = actionFilter.length === 0 || actionFilter.includes(log.action);
    const statusMatch = statusFilter.length === 0 || statusFilter.includes(log.status);
    return userMatch && actionMatch && statusMatch;
  });
  
  // Get unique users, actions, and statuses for filters
  const uniqueUsers = Array.from(new Set(activityLogs.map(log => log.user.name)));
  const uniqueActions = Array.from(new Set(activityLogs.map(log => log.action)));
  const uniqueStatuses = Array.from(new Set(activityLogs.map(log => log.status)));
  
  return (
    <AdminLayout 
      title="Activity Log" 
      description="Track all system activities and user actions"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Activity Log", href: "/activity-log" }
      ]}
    >
      <div className="flex flex-col h-full">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search activity logs..."
                className="py-2 pl-10 pr-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  className="flex items-center gap-2 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50"
                  onClick={() => setFilterOpen(!filterOpen)}
                  aria-expanded={filterOpen}
                  aria-controls="filter-panel"
                >
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span>Filter</span>
                  {filterOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                
                {filterOpen && (
                  <div 
                    id="filter-panel"
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                  >
                    <div className="p-3 border-b border-gray-200">
                      <h4 className="font-medium">Filter By</h4>
                    </div>
                    
                    <div className="p-3 border-b border-gray-200">
                      <h5 className="text-sm font-medium mb-2">User</h5>
                      <div className="space-y-1">
                        {uniqueUsers.map(user => (
                          <div key={user} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`user-${user}`}
                              checked={userFilter.includes(user)}
                              onChange={() => toggleFilter('user', user)}
                              className="h-4 w-4 text-[#2563EB] rounded border-gray-300 focus:ring-[#2563EB]"
                            />
                            <label htmlFor={`user-${user}`} className="ml-2 text-sm text-gray-700">
                              {user}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 border-b border-gray-200">
                      <h5 className="text-sm font-medium mb-2">Action</h5>
                      <div className="space-y-1">
                        {uniqueActions.map(action => (
                          <div key={action} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`action-${action}`}
                              checked={actionFilter.includes(action)}
                              onChange={() => toggleFilter('action', action)}
                              className="h-4 w-4 text-[#2563EB] rounded border-gray-300 focus:ring-[#2563EB]"
                            />
                            <label htmlFor={`action-${action}`} className="ml-2 text-sm text-gray-700">
                              {action}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <h5 className="text-sm font-medium mb-2">Status</h5>
                      <div className="space-y-1">
                        {uniqueStatuses.map(status => (
                          <div key={status} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`status-${status}`}
                              checked={statusFilter.includes(status)}
                              onChange={() => toggleFilter('status', status)}
                              className="h-4 w-4 text-[#2563EB] rounded border-gray-300 focus:ring-[#2563EB]"
                            />
                            <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700 capitalize">
                              {status}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  aria-label="Select date range"
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              <button
                className="flex items-center gap-2 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50"
                aria-label="Download logs"
              >
                <Download className="h-4 w-4 text-gray-500" />
                <span className="hidden md:inline">Export</span>
              </button>
              
              <button
                className="flex items-center gap-2 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50"
                aria-label="Refresh logs"
              >
                <RefreshCw className="h-4 w-4 text-gray-500" />
                <span className="hidden md:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Activity Log Table */}
        <div className="bg-white rounded-lg shadow-sm flex-1 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map(log => (
                  <tr 
                    key={log.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${selectedLog === log.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            src={log.user.avatar}
                            alt={log.user.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{log.user.name}</div>
                          <div className="text-sm text-gray-500">{log.user.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getActionIcon(log.action)}
                        <span className="ml-2 text-sm text-gray-900">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{log.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(log.timestamp)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(log.status)}
                        <span className={`ml-2 text-sm capitalize ${
                          log.status === 'success' ? 'text-green-800' :
                          log.status === 'warning' ? 'text-yellow-800' :
                          log.status === 'error' ? 'text-red-800' :
                          'text-gray-800'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Log Details (Conditional) */}
          {selectedLog && (
            <div className="border-t border-gray-200 p-4">
              <h4 className="font-medium mb-2">Log Details</h4>
              {(() => {
                const log = activityLogs.find(l => l.id === selectedLog);
                if (!log) return null;
                
                return (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Item Information</h5>
                        <div className="bg-white rounded-md p-3 border border-gray-200">
                          <p className="text-sm"><span className="font-medium">ID:</span> {log.details.itemId}</p>
                          <p className="text-sm"><span className="font-medium">Name:</span> {log.details.itemName}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Metadata</h5>
                        <div className="bg-white rounded-md p-3 border border-gray-200">
                          <p className="text-sm"><span className="font-medium">IP:</span> {log.details.metadata.ip}</p>
                          <p className="text-sm"><span className="font-medium">Browser:</span> {log.details.metadata.browser}</p>
                          <p className="text-sm"><span className="font-medium">Device:</span> {log.details.metadata.device}</p>
                          {log.details.metadata.location && (
                            <p className="text-sm"><span className="font-medium">Location:</span> {log.details.metadata.location}</p>
                          )}
                        </div>
                      </div>
                      
                      {log.details.changes && (
                        <div className="md:col-span-2">
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Changes</h5>
                          <div className="bg-white rounded-md p-3 border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead>
                                <tr>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {log.details.changes.map((change, index) => (
                                  <tr key={index}>
                                    <td className="px-3 py-2 text-sm text-gray-900">{change.field}</td>
                                    <td className="px-3 py-2 text-sm text-gray-500">{change.from}</td>
                                    <td className="px-3 py-2 text-sm text-gray-900">{change.to}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {log.details.error && (
                        <div className="md:col-span-2">
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Error</h5>
                          <div className="bg-white rounded-md p-3 border border-red-200 text-red-800">
                            {log.details.error}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ActivityLogPage; 