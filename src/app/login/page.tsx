"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  const roles = [
    { id: 'admin', name: 'Admin', color: 'bg-blue-100 border-blue-300 text-blue-800', description: 'System management and administration' },
    { id: 'instructor', name: 'Instructor', color: 'bg-green-100 border-green-300 text-green-800', description: 'Course creation and student management' },
    { id: 'provider', name: 'Provider', color: 'bg-purple-100 border-purple-300 text-purple-800', description: 'Service provision and resource management' },
    { id: 'student', name: 'Student', color: 'bg-amber-100 border-amber-300 text-amber-800', description: 'Course enrollment and learning' }
  ];
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo login logic - in a real app, this would be an API call
      if (email === "admin@jmu.edu" && password === "password") {
        window.location.href = "/dashboard";
      } else {
        setError("Invalid email or password");
      }
    }, 1500);
  };
  
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    
    // Pre-fill email based on role for demo purposes
    switch (roleId) {
      case 'admin':
        setEmail('admin@jmu.edu');
        break;
      case 'instructor':
        setEmail('instructor@jmu.edu');
        break;
      case 'provider':
        setEmail('provider@jmu.edu');
        break;
      case 'student':
        setEmail('student@jmu.edu');
        break;
    }
    
    // Clear any previous errors
    setError(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image
            src="/jmu-logo.png"
            alt="JMU Online Academy"
            width={80}
            height={80}
            className="h-20 w-auto"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          JMU Online Academy
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Role Selection */}
          {!selectedRole ? (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select your role</h3>
              <div className="space-y-3">
                {roles.map(role => (
                  <button
                    key={role.id}
                    className={`w-full p-4 rounded-lg border-2 text-left hover:shadow-md transition-shadow ${role.color}`}
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    <div className="font-medium text-lg">{role.name}</div>
                    <div className="text-sm opacity-75">{role.description}</div>
                  </button>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button 
                  className="text-sm text-[#2563EB] hover:underline"
                  onClick={() => setSelectedRole('custom')}
                >
                  Sign in with email instead
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleLogin}>
              {selectedRole !== 'custom' && (
                <div className="bg-gray-50 rounded-md p-3 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Signing in as:</span>
                    <span className={`ml-2 px-2 py-1 rounded-md text-sm font-medium ${
                      roles.find(r => r.id === selectedRole)?.color || 'bg-gray-100 text-gray-800'
                    }`}>
                      {roles.find(r => r.id === selectedRole)?.name || 'User'}
                    </span>
                  </div>
                  <button 
                    type="button"
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedRole(null)}
                  >
                    Change
                  </button>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2563EB] focus:border-[#2563EB] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2563EB] focus:border-[#2563EB] sm:text-sm"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-[#2563EB] focus:ring-[#2563EB] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="font-medium text-[#2563EB] hover:text-[#1d4ed8]">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  ) : (
                    <LogIn className="h-5 w-5 mr-2" />
                  )}
                  Sign in
                </button>
              </div>
            </form>
          )}
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <Link 
                href="/register"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Create new account
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-[#2563EB] hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#2563EB] hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 