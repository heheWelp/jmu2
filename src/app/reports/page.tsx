"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { 
  BarChart2, 
  PieChart, 
  LineChart, 
  Calendar, 
  Download, 
  Maximize2, 
  Minimize2,
  Move,
  Plus
} from "lucide-react";

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('month');
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  
  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
  };
  
  const toggleWidgetExpansion = (widgetId: string) => {
    setExpandedWidget(expandedWidget === widgetId ? null : widgetId);
  };
  
  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    // Implementation would go here
  };
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-gray-600">Data visualization and analytics reporting</p>
      </div>
      
      {/* Date Range Selector */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium">Date Range:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['day', 'week', 'month', 'quarter', 'year'].map(range => (
              <button
                key={range}
                className={`px-3 py-1 text-sm rounded-md ${
                  dateRange === range 
                    ? 'bg-[#2563EB] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleDateRangeChange(range)}
                aria-pressed={dateRange === range}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="date"
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            />
            <span className="text-sm">to</span>
            <input
              type="date"
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            />
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
              Apply
            </button>
          </div>
        </div>
      </div>
      
      {/* Widgets Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${expandedWidget ? '1' : '2'} gap-6`}>
        {/* User Activity Widget */}
        <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${expandedWidget === 'user-activity' ? 'col-span-full' : ''}`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <LineChart className="h-5 w-5 text-[#2563EB] mr-2" />
              <h3 className="font-medium">User Activity</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="p-1 rounded-md hover:bg-gray-100"
                onClick={() => handleExport('csv')}
                aria-label="Export as CSV"
              >
                <Download className="h-4 w-4 text-gray-500" />
              </button>
              <button 
                className="p-1 rounded-md hover:bg-gray-100"
                onClick={() => toggleWidgetExpansion('user-activity')}
                aria-label={expandedWidget === 'user-activity' ? 'Minimize' : 'Maximize'}
              >
                {expandedWidget === 'user-activity' ? (
                  <Minimize2 className="h-4 w-4 text-gray-500" />
                ) : (
                  <Maximize2 className="h-4 w-4 text-gray-500" />
                )}
              </button>
              <button 
                className="p-1 rounded-md hover:bg-gray-100 cursor-move"
                aria-label="Move widget"
              >
                <Move className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className={`p-4 ${expandedWidget === 'user-activity' ? 'h-96' : 'h-64'}`}>
            <div className="h-full bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">User activity chart will appear here</p>
            </div>
          </div>
        </div>
        
        {/* Content Engagement Widget */}
        <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${expandedWidget === 'content-engagement' ? 'col-span-full' : ''}`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <BarChart2 className="h-5 w-5 text-[#22C55E] mr-2" />
              <h3 className="font-medium">Content Engagement</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="p-1 rounded-md hover:bg-gray-100"
                onClick={() => handleExport('csv')}
                aria-label="Export as CSV"
              >
                <Download className="h-4 w-4 text-gray-500" />
              </button>
              <button 
                className="p-1 rounded-md hover:bg-gray-100"
                onClick={() => toggleWidgetExpansion('content-engagement')}
                aria-label={expandedWidget === 'content-engagement' ? 'Minimize' : 'Maximize'}
              >
                {expandedWidget === 'content-engagement' ? (
                  <Minimize2 className="h-4 w-4 text-gray-500" />
                ) : (
                  <Maximize2 className="h-4 w-4 text-gray-500" />
                )}
              </button>
              <button 
                className="p-1 rounded-md hover:bg-gray-100 cursor-move"
                aria-label="Move widget"
              >
                <Move className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className={`p-4 ${expandedWidget === 'content-engagement' ? 'h-96' : 'h-64'}`}>
            <div className="h-full bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Content engagement chart will appear here</p>
            </div>
          </div>
        </div>
        
        {/* User Distribution Widget */}
        <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${expandedWidget === 'user-distribution' ? 'col-span-full' : ''}`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <PieChart className="h-5 w-5 text-[#7C3AED] mr-2" />
              <h3 className="font-medium">User Distribution</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="p-1 rounded-md hover:bg-gray-100"
                onClick={() => handleExport('csv')}
                aria-label="Export as CSV"
              >
                <Download className="h-4 w-4 text-gray-500" />
              </button>
              <button 
                className="p-1 rounded-md hover:bg-gray-100"
                onClick={() => toggleWidgetExpansion('user-distribution')}
                aria-label={expandedWidget === 'user-distribution' ? 'Minimize' : 'Maximize'}
              >
                {expandedWidget === 'user-distribution' ? (
                  <Minimize2 className="h-4 w-4 text-gray-500" />
                ) : (
                  <Maximize2 className="h-4 w-4 text-gray-500" />
                )}
              </button>
              <button 
                className="p-1 rounded-md hover:bg-gray-100 cursor-move"
                aria-label="Move widget"
              >
                <Move className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className={`p-4 ${expandedWidget === 'user-distribution' ? 'h-96' : 'h-64'}`}>
            <div className="h-full bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">User distribution chart will appear here</p>
            </div>
          </div>
        </div>
        
        {/* Add Widget Button */}
        <div className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center h-64">
          <button className="flex flex-col items-center text-gray-500 hover:text-[#2563EB]">
            <Plus className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">Add Widget</span>
          </button>
        </div>
      </div>
      
      {/* Report Templates */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Report Templates</h2>
          <button className="flex items-center text-sm text-[#2563EB] hover:underline">
            <Plus className="h-4 w-4 mr-1" />
            Create Template
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['User Activity Report', 'Content Engagement Report', 'System Performance Report'].map((template, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium mb-2">{template}</h3>
              <p className="text-sm text-gray-500 mb-4">Last generated: 3 days ago</p>
              <div className="flex justify-between">
                <button className="text-sm text-[#2563EB] hover:underline">
                  Generate
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage; 