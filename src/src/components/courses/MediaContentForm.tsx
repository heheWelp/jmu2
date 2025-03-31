'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { PlusCircle, Trash2, Upload, Image, Video, FileText, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

interface Media {
  id?: string
  media_type: string
  media_url: string
  course_order: number
}

interface MediaContentFormProps {
  courseId: string
  initialMedia?: Media[]
}

export default function MediaContentForm({ courseId, initialMedia = [] }: MediaContentFormProps) {
  const router = useRouter()
  const [mediaItems, setMediaItems] = useState<Media[]>(initialMedia)
  const [isLoading, setIsLoading] = useState(false)
  const [newMediaType, setNewMediaType] = useState('image')
  const [newMediaUrl, setNewMediaUrl] = useState('')
  const dataFetchedRef = useRef(false)

  // Load media data if not provided in props
  useEffect(() => {
    // Prevent multiple fetches
    if (dataFetchedRef.current) return;
    
    if (initialMedia.length === 0) {
      const fetchMediaData = async () => {
        try {
          dataFetchedRef.current = true;
          const response = await fetch(`/api/courses/${courseId}/media`)
          if (!response.ok) throw new Error('Failed to fetch media data')
          
          const data = await response.json()
          if (data.success && data.media) {
            setMediaItems(data.media)
          }
        } catch (error) {
          console.error('Error fetching media data:', error)
          toast({
            title: 'Error',
            description: 'Failed to load media content. Please try again.',
            variant: 'destructive',
          })
        }
      }
      
      fetchMediaData()
    }
  }, [courseId, initialMedia.length])

  const handleAddMedia = async () => {
    if (!newMediaUrl.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid URL',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    
    try {
      // Add new media item
      const newMedia: Media = {
        media_type: newMediaType,
        media_url: newMediaUrl,
        course_order: mediaItems.length + 1
      }
      
      const response = await fetch(`/api/courses/${courseId}/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMedia)
      })
      
      if (!response.ok) throw new Error('Failed to add media')
      
      const result = await response.json()
      
      if (result.success) {
        // Update state with the newly created media including its ID
        setMediaItems([...mediaItems, result.media])
        setNewMediaUrl('')
        toast({
          title: 'Success',
          description: 'Media added successfully',
        })
      } else {
        throw new Error(result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error adding media:', error)
      toast({
        title: 'Error',
        description: 'Failed to add media. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveMedia = async (id: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/courses/${courseId}/media/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete media')
      
      const result = await response.json()
      
      if (result.success) {
        // Remove the deleted media and reorder remaining items
        const updatedItems = mediaItems
          .filter(item => item.id !== id)
          .map((item, index) => ({ ...item, course_order: index + 1 }))
        
        setMediaItems(updatedItems)
        toast({
          title: 'Success',
          description: 'Media removed successfully',
        })
      } else {
        throw new Error(result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error removing media:', error)
      toast({
        title: 'Error',
        description: 'Failed to remove media. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5" />
      case 'video':
        return <Video className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Course Media</h2>
        <p className="text-sm text-gray-500">
          Add images, videos, and other media to enhance your course content.
        </p>
      </div>
      
      {/* Add new media */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Add New Media</h3>
            
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="media-type">Media Type</Label>
                <RadioGroup 
                  value={newMediaType}
                  onValueChange={setNewMediaType}
                  className="flex items-center gap-4 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="image" />
                    <Label htmlFor="image" className="flex items-center">
                      <Image className="mr-1 h-4 w-4" />
                      Image
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video" className="flex items-center">
                      <Video className="mr-1 h-4 w-4" />
                      Video
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="document" id="document" />
                    <Label htmlFor="document" className="flex items-center">
                      <FileText className="mr-1 h-4 w-4" />
                      Document
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="sm:col-span-2">
                <Label htmlFor="media-url">URL</Label>
                <div className="flex mt-1">
                  <Input
                    id="media-url"
                    type="text"
                    placeholder="Enter media URL"
                    value={newMediaUrl}
                    onChange={(e) => setNewMediaUrl(e.target.value)}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    className="ml-2" 
                    onClick={handleAddMedia} 
                    disabled={isLoading || !newMediaUrl.trim()}
                  >
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Media items list */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Course Media Library</h3>
            
            {mediaItems.length === 0 ? (
              <div className="p-8 text-center border border-dashed rounded-lg">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  No media added yet. Add media using the form above.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {mediaItems.map((item) => (
                  <div 
                    key={item.id || item.course_order} 
                    className="flex items-center p-3 border rounded-md bg-white"
                  >
                    <div className="p-2 rounded-md bg-gray-100">
                      {getMediaTypeIcon(item.media_type)}
                    </div>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <p className="font-medium truncate">{item.media_url}</p>
                      <p className="text-xs text-gray-500">
                        Type: {item.media_type.charAt(0).toUpperCase() + item.media_type.slice(1)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => item.id && handleRemoveMedia(item.id)}
                      disabled={isLoading || !item.id}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 