"use client";

import { Server, Users, FileText, Activity } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
    </div>
  );
};

export default function Overview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="System Status"
        value="Operational"
        icon={<Server className="h-6 w-6 text-white" />}
        color="bg-[#2563EB]"
      />
      <StatCard
        title="Total Users"
        value="1,234"
        icon={<Users className="h-6 w-6 text-white" />}
        color="bg-[#22C55E]"
      />
      <StatCard
        title="Content Items"
        value="567"
        icon={<FileText className="h-6 w-6 text-white" />}
        color="bg-[#7C3AED]"
      />
      <StatCard
        title="Active Courses"
        value="42"
        icon={<Activity className="h-6 w-6 text-white" />}
        color="bg-[#2563EB]"
      />
      <StatCard
        title="New Enrollments"
        value="89"
        icon={<Users className="h-6 w-6 text-white" />}
        color="bg-[#22C55E]"
      />
      <StatCard
        title="System Uptime"
        value="99.9%"
        icon={<Server className="h-6 w-6 text-white" />}
        color="bg-[#7C3AED]"
      />
    </div>
  );
} 