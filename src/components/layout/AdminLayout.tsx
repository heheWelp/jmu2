"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title, 
  description,
  breadcrumbs = []
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="py-4 px-6 bg-white border-b border-gray-200">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-[#2563EB]">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              {breadcrumbs.map((item, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    {index === breadcrumbs.length - 1 ? (
                      <span className="ml-1 text-sm font-medium text-gray-700 md:ml-2">{item.label}</span>
                    ) : (
                      <Link href={item.href} className="ml-1 text-sm text-gray-500 hover:text-[#2563EB] md:ml-2">
                        {item.label}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        )}
        
        {title && (
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && <p className="text-gray-600">{description}</p>}
          </div>
        )}
      </div>
      
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 