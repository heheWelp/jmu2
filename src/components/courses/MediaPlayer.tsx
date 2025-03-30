import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MediaPlayerProps {
  title: string
  url: string
  type: string
}

export default function MediaPlayer({ title, url, type }: MediaPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border rounded-lg overflow-hidden">
      <Button
        variant="ghost"
        className="w-full flex items-center justify-between p-4 hover:bg-accent"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{title}</span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>
      
      {isExpanded && (
        <div className="p-4 bg-muted">
          {type.startsWith('video/') ? (
            <video
              src={url}
              controls
              className="w-full rounded-lg"
              controlsList="nodownload"
            >
              Your browser does not support the video tag.
            </video>
          ) : type.startsWith('audio/') ? (
            <audio
              src={url}
              controls
              className="w-full"
              controlsList="nodownload"
            >
              Your browser does not support the audio tag.
            </audio>
          ) : (
            <iframe
              src={url}
              className="w-full h-[480px] rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      )}
    </div>
  )
} 