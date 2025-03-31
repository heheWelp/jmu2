import { FileText, MessageCircle } from 'lucide-react'
import MediaPlayer from './MediaPlayer'
import { Card } from '@/components/ui/card'

interface LessonContentProps {
  content: {
    id: string
    title: string
    content_type: 'media' | 'text' | 'discussion'
    content: string
    file_type?: string
    file_url?: string
  }
}

export default function LessonContent({ content }: LessonContentProps) {
  const renderContent = () => {
    switch (content.content_type) {
      case 'media':
        return (
          <MediaPlayer
            title={content.title}
            url={content.file_url || ''}
            type={content.file_type || ''}
          />
        )
      case 'text':
        return (
          <Card className="p-4">
            <div className="prose prose-sm max-w-none">
              <h3 className="font-medium mb-2">{content.title}</h3>
              {content.content}
            </div>
          </Card>
        )
      case 'discussion':
        return (
          <Card className="p-4">
            <div className="prose prose-sm max-w-none">
              <h3 className="font-medium mb-2">{content.title}</h3>
              <div className="bg-muted p-4 rounded-md">
                {content.content}
              </div>
            </div>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {renderContent()}
    </div>
  )
} 