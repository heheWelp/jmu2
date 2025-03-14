"use client";

import ContentLayout from "@/components/layout/ContentLayout";
import { useState } from "react";
import { 
  Search, 
  Plus, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical,
  User,
  Users,
  Clock,
  MessageSquare
} from "lucide-react";
import Image from "next/image";

const TagTalkPage = () => {
  const [activeThread, setActiveThread] = useState<string | null>('1');
  const [message, setMessage] = useState('');
  const [showUserList, setShowUserList] = useState(false);
  
  // Sample threads data
  const threads = [
    { id: '1', title: 'Course Updates', lastMessage: 'We need to update the JavaScript course...', unread: 3, participants: 5, time: '10:30 AM' },
    { id: '2', title: 'Student Support', lastMessage: 'How can we improve the onboarding process?', unread: 0, participants: 3, time: 'Yesterday' },
    { id: '3', title: 'Content Ideas', lastMessage: 'I think we should add a section on React hooks', unread: 1, participants: 4, time: 'Monday' },
    { id: '4', title: 'Technical Issues', lastMessage: 'The video player is not working correctly', unread: 0, participants: 2, time: 'Last week' },
  ];
  
  // Sample messages data
  const messages = [
    { id: '1', threadId: '1', sender: { name: 'John Doe', avatar: 'https://picsum.photos/id/1/40/40', role: 'Admin' }, content: 'We need to update the JavaScript course with the latest ES2022 features.', time: '10:30 AM' },
    { id: '2', threadId: '1', sender: { name: 'Jane Smith', avatar: 'https://picsum.photos/id/2/40/40', role: 'Instructor' }, content: 'I agree. I can work on updating the curriculum this week.', time: '10:35 AM' },
    { id: '3', threadId: '1', sender: { name: 'Robert Johnson', avatar: 'https://picsum.photos/id/3/40/40', role: 'Provider' }, content: 'Great! I can help with creating new examples and exercises.', time: '10:40 AM' },
    { id: '4', threadId: '1', sender: { name: 'Emily Davis', avatar: 'https://picsum.photos/id/4/40/40', role: 'Admin' }, content: 'Should we also update the assessment questions?', time: '10:45 AM' },
    { id: '5', threadId: '1', sender: { name: 'John Doe', avatar: 'https://picsum.photos/id/1/40/40', role: 'Admin' }, content: 'Yes, definitely. We need to make sure the assessments reflect the updated content.', time: '10:50 AM' },
  ];
  
  // Sample users data
  const users = [
    { id: '1', name: 'John Doe', avatar: 'https://picsum.photos/id/1/40/40', role: 'Admin', status: 'online' },
    { id: '2', name: 'Jane Smith', avatar: 'https://picsum.photos/id/2/40/40', role: 'Instructor', status: 'online' },
    { id: '3', name: 'Robert Johnson', avatar: 'https://picsum.photos/id/3/40/40', role: 'Provider', status: 'away' },
    { id: '4', name: 'Emily Davis', avatar: 'https://picsum.photos/id/4/40/40', role: 'Admin', status: 'offline' },
    { id: '5', name: 'Michael Wilson', avatar: 'https://picsum.photos/id/5/40/40', role: 'Student', status: 'online' },
  ];
  
  const filteredMessages = messages.filter(msg => msg.threadId === activeThread);
  
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      // Implementation would go here
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <ContentLayout>
      <div className="flex flex-col h-full">
        {/* Two-column layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Thread List */}
          <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search threads..."
                  className="py-2 pl-10 pr-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 flex justify-between items-center">
                <h3 className="font-medium">Threads</h3>
                <button 
                  className="p-1 rounded-md hover:bg-gray-100 text-[#2563EB]"
                  aria-label="Create new thread"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              
              <ul className="divide-y divide-gray-200">
                {threads.map(thread => (
                  <li 
                    key={thread.id}
                    className={`p-3 hover:bg-gray-50 cursor-pointer ${activeThread === thread.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setActiveThread(thread.id)}
                  >
                    <div className="flex justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{thread.title}</h4>
                          <span className="text-xs text-gray-500">{thread.time}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{thread.lastMessage}</p>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          {thread.participants} participants
                        </div>
                      </div>
                      {thread.unread > 0 && (
                        <div className="ml-2 flex-shrink-0">
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#2563EB] text-white text-xs">
                            {thread.unread}
                          </span>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="hidden md:flex md:flex-1 flex-col">
            {activeThread ? (
              <>
                {/* Chat Header */}
                <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <h3 className="font-medium">{threads.find(t => t.id === activeThread)?.title}</h3>
                    <span className="ml-2 text-xs text-gray-500">
                      {threads.find(t => t.id === activeThread)?.participants} participants
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="p-1 rounded-md hover:bg-gray-100"
                      onClick={() => setShowUserList(!showUserList)}
                      aria-label="Show participants"
                      aria-pressed={showUserList}
                    >
                      <Users className="h-5 w-5 text-gray-500" />
                    </button>
                    <button 
                      className="p-1 rounded-md hover:bg-gray-100"
                      aria-label="More options"
                    >
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {filteredMessages.map(msg => (
                    <div key={msg.id} className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <Image
                          src={msg.sender.avatar}
                          alt={msg.sender.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{msg.sender.name}</span>
                          <span className="ml-2 text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-gray-800 mt-1">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-3 border-t border-gray-200">
                  <div className="flex items-end">
                    <div className="flex-1 min-w-0">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="ml-3 flex flex-col space-y-2">
                      <button 
                        className="p-2 rounded-md hover:bg-gray-100"
                        aria-label="Attach file"
                      >
                        <Paperclip className="h-5 w-5 text-gray-500" />
                      </button>
                      <button 
                        className="p-2 rounded-md hover:bg-gray-100"
                        aria-label="Add emoji"
                      >
                        <Smile className="h-5 w-5 text-gray-500" />
                      </button>
                      <button 
                        className="p-2 rounded-md bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
                        onClick={handleSendMessage}
                        aria-label="Send message"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No Thread Selected</h3>
                  <p className="text-gray-500 mt-1">Select a thread from the list to start chatting</p>
                </div>
              </div>
            )}
          </div>
          
          {/* User List (Conditional) */}
          {showUserList && (
            <div className="hidden md:block w-64 border-l border-gray-200 flex-shrink-0">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-medium">Participants</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {users.map(user => (
                  <li key={user.id} className="p-3 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0 mr-3">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="h-8 w-8 rounded-full"
                        />
                        <span className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-1 ring-white ${
                          user.status === 'online' ? 'bg-green-400' :
                          user.status === 'away' ? 'bg-yellow-400' :
                          'bg-gray-400'
                        }`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.role}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Mobile View (Only Chat) */}
        <div className="md:hidden">
          {activeThread ? (
            <div className="fixed inset-0 bg-white z-50 flex flex-col">
              {/* Mobile Chat Header */}
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <button 
                  className="p-1 rounded-md hover:bg-gray-100"
                  onClick={() => setActiveThread(null)}
                  aria-label="Back to threads"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <h3 className="font-medium">{threads.find(t => t.id === activeThread)?.title}</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-1 rounded-md hover:bg-gray-100"
                    onClick={() => setShowUserList(!showUserList)}
                    aria-label="Show participants"
                    aria-pressed={showUserList}
                  >
                    <Users className="h-5 w-5 text-gray-500" />
                  </button>
                  <button 
                    className="p-1 rounded-md hover:bg-gray-100"
                    aria-label="More options"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {/* Mobile Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {filteredMessages.map(msg => (
                  <div key={msg.id} className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Image
                        src={msg.sender.avatar}
                        alt={msg.sender.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{msg.sender.name}</span>
                        <span className="ml-2 text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-gray-800 mt-1">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile Message Input */}
              <div className="p-3 border-t border-gray-200">
                <div className="flex items-end">
                  <div className="flex-1 min-w-0">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none"
                      rows={2}
                    />
                  </div>
                  <div className="ml-3 flex flex-col space-y-2">
                    <button 
                      className="p-2 rounded-md hover:bg-gray-100"
                      aria-label="Attach file"
                    >
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </button>
                    <button 
                      className="p-2 rounded-md bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
                      onClick={handleSendMessage}
                      aria-label="Send message"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <p className="text-center text-gray-500">Select a thread to view messages</p>
            </div>
          )}
        </div>
      </div>
    </ContentLayout>
  );
};

export default TagTalkPage; 