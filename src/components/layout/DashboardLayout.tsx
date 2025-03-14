"use client";

import { ReactNode, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { RefreshCw, Download, MoreHorizontal } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    // Implementation would go here
  };

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <AdminLayout>
      <div className="mb-4 flex flex-col space-y-4">
        {/* Quick Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleRefresh}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Refresh dashboard"
            >
              <RefreshCw className={`h-5 w-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            
            <div className="relative group">
              <button 
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Export options"
              >
                <Download className="h-5 w-5 text-gray-600" />
              </button>
              
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 hidden group-hover:block">
                <button 
                  onClick={() => handleExport('pdf')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as PDF
                </button>
                <button 
                  onClick={() => handleExport('csv')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as CSV
                </button>
                <button 
                  onClick={() => handleExport('excel')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as Excel
                </button>
              </div>
            </div>
            
            <div className="relative group">
              <button 
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="More options"
              >
                <MoreHorizontal className="h-5 w-5 text-gray-600" />
              </button>
              
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 hidden group-hover:block">
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Customize Dashboard
                </button>
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Save Layout
                </button>
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
      
      {/* Widgets Container */}
      <div className="widgets-container space-y-6">
        {children}
      </div>
    </AdminLayout>
  );
};

export default DashboardLayout; 