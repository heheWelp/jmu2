"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";

const RegisterPage = () => {
  const [step, setStep] = useState<'role' | 'info' | 'success'>('role');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const roles = [
    { id: 'instructor', name: 'Instructor', color: 'bg-green-100 border-green-300 text-green-800', description: 'Create and manage courses, teach students' },
    { id: 'provider', name: 'Provider', color: 'bg-purple-100 border-purple-300 text-purple-800', description: 'Provide specialized services and resources' },
    { id: 'student', name: 'Student', color: 'bg-amber-100 border-amber-300 text-amber-800', description: 'Enroll in courses and access learning materials' }
  ];
  
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setStep('info');
    
    // Pre-fill email domain for demo purposes
    setFormData(prev => ({
      ...prev,
      email: `your.name@jmu.edu`
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1500);
  };
  
  const renderRoleSelection = () => (
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
        <p className="text-sm text-gray-500 mb-2">
          Note: Admin accounts can only be created by existing administrators
        </p>
        <Link 
          href="/login"
          className="text-sm text-[#2563EB] hover:underline"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
  
  const renderRegistrationForm = () => (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex items-center mb-4">
        <button 
          type="button"
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          onClick={() => setStep('role')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to role selection
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-md p-3 flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500">Registering as:</span>
          <span className={`ml-2 px-2 py-1 rounded-md text-sm font-medium ${
            roles.find(r => r.id === selectedRole)?.color || 'bg-gray-100 text-gray-800'
          }`}>
            {roles.find(r => r.id === selectedRole)?.name || 'User'}
          </span>
        </div>
      </div>
      
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2563EB] focus:border-[#2563EB] sm:text-sm"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2563EB] focus:border-[#2563EB] sm:text-sm"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2563EB] focus:border-[#2563EB] sm:text-sm"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Please use your institutional email if applicable
        </p>
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleInputChange}
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
        <p className="mt-1 text-xs text-gray-500">
          Password must be at least 8 characters and include uppercase, lowercase, number, and special character
        </p>
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2563EB] focus:border-[#2563EB] sm:text-sm"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          id="agreeTerms"
          name="agreeTerms"
          type="checkbox"
          checked={formData.agreeTerms}
          onChange={handleInputChange}
          className="h-4 w-4 text-[#2563EB] focus:ring-[#2563EB] border-gray-300 rounded"
        />
        <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <Link href="/terms" className="text-[#2563EB] hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-[#2563EB] hover:underline">
            Privacy Policy
          </Link>
        </label>
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
            <UserPlus className="h-5 w-5 mr-2" />
          )}
          Create Account
        </button>
      </div>
    </form>
  );
  
  const renderSuccessMessage = () => (
    <div className="text-center py-8">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <CheckCircle className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="mt-6 text-xl font-medium text-gray-900">Registration Successful!</h3>
      <p className="mt-2 text-sm text-gray-500">
        Your account has been created successfully. A verification email has been sent to your email address.
      </p>
      <div className="mt-6">
        <Link
          href="/login"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB]"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
  
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
          {step === 'role' && "Create a new account"}
          {step === 'info' && "Complete your registration"}
          {step === 'success' && "Account created successfully"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 'role' && renderRoleSelection()}
          {step === 'info' && renderRegistrationForm()}
          {step === 'success' && renderSuccessMessage()}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 