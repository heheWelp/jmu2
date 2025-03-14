"use client";

import { UserPlus, BookOpen, BarChart2, Settings } from "lucide-react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}

const ActionButton = ({ icon, label, color, onClick }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white rounded-lg p-4 flex flex-col items-center justify-center h-32 transition-transform hover:scale-105`}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default function QuickActions() {
  const handleAction = (action: string) => {
    console.log(`Action clicked: ${action}`);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ActionButton
          icon={<UserPlus size={24} />}
          label="Add New User"
          color="bg-[#2563EB]"
          onClick={() => handleAction("Add New User")}
        />
        <ActionButton
          icon={<BookOpen size={24} />}
          label="Create Course"
          color="bg-[#22C55E]"
          onClick={() => handleAction("Create Course")}
        />
        <ActionButton
          icon={<BarChart2 size={24} />}
          label="Generate Reports"
          color="bg-[#7C3AED]"
          onClick={() => handleAction("Generate Reports")}
        />
        <ActionButton
          icon={<Settings size={24} />}
          label="System Settings"
          color="bg-[#1F2937]"
          onClick={() => handleAction("System Settings")}
        />
      </div>
    </div>
  );
} 