"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import { useState } from "react";
import { 
  Save, 
  Lock, 
  Mail, 
  Bell, 
  Users, 
  Globe, 
  Database, 
  FileText, 
  Settings as SettingsIcon,
  CheckCircle,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [formChanged, setFormChanged] = useState(false);
  
  // Sample settings data
  const settings = {
    general: {
      siteName: 'JMU Online Academy',
      siteDescription: 'Comprehensive learning management system',
      logoUrl: '/logo.png',
      faviconUrl: '/favicon.ico',
      primaryColor: '#2563EB',
      secondaryColor: '#1E40AF',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h'
    },
    security: {
      passwordMinLength: 8,
      passwordRequireUppercase: true,
      passwordRequireNumbers: true,
      passwordRequireSymbols: true,
      passwordExpiryDays: 90,
      twoFactorAuth: 'optional',
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      ipRestriction: false
    },
    email: {
      smtpServer: 'smtp.example.com',
      smtpPort: 587,
      smtpUsername: 'notifications@jmuonlineacademy.edu',
      smtpPassword: '********',
      fromEmail: 'no-reply@jmuonlineacademy.edu',
      fromName: 'JMU Online Academy',
      emailFooter: 'This is an automated message from JMU Online Academy.',
      emailLogo: true
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      notifyOnNewUser: true,
      notifyOnCourseEnrollment: true,
      notifyOnAssignmentSubmission: false,
      notifyOnSystemUpdates: true,
      digestFrequency: 'daily'
    },
    users: {
      allowSelfRegistration: true,
      defaultRole: 'student',
      requireEmailVerification: true,
      allowProfileCustomization: true,
      showUserOnlineStatus: true,
      allowUserAvatars: true,
      allowDeleteAccount: false
    },
    localization: {
      defaultLanguage: 'en',
      availableLanguages: ['en', 'es', 'fr'],
      enableAutoTranslation: false,
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      timezone: 'America/New_York',
      firstDayOfWeek: 'sunday'
    },
    storage: {
      maxFileSize: 50,
      allowedFileTypes: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.png,.mp4,.mp3',
      storageProvider: 'local',
      s3BucketName: '',
      s3Region: '',
      s3AccessKey: '',
      s3SecretKey: '',
      maxStoragePerUser: 1024
    },
    content: {
      allowRichTextEditing: true,
      allowVideoEmbedding: true,
      allowFileAttachments: true,
      enableVersioning: true,
      enableDrafts: true,
      requireApproval: false,
      allowComments: true,
      allowRatings: true
    },
    system: {
      maintenanceMode: false,
      maintenanceMessage: 'The system is currently undergoing scheduled maintenance. Please check back later.',
      debugMode: false,
      logLevel: 'error',
      backupFrequency: 'daily',
      maxBackupCount: 7,
      analyticsEnabled: true,
      analyticsProvider: 'internal'
    }
  };
  
  const settingsTabs = [
    { id: 'general', label: 'General', icon: <SettingsIcon className="h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Lock className="h-5 w-5" /> },
    { id: 'email', label: 'Email', icon: <Mail className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="h-5 w-5" /> },
    { id: 'localization', label: 'Localization', icon: <Globe className="h-5 w-5" /> },
    { id: 'storage', label: 'Storage', icon: <Database className="h-5 w-5" /> },
    { id: 'content', label: 'Content', icon: <FileText className="h-5 w-5" /> },
    { id: 'system', label: 'System', icon: <SettingsIcon className="h-5 w-5" /> }
  ];
  
  const handleSaveSettings = () => {
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      // 95% chance of success
      if (Math.random() > 0.05) {
        setSaveStatus('success');
        setFormChanged(false);
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      } else {
        setSaveStatus('error');
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      }
    }, 1500);
  };
  
  const handleInputChange = () => {
    setFormChanged(true);
  };
  
  const renderSettingsForm = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={settings.general.siteName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={settings.general.siteDescription}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                    <Image 
                      src="/jmu-logo.png" 
                      alt="Logo" 
                      width={64} 
                      height={64}
                      className="max-h-full max-w-full"
                    />
                  </div>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                    Change Logo
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Favicon</label>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                    <Image 
                      src="/favicon.ico" 
                      alt="Favicon" 
                      width={32} 
                      height={32}
                      className="max-h-full max-w-full"
                    />
                  </div>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                    Change Favicon
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    className="h-8 w-8 border border-gray-300 rounded-md"
                    defaultValue={settings.general.primaryColor}
                    onChange={handleInputChange}
                  />
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={settings.general.primaryColor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    className="h-8 w-8 border border-gray-300 rounded-md"
                    defaultValue={settings.general.secondaryColor}
                    onChange={handleInputChange}
                  />
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={settings.general.secondaryColor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={settings.general.timezone}
                  onChange={handleInputChange}
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={settings.general.dateFormat}
                  onChange={handleInputChange}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={settings.general.timeFormat}
                  onChange={handleInputChange}
                >
                  <option value="12h">12-hour (AM/PM)</option>
                  <option value="24h">24-hour</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Changes to security settings may require users to log in again. Proceed with caution.
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-medium border-b border-gray-200 pb-2 mb-4">Password Requirements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Password Length</label>
                <input 
                  type="number" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={settings.security.passwordMinLength}
                  min="6"
                  max="32"
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password Expiry (Days)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={settings.security.passwordExpiryDays}
                  min="0"
                  onChange={handleInputChange}
                />
                <p className="text-xs text-gray-500 mt-1">Set to 0 for no expiration</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="require-uppercase"
                    type="checkbox"
                    className="h-4 w-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]"
                    defaultChecked={settings.security.passwordRequireUppercase}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="require-uppercase" className="ml-2 block text-sm text-gray-700">
                    Require uppercase letters
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="require-numbers"
                    type="checkbox"
                    className="h-4 w-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]"
                    defaultChecked={settings.security.passwordRequireNumbers}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="require-numbers" className="ml-2 block text-sm text-gray-700">
                    Require numbers
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="require-symbols"
                    type="checkbox"
                    className="h-4 w-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]"
                    defaultChecked={settings.security.passwordRequireSymbols}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="require-symbols" className="ml-2 block text-sm text-gray-700">
                    Require special characters
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Two-Factor Authentication</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={settings.security.twoFactorAuth}
                  onChange={handleInputChange}
                >
                  <option value="disabled">Disabled</option>
                  <option value="optional">Optional (User Choice)</option>
                  <option value="required">Required for All Users</option>
                  <option value="admin-only">Required for Admins Only</option>
                </select>
              </div>
            </div>
            
            <h3 className="text-lg font-medium border-b border-gray-200 pb-2 mb-4 mt-8">Session Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (Minutes)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={settings.security.sessionTimeout}
                  min="5"
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Login Attempts</label>
                <input 
                  type="number" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={settings.security.maxLoginAttempts}
                  min="3"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="flex items-center mt-4">
              <input
                id="ip-restriction"
                type="checkbox"
                className="h-4 w-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]"
                defaultChecked={settings.security.ipRestriction}
                onChange={handleInputChange}
              />
              <label htmlFor="ip-restriction" className="ml-2 block text-sm text-gray-700">
                Enable IP address restrictions
              </label>
            </div>
            
            {settings.security.ipRestriction && (
              <div className="mt-2 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700 mb-2">IP address whitelist (one per line)</p>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md h-24"
                  placeholder="192.168.1.1"
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
        );
        
      // For brevity, I'll just show a placeholder for other tabs
      default:
        return (
          <div className="bg-gray-50 rounded-md p-8 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {settingsTabs.find(tab => tab.id === activeTab)?.label} Settings
            </h3>
            <p className="text-gray-500">
              This section contains settings for {settingsTabs.find(tab => tab.id === activeTab)?.label.toLowerCase()}.
            </p>
            <button 
              className="mt-4 px-4 py-2 bg-[#2563EB] text-white rounded-md hover:bg-[#1d4ed8]"
              onClick={() => setFormChanged(true)}
            >
              Simulate Changes
            </button>
          </div>
        );
    }
  };
  
  return (
    <AdminLayout
      title="Settings"
      description="System and user preferences configuration"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Settings", href: "/settings" }
      ]}
    >
      <div className="flex flex-col h-full">
        {/* Save Status Bar (conditional) */}
        {saveStatus !== 'idle' && (
          <div className={`mb-4 p-3 rounded-md ${
            saveStatus === 'saving' ? 'bg-blue-50 text-blue-700' :
            saveStatus === 'success' ? 'bg-green-50 text-green-700' :
            'bg-red-50 text-red-700'
          }`}>
            <div className="flex items-center">
              {saveStatus === 'saving' && (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                  <span>Saving settings...</span>
                </>
              )}
              {saveStatus === 'success' && (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Settings saved successfully!</span>
                </>
              )}
              {saveStatus === 'error' && (
                <>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>Error saving settings. Please try again.</span>
                </>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Settings Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4">
            <nav>
              <ul className="space-y-1">
                {settingsTabs.map(tab => (
                  <li key={tab.id}>
                    <button
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left ${
                        activeTab === tab.id 
                          ? 'bg-[#2563EB] text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                      aria-current={activeTab === tab.id ? 'page' : undefined}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{tab.icon}</span>
                        <span>{tab.label}</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`} />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Settings Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">
                {settingsTabs.find(tab => tab.id === activeTab)?.label} Settings
              </h2>
              
              {renderSettingsForm()}
              
              <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md mr-2 hover:bg-gray-200"
                  onClick={() => setFormChanged(false)}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 rounded-md flex items-center ${
                    formChanged 
                      ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8]' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={handleSaveSettings}
                  disabled={!formChanged || saveStatus === 'saving'}
                >
                  {saveStatus === 'saving' && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  )}
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage; 