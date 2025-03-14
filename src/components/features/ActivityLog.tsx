"use client";

import { Clock } from "lucide-react";
import Image from "next/image";

interface ActivityItem {
  id: number;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  action: string;
  target: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "https://picsum.photos/id/1/40/40",
      role: "Admin"
    },
    action: "Created",
    target: "New Course: Introduction to React",
    time: "5 minutes ago"
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatar: "https://picsum.photos/id/2/40/40",
      role: "Instructor"
    },
    action: "Updated",
    target: "Course: Advanced JavaScript",
    time: "10 minutes ago"
  },
  {
    id: 3,
    user: {
      name: "Robert Johnson",
      avatar: "https://picsum.photos/id/3/40/40",
      role: "Provider"
    },
    action: "Added",
    target: "New Learning Material: TypeScript Basics",
    time: "15 minutes ago"
  },
  {
    id: 4,
    user: {
      name: "Emily Davis",
      avatar: "https://picsum.photos/id/4/40/40",
      role: "Admin"
    },
    action: "Deleted",
    target: "User: Test Account",
    time: "20 minutes ago"
  },
  {
    id: 5,
    user: {
      name: "Michael Wilson",
      avatar: "https://picsum.photos/id/5/40/40",
      role: "Student"
    },
    action: "Enrolled",
    target: "Course: Web Development Fundamentals",
    time: "25 minutes ago"
  }
];

export default function ActivityLog() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Activity</h2>
        <button className="flex items-center text-sm text-[#2563EB] hover:underline">
          <Clock className="h-4 w-4 mr-1" />
          View All
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                Target
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{activity.user.name}</div>
                      <div className="text-sm text-gray-500">{activity.user.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity.action}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity.target}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activity.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 