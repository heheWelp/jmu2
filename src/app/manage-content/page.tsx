"use client";

import ContentLayout from "@/components/layout/ContentLayout";
import { useState } from "react";
import { 
  Tag, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  Video,
  Plus
} from "lucide-react";

const ContentManagementPage = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const contentTypes = [
    { id: 'courses', label: 'Courses', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'materials', label: 'Learning Materials', icon: <FileText className="h-4 w-4" /> },
    { id: 'assessments', label: 'Assessments', icon: <CheckSquare className="h-4 w-4" /> },
    { id: 'videos', label: 'Video Content', icon: <Video className="h-4 w-4" /> }
  ];

  // Sample content items
  const contentItems = [
    { id: '1', title: 'Introduction to React', type: 'course', tags: ['Web Development', 'Frontend'], lastModified: '2023-04-15', author: 'John Doe' },
    { id: '2', title: 'JavaScript Fundamentals', type: 'course', tags: ['Web Development', 'Programming'], lastModified: '2023-04-10', author: 'Jane Smith' },
    { id: '3', title: 'CSS Grid Layout', type: 'material', tags: ['Web Development', 'CSS'], lastModified: '2023-04-05', author: 'Robert Johnson' },
    { id: '4', title: 'TypeScript Basics', type: 'material', tags: ['Programming', 'TypeScript'], lastModified: '2023-04-01', author: 'Emily Davis' },
    { id: '5', title: 'React Hooks Quiz', type: 'assessment', tags: ['Web Development', 'React'], lastModified: '2023-03-28', author: 'Michael Wilson' }
  ];

  const filteredItems = contentItems.filter(item => {
    if (activeTab === 'courses') return item.type === 'course';
    if (activeTab === 'materials') return item.type === 'material';
    if (activeTab === 'assessments') return item.type === 'assessment';
    if (activeTab === 'videos') return item.type === 'video';
    return true;
  });

  const handleContentSelect = (id: string) => {
    setSelectedContent(id === selectedContent ? null : id);
  };

  return (
    <ContentLayout>
      <div className="space-y-6">
        {/* Content Type Tabs */}
        <div className="flex flex-wrap gap-2">
          {contentTypes.map(type => (
            <button
              key={type.id}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === type.id 
                  ? 'bg-[#2563EB] text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(type.id)}
              aria-pressed={activeTab === type.id}
            >
              <span className="mr-2">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>

        {/* Content List */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{contentTypes.find(t => t.id === activeTab)?.label}</h3>
            <button className="flex items-center text-sm text-[#2563EB] hover:underline">
              <Plus className="h-4 w-4 mr-1" />
              Add New
            </button>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {filteredItems.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredItems.map(item => (
                  <li 
                    key={item.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedContent === item.id ? 'bg-blue-50' : ''}`}
                    onClick={() => handleContentSelect(item.id)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">{item.title}</h4>
                        <div className="mt-1 flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <Tag className="h-3.5 w-3.5 mr-1" />
                            {item.tags.join(', ')}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {item.lastModified}
                          </div>
                          <div className="flex items-center">
                            <User className="h-3.5 w-3.5 mr-1" />
                            {item.author}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.type === 'course' ? 'bg-blue-100 text-blue-800' :
                          item.type === 'material' ? 'bg-green-100 text-green-800' :
                          item.type === 'assessment' ? 'bg-purple-100 text-purple-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No {activeTab} found. Create one to get started.</p>
                <button className="mt-2 px-4 py-2 bg-[#2563EB] text-white rounded-md hover:bg-[#1d4ed8]">
                  Create New {activeTab.slice(0, -1)}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Editor (Placeholder) */}
        {selectedContent && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-medium mb-4">
              Edit: {contentItems.find(item => item.id === selectedContent)?.title}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={contentItems.find(item => item.id === selectedContent)?.title}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="course">Course</option>
                  <option value="material">Learning Material</option>
                  <option value="assessment">Assessment</option>
                  <option value="video">Video Content</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={contentItems.find(item => item.id === selectedContent)?.tags.join(', ')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md h-32"
                  placeholder="Enter content here..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
};

export default ContentManagementPage; 