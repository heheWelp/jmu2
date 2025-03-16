import { AlertTriangle } from 'lucide-react'

interface NotFoundPlaceholderProps {
  pageName: string
}

export default function NotFoundPlaceholder({ pageName }: NotFoundPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-6 text-center">
      <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Under Construction</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        The {pageName} page is currently being developed and will be available soon.
      </p>
      <div className="inline-block px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
        404 - Coming Soon
      </div>
    </div>
  )
} 