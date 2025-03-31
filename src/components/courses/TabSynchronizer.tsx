'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface TabSynchronizerProps {
  courseId: string
  setActiveTab: (tab: string) => void
}

export default function TabSynchronizer({ courseId, setActiveTab }: TabSynchronizerProps) {
  const pathname = usePathname()
  
  useEffect(() => {
    // Check if pathname is null
    if (!pathname) return
    
    // Extract tab from URL path
    const pathParts = pathname.split('/')
    const lastPart = pathParts[pathParts.length - 1]
    
    // If the URL includes a tab identifier (not just the course ID in 'edit')
    if (pathParts.length > 5 && pathParts[4] === 'edit') {
      setActiveTab(lastPart)
    } else {
      // If we're at the base edit URL, set to basic-info
      setActiveTab('basic-info')
    }
  }, [pathname, setActiveTab])
  
  // This component doesn't render anything
  return null
} 