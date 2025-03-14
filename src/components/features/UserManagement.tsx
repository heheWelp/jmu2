"use client";

import { Users, UserCheck, UserCog, GraduationCap } from "lucide-react";

interface UserStatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const UserStatCard = ({ title, value, icon, color }: UserStatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <h3 className="ml-3 text-lg font-medium">{title}</h3>
      </div>
      <p className="mt-4 text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default function UserManagement() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <UserStatCard
          title="Admins"
          value="12"
          icon={<UserCog className="h-5 w-5 text-white" />}
          color="bg-[#2563EB]"
        />
        <UserStatCard
          title="Instructors"
          value="48"
          icon={<UserCheck className="h-5 w-5 text-white" />}
          color="bg-[#22C55E]"
        />
        <UserStatCard
          title="Providers"
          value="36"
          icon={<Users className="h-5 w-5 text-white" />}
          color="bg-[#7C3AED]"
        />
        <UserStatCard
          title="Students"
          value="1,138"
          icon={<GraduationCap className="h-5 w-5 text-white" />}
          color="bg-[#F59E0B]"
        />
      </div>
    </div>
  );
} 