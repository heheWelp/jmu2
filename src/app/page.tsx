"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  BookOpen, 
  Users, 
  Award, 
  Calendar, 
  MessageSquare, 
  BarChart2, 
  CheckCircle,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-[#2563EB]" />,
      title: "Comprehensive Courses",
      description: "Access a wide range of courses designed by expert educators to enhance your learning experience."
    },
    {
      icon: <Users className="h-6 w-6 text-[#2563EB]" />,
      title: "Collaborative Learning",
      description: "Engage with instructors and peers through interactive discussions and group projects."
    },
    {
      icon: <Award className="h-6 w-6 text-[#2563EB]" />,
      title: "Recognized Certifications",
      description: "Earn certificates that are recognized by industry professionals and academic institutions."
    },
    {
      icon: <Calendar className="h-6 w-6 text-[#2563EB]" />,
      title: "Flexible Scheduling",
      description: "Learn at your own pace with flexible course schedules that fit your busy lifestyle."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-[#2563EB]" />,
      title: "Dedicated Support",
      description: "Get help when you need it with our responsive support team and community forums."
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-[#2563EB]" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed progress reports and performance analytics."
    }
  ];
  
  const testimonials = [
    {
      content: "JMU Online Academy transformed my teaching experience. The platform is intuitive and the tools available make creating engaging content so much easier.",
      author: "Dr. Sarah Johnson",
      role: "Professor of Computer Science",
      avatar: "https://picsum.photos/id/1/64/64"
    },
    {
      content: "As a student juggling work and education, the flexibility of JMU Online Academy has been invaluable. I can learn at my own pace without compromising quality.",
      author: "Michael Chen",
      role: "Graduate Student",
      avatar: "https://picsum.photos/id/2/64/64"
    },
    {
      content: "The collaborative features have allowed me to provide specialized resources to students in a way that wasn't possible before. It's revolutionized how we deliver content.",
      author: "Emily Rodriguez",
      role: "Educational Content Provider",
      avatar: "https://picsum.photos/id/3/64/64"
    }
  ];
  
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <span className="sr-only">JMU Online Academy</span>
                <Image
                  src="/jmu-logo.png"
                  alt="JMU Online Academy"
                  width={48}
                  height={48}
                  className="h-12 w-auto sm:h-12"
                />
              </Link>
            </div>
            
            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2563EB]"
                onClick={() => setMobileMenuOpen(true)}
                aria-expanded="false"
              >
                <span className="sr-only">Open menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            <nav className="hidden md:flex space-x-10">
              <Link href="/courses" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Courses
              </Link>
              <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                About
              </Link>
              <Link href="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Contact
              </Link>
              <Link href="/faq" className="text-base font-medium text-gray-500 hover:text-gray-900">
                FAQ
              </Link>
            </nav>
            
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link href="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sign in
              </Link>
              <Link
                href="/register"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#2563EB] hover:bg-[#1d4ed8]"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Image
                      src="/jmu-logo.png"
                      alt="JMU Online Academy"
                      width={32}
                      height={32}
                      className="h-8 w-auto"
                    />
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2563EB]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <Link
                      href="/courses"
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BookOpen className="flex-shrink-0 h-6 w-6 text-[#2563EB]" />
                      <span className="ml-3 text-base font-medium text-gray-900">Courses</span>
                    </Link>
                    <Link
                      href="/about"
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Users className="flex-shrink-0 h-6 w-6 text-[#2563EB]" />
                      <span className="ml-3 text-base font-medium text-gray-900">About</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <MessageSquare className="flex-shrink-0 h-6 w-6 text-[#2563EB]" />
                      <span className="ml-3 text-base font-medium text-gray-900">Contact</span>
                    </Link>
                    <Link
                      href="/faq"
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Award className="flex-shrink-0 h-6 w-6 text-[#2563EB]" />
                      <span className="ml-3 text-base font-medium text-gray-900">FAQ</span>
                    </Link>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div>
                  <Link
                    href="/register"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#2563EB] hover:bg-[#1d4ed8]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Already have an account?{' '}
                    <Link 
                      href="/login" 
                      className="text-[#2563EB] hover:text-[#1d4ed8]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Hero Section */}
      <main>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                  alt="Students collaborating"
                  fill
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Transform Your Learning</span>
                  <span className="block text-[#93C5FD]">With JMU Online Academy</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                  A comprehensive learning management system designed for students, instructors, and educational content providers.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <Link
                      href="/register"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-[#1E3A8A] bg-white hover:bg-gray-50 sm:px-8"
                    >
                      Get started
                    </Link>
                    <Link
                      href="/courses"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#3B82F6] bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                    >
                      Explore courses
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-[#2563EB] font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need for online education
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our platform provides a comprehensive set of tools for students, instructors, and content providers.
              </p>
            </div>
            
            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {features.map((feature, index) => (
                  <div key={index} className="relative">
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#EFF6FF] text-white">
                      {feature.icon}
                    </div>
                    <div className="ml-16">
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div className="bg-gray-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-[#2563EB] font-semibold tracking-wide uppercase">Testimonials</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                What our users are saying
              </p>
            </div>
            
            <div className="mt-10">
              <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="lg:col-span-1">
                    <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden p-8">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <div className="text-gray-600 italic">
                            "{testimonial.content}"
                          </div>
                        </div>
                        <div className="mt-6 flex items-center">
                          <div className="flex-shrink-0">
                            <Image
                              className="h-10 w-10 rounded-full"
                              src={testimonial.avatar}
                              alt={testimonial.author}
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-[#2563EB]">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-[#BFDBFE]">Join JMU Online Academy today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#1E3A8A] bg-white hover:bg-gray-50"
                >
                  Get started
                  <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1E40AF] hover:bg-[#1E3A8A]"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
                About
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link href="/courses" className="text-base text-gray-500 hover:text-gray-900">
                Courses
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link href="/faq" className="text-base text-gray-500 hover:text-gray-900">
                FAQ
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                Terms
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                Privacy
              </Link>
            </div>
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            {/* Social Media Links */}
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} JMU Online Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
