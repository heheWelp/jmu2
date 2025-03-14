"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Search, User, ChevronDown, LogOut, Settings, UserCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();
  
  // Close the user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);
  
  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/signin");
  };
  
  // Truncate email for display
  const displayEmail = user?.email && user.email.length > 20
    ? `${user.email.substring(0, 17)}...`
    : user?.email;
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    
    const email = user.email || "";
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    
    return "U";
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-[#2563EB]">JMU Learning Management System</h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
        </div>

        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {isLoading ? (
          // Loading state
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
        ) : user ? (
          // Authenticated user
          <div className="relative">
            <button 
              className="flex items-center space-x-3"
              onClick={(e) => {
                e.stopPropagation();
                setShowUserMenu(!showUserMenu);
              }}
            >
              <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white">
                {getUserInitials()}
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">{displayEmail}</span>
                <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                </div>
                <Link href="/settings/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <UserCircle className="h-4 w-4 mr-2" />
                  Your Profile
                </Link>
                <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          // Not authenticated
          <Link 
            href="/auth/signin"
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2563EB] hover:bg-[#1d4ed8]"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
} 