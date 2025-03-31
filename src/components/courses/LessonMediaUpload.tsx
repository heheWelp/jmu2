import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Upload, Link as LinkIcon, FileText, MessageCircle, Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface LessonContent {
  id: string
  title: string
  content_type: 'media' | 'text' | 'discussion'
  content: string
  file_type?: string
  file_url?: string
  thumbnail_url?: string
}

interface LessonMediaUploadProps {
  courseId: string
  lessonId: string
  onContentAdded: () => void
}

export default function LessonMediaUpload({
  courseId,
  lessonId,
  onContentAdded,
}: LessonMediaUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [contentType, setContentType] = useState<'media' | 'text' | 'discussion'>('media')
  const [mediaType, setMediaType] = useState<'upload' | 'url'>('upload')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      let fileUrl = mediaUrl
      let fileType = 'text'

      if (contentType === 'media') {
        if (mediaType === 'upload' && file) {
          // Get presigned URL for upload
          const presignedResponse = await fetch(`/api/courses/${courseId}/media/presigned-url`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: file.name,
              contentType: file.type
            })
          })
          const { url, fields, fileUrl: finalUrl } = await presignedResponse.json()

          // Upload to S3
          const formData = new FormData()
          Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value as string)
          })
          formData.append('file', file)

          await fetch(url, {
            method: 'POST',
            body: formData
          })

          fileUrl = finalUrl
          fileType = file.type
        }
      }

      // Save content to database
      const response = await fetch(`/api/courses/${courseId}/lessons/${lessonId}/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content_type: contentType,
          content: contentType === 'media' ? '' : content,
          file_type: contentType === 'media' ? fileType : undefined,
          file_url: contentType === 'media' ? fileUrl : undefined
        })
      })

      if (!response.ok) throw new Error('Failed to save content')

      toast.success('Content added successfully')
      
      // Reset form
      setTitle('')
      setContent('')
      setMediaUrl('')
      setFile(null)
      setContentType('media')
      setMediaType('upload')
      
      // Call onContentAdded to refresh the content list
      onContentAdded()
    } catch (error) {
      toast.error('Failed to add content')
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'media':
        return <Upload className="w-4 h-4" />
      case 'text':
        return <FileText className="w-4 h-4" />
      case 'discussion':
        return <MessageCircle className="w-4 h-4" />
      default:
        return <Upload className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Content to Lesson</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Content Type</Label>
              <Select value={contentType} onValueChange={(value: 'media' | 'text' | 'discussion') => setContentType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="media">Media (Video/Audio)</SelectItem>
                  <SelectItem value="text">Text Content</SelectItem>
                  <SelectItem value="discussion">Discussion Prompt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </div>

            {contentType === 'media' ? (
              <>
                <div className="space-y-2">
                  <Label>Media Type</Label>
                  <Select value={mediaType} onValueChange={(value: 'upload' | 'url') => setMediaType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upload">File Upload</SelectItem>
                      <SelectItem value="url">URL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {mediaType === 'upload' ? (
                  <div className="space-y-2">
                    <Label htmlFor="file">File</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      accept="video/*,audio/*"
                      required
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="mediaUrl">Media URL</Label>
                    <Input
                      id="mediaUrl"
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                      placeholder="Enter media URL"
                      required
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="content">{contentType === 'text' ? 'Text Content' : 'Discussion Prompt'}</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={contentType === 'text' ? 'Enter text content...' : 'Enter discussion prompt...'}
                  className="min-h-[200px]"
                  required
                />
              </div>
            )}

            <Button type="submit" disabled={isUploading} className="w-full">
              {isUploading ? 'Adding...' : 'Add Content'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 