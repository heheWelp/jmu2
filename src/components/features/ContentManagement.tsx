"use client";

import { BookOpen, FileText, CheckSquare, Video } from "lucide-react";

interface ContentStatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const ContentStatCard = ({ title, value, icon, color }: ContentStatCardProps) => {
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

export default function ContentManagement() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Content Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContentStatCard
          title="Courses"
          value="42"
          icon={<BookOpen className="h-5 w-5 text-white" />}
          color="bg-[#2563EB]"
        />
        <ContentStatCard
          title="Learning Materials"
          value="256"
          icon={<FileText className="h-5 w-5 text-white" />}
          color="bg-[#22C55E]"
        />
        <ContentStatCard
          title="Assessments"
          value="128"
          icon={<CheckSquare className="h-5 w-5 text-white" />}
          color="bg-[#7C3AED]"
        />
        <ContentStatCard
          title="Video Content"
          value="64"
          icon={<Video className="h-5 w-5 text-white" />}
          color="bg-[#F59E0B]"
        />
      </div>
    </div>
  );
} 