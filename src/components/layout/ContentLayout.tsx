"use client";

import { ReactNode, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  ChevronLeft, 
  ChevronRight, 
  Edit, 
  Eye, 
  Save, 
  Trash, 
  Copy, 
  Plus,
  MoreVertical
} from "lucide-react";

interface ContentLayoutProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false);
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');

  const toggleNavigation = () => {
    setIsNavigationCollapsed(!isNavigationCollapsed);
  };

  const togglePreview = () => {
    setIsPreviewCollapsed(!isPreviewCollapsed);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-md hover:bg-gray-200 transition-colors"
              onClick={() => setActiveTab('edit')}
              aria-label="Edit mode"
              aria-pressed={activeTab === 'edit'}
            >
              <Edit className={`h-5 w-5 ${activeTab === 'edit' ? 'text-[#2563EB]' : 'text-gray-600'}`} />
            </button>
            <button 
              className="p-2 rounded-md hover:bg-gray-200 transition-colors"
              onClick={() => setActiveTab('preview')}
              aria-label="Preview mode"
              aria-pressed={activeTab === 'preview'}
            >
              <Eye className={`h-5 w-5 ${activeTab === 'preview' ? 'text-[#2563EB]' : 'text-gray-600'}`} />
            </button>
            <div className="h-6 border-r border-gray-300 mx-1"></div>
            <button 
              className="p-2 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Save"
            >
              <Save className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              className="p-2 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Delete"
            >
              <Trash className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              className="p-2 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Duplicate"
            >
              <Copy className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <select 
              className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              aria-label="Content status"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            
            <button 
              className="p-2 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="More options"
            >
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Navigation Panel */}
          <div 
            className={`border-r border-gray-200 transition-all duration-300 ${
              isNavigationCollapsed ? 'w-0 overflow-hidden' : 'w-64'
            } ${activeTab === 'preview' && 'hidden md:block'}`}
          >
            <div className="h-full flex flex-col">
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-medium">Navigation</h3>
                <button 
                  onClick={toggleNavigation}
                  className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                  aria-label="Collapse navigation panel"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                {/* Navigation content would go here */}
                <div className="space-y-2">
                  <button className="w-full flex items-center p-2 rounded-md hover:bg-gray-100 text-left">
                    <Plus className="h-4 w-4 mr-2 text-[#2563EB]" />
                    <span className="text-sm">Add New Item</span>
                  </button>
                  {/* Sample navigation items */}
                  {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
                    <div 
                      key={index}
                      className="p-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Collapsed Navigation Toggle */}
          {isNavigationCollapsed && (
            <button 
              onClick={toggleNavigation}
              className="border-r border-gray-200 p-1 hover:bg-gray-100"
              aria-label="Expand navigation panel"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          )}
          
          {/* Main Content */}
          <div className={`flex-1 ${activeTab === 'preview' && 'hidden md:block'}`}>
            <div className="h-full overflow-y-auto p-4">
              {children}
            </div>
          </div>
          
          {/* Preview Pane */}
          <div 
            className={`border-l border-gray-200 transition-all duration-300 ${
              isPreviewCollapsed ? 'w-0 overflow-hidden' : 'w-1/2'
            } ${activeTab === 'edit' && 'hidden md:block'}`}
          >
            <div className="h-full flex flex-col">
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-medium">Preview</h3>
                <button 
                  onClick={togglePreview}
                  className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                  aria-label="Collapse preview panel"
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {/* Preview content would go here */}
                <div className="bg-gray-100 rounded-md p-4 h-full flex items-center justify-center">
                  <p className="text-gray-500">Preview will appear here</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Collapsed Preview Toggle */}
          {isPreviewCollapsed && (
            <button 
              onClick={togglePreview}
              className="border-l border-gray-200 p-1 hover:bg-gray-100"
              aria-label="Expand preview panel"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
          )}
        </div>
        
        {/* Status Bar */}
        <div className="bg-gray-50 border-t border-gray-200 p-2 flex items-center justify-between text-xs text-gray-500">
          <div>
            Status: <span className="font-medium capitalize">{status}</span>
          </div>
          <div>
            Last modified: {new Date().toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* Mobile Action Button */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button 
          className="bg-[#2563EB] text-white rounded-full p-3 shadow-lg"
          aria-label="Add new item"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </AdminLayout>
  );
};

export default ContentLayout; 