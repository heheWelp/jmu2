"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart2, 
  MessageSquare, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active 
          ? "bg-primary-600 text-white" 
          : "text-gray-100 hover:bg-primary-700/20"
      }`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={`bg-[#1F2937] text-white h-screen transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-[240px]"
      } flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <h1 className="text-xl font-bold">JMU Admin</h1>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {!collapsed ? (
          <>
            <SidebarItem 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              href="/dashboard" 
              active 
            />
            <SidebarItem 
              icon={<Users size={20} />} 
              label="Manage Users" 
              href="/manage-users" 
            />
            <SidebarItem 
              icon={<FileText size={20} />} 
              label="Manage Content" 
              href="/manage-content" 
            />
            <SidebarItem 
              icon={<BarChart2 size={20} />} 
              label="Reports" 
              href="/reports" 
            />
            <SidebarItem 
              icon={<MessageSquare size={20} />} 
              label="Tag & Talk" 
              href="/tag-talk" 
            />
            <SidebarItem 
              icon={<Settings size={20} />} 
              label="Settings" 
              href="/settings" 
            />
          </>
        ) : (
          <>
            <div className="flex justify-center py-3">
              <Link href="/dashboard" className="p-2 rounded-lg hover:bg-primary-700/20 transition-colors">
                <LayoutDashboard size={24} />
              </Link>
            </div>
            <div className="flex justify-center py-3">
              <Link href="/manage-users" className="p-2 rounded-lg hover:bg-primary-700/20 transition-colors">
                <Users size={24} />
              </Link>
            </div>
            <div className="flex justify-center py-3">
              <Link href="/manage-content" className="p-2 rounded-lg hover:bg-primary-700/20 transition-colors">
                <FileText size={24} />
              </Link>
            </div>
            <div className="flex justify-center py-3">
              <Link href="/reports" className="p-2 rounded-lg hover:bg-primary-700/20 transition-colors">
                <BarChart2 size={24} />
              </Link>
            </div>
            <div className="flex justify-center py-3">
              <Link href="/tag-talk" className="p-2 rounded-lg hover:bg-primary-700/20 transition-colors">
                <MessageSquare size={24} />
              </Link>
            </div>
            <div className="flex justify-center py-3">
              <Link href="/settings" className="p-2 rounded-lg hover:bg-primary-700/20 transition-colors">
                <Settings size={24} />
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
} 