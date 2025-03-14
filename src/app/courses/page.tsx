"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  ChevronDown,
  X,
  CheckCircle2
} from "lucide-react";

const CoursesPage = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  
  // Sample course data
  const courses: Course[] = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      description: "Learn the fundamentals of computer science, including algorithms, data structures, and programming concepts.",
      instructor: "Dr. Alan Turing",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      duration: "8 weeks",
      level: "Beginner",
      category: "Computer Science",
      rating: 4.8,
      students: 1245,
      price: 49.99,
      featured: true
    },
    {
      id: 2,
      title: "Advanced Data Analysis with Python",
      description: "Master data analysis techniques using Python, pandas, numpy, and visualization libraries.",
      instructor: "Dr. Jane Smith",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      duration: "10 weeks",
      level: "Advanced",
      category: "Data Science",
      rating: 4.9,
      students: 876,
      price: 79.99,
      featured: true
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      description: "Comprehensive course covering HTML, CSS, JavaScript, React, and Node.js for full-stack development.",
      instructor: "Mark Johnson",
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      duration: "12 weeks",
      level: "Intermediate",
      category: "Web Development",
      rating: 4.7,
      students: 2134,
      price: 89.99,
      featured: false
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      description: "Introduction to machine learning algorithms, techniques, and applications with practical examples.",
      instructor: "Dr. Sarah Chen",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      duration: "8 weeks",
      level: "Intermediate",
      category: "Data Science",
      rating: 4.6,
      students: 1567,
      price: 69.99,
      featured: true
    },
    {
      id: 5,
      title: "Digital Marketing Essentials",
      description: "Learn the core concepts of digital marketing, including SEO, social media, and content marketing.",
      instructor: "Emily Rodriguez",
      thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      duration: "6 weeks",
      level: "Beginner",
      category: "Marketing",
      rating: 4.5,
      students: 987,
      price: 39.99,
      featured: false
    },
    {
      id: 6,
      title: "Cybersecurity Fundamentals",
      description: "Introduction to cybersecurity principles, threats, and defense mechanisms for beginners.",
      instructor: "Michael Brown",
      thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      duration: "8 weeks",
      level: "Beginner",
      category: "Cybersecurity",
      rating: 4.7,
      students: 1123,
      price: 59.99,
      featured: false
    },
    {
      id: 7,
      title: "Graphic Design Masterclass",
      description: "Comprehensive course on graphic design principles, tools, and techniques using industry-standard software.",
      instructor: "Lisa Wong",
      thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      duration: "10 weeks",
      level: "Intermediate",
      category: "Design",
      rating: 4.8,
      students: 1456,
      price: 69.99,
      featured: false
    },
    {
      id: 8,
      title: "Business Management Essentials",
      description: "Learn key business management concepts, leadership skills, and organizational strategies.",
      instructor: "Dr. Robert Miller",
      thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      duration: "8 weeks",
      level: "Beginner",
      category: "Business",
      rating: 4.6,
      students: 1089,
      price: 49.99,
      featured: false
    }
  ];
  
  // Extract unique categories and levels for filters
  const categories = Array.from(new Set(courses.map(course => course.category)));
  const levels = Array.from(new Set(courses.map(course => course.level)));
  
  // Filter courses based on search query and selected filters
  useEffect(() => {
    let result = [...courses];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        course => 
          course.title.toLowerCase().includes(query) || 
          course.description.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(course => selectedCategories.includes(course.category));
    }
    
    // Filter by levels
    if (selectedLevels.length > 0) {
      result = result.filter(course => selectedLevels.includes(course.level));
    }
    
    // Sort courses
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.students - a.students);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setFilteredCourses(result);
  }, [searchQuery, selectedCategories, selectedLevels, sortBy]);
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Toggle level selection
  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSearchQuery("");
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#2563EB] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold">Explore Courses</h1>
          <p className="mt-2 text-lg text-blue-100">
            Discover a wide range of courses to enhance your skills and knowledge
          </p>
          
          {/* Search Bar */}
          <div className="mt-6 max-w-3xl">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-5 w-5 text-blue-300" />
              <input
                type="text"
                placeholder="Search for courses, instructors, or topics..."
                className="pl-10 pr-4 py-3 w-full rounded-lg bg-white/10 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-blue-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                {(selectedCategories.length > 0 || selectedLevels.length > 0) && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-[#2563EB] hover:text-[#1d4ed8]"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Levels */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Difficulty Level</h3>
                <div className="space-y-2">
                  {levels.map(level => (
                    <div key={level} className="flex items-center">
                      <input
                        id={`level-${level}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                        checked={selectedLevels.includes(level)}
                        onChange={() => toggleLevel(level)}
                      />
                      <label htmlFor={`level-${level}`} className="ml-2 text-sm text-gray-700">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Courses Grid */}
          <div className="flex-1">
            {/* Mobile Filters Button */}
            <div className="md:hidden mb-4 flex justify-between items-center">
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex items-center px-4 py-2 bg-white rounded-lg shadow text-sm font-medium text-gray-700"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(selectedCategories.length > 0 || selectedLevels.length > 0) && (
                  <span className="ml-1 bg-[#2563EB] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {selectedCategories.length + selectedLevels.length}
                  </span>
                )}
              </button>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            {/* Desktop Sort */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredCourses.length}</span> results
              </p>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            {/* Featured Courses */}
            {searchQuery === "" && selectedCategories.length === 0 && selectedLevels.length === 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Featured Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses
                    .filter(course => course.featured)
                    .map(course => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                </div>
              </div>
            )}
            
            {/* All Courses */}
            <div>
              {searchQuery !== "" || selectedCategories.length > 0 || selectedLevels.length > 0 ? (
                <h2 className="text-xl font-bold mb-4">Search Results</h2>
              ) : (
                <h2 className="text-xl font-bold mb-4">All Courses</h2>
              )}
              
              {filteredCourses.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                    <Search className="h-6 w-6 text-[#2563EB]" />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2563EB] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB]"
                    >
                      Clear filters
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filters Drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setFiltersOpen(false)} />
          
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setFiltersOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="px-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  {(selectedCategories.length > 0 || selectedLevels.length > 0) && (
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-[#2563EB] hover:text-[#1d4ed8]"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <input
                          id={`mobile-category-${category}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                        />
                        <label htmlFor={`mobile-category-${category}`} className="ml-2 text-sm text-gray-700">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Levels */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Difficulty Level</h3>
                  <div className="space-y-2">
                    {levels.map(level => (
                      <div key={level} className="flex items-center">
                        <input
                          id={`mobile-level-${level}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                          checked={selectedLevels.includes(level)}
                          onChange={() => toggleLevel(level)}
                        />
                        <label htmlFor={`mobile-level-${level}`} className="ml-2 text-sm text-gray-700">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#2563EB] hover:bg-[#1d4ed8]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Course Card Component
const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-full transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
        />
        {course.featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-gray-800">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {course.category}
          </span>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {course.level}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
            <Users className="h-4 w-4 ml-4 mr-1" />
            {course.students.toLocaleString()} students
          </div>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(course.rating)
                      ? "text-yellow-400 fill-current"
                      : i < course.rating
                      ? "text-yellow-400 fill-current opacity-50"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-600">{course.rating.toFixed(1)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">${course.price.toFixed(2)}</span>
            <Link
              href={`/courses/${course.id}`}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-[#2563EB] hover:bg-[#1d4ed8]"
            >
              View Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// TypeScript interface for Course
interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  level: string;
  category: string;
  rating: number;
  students: number;
  price: number;
  featured: boolean;
}

export default CoursesPage; 