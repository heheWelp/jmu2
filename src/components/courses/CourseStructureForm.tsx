'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle, Trash2, ChevronDown, ChevronUp, PlusSquare, Edit, X, Plus, GripVertical, Video, FileText, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import MediaPlayer from './MediaPlayer'
import LessonMediaUpload from './LessonMediaUpload'
import LessonContent from './LessonContent'

interface LessonContent {
  id: string
  title: string
  content_type: 'media' | 'text' | 'discussion'
  content: string
  file_type?: string
  file_url?: string
}

interface LessonContentType {
  id: string
  content_type: 'lesson' | 'media' | 'quiz'
  name: string
  module_id: string
  number: number
  video_url: string | null
  lesson_details: string | null
  course_order: number | null
  content?: LessonContent[]
}

interface ModuleContentType {
  id: string
  name: string
  children: LessonContentType[]
}

interface CourseStructureType {
  modules: ModuleContentType[]
}

interface Lesson {
  id: string
  module_id: string
  name: string
  number: number
  video_url: string | null
  lesson_details: string | null
  course_order: number | null
  media?: {
    id: string
    title: string
    file_type: string
    file_url: string
    thumbnail_url?: string
  }[]
}

interface Module {
  id: string
  course_id: string
  name: string
  number: number
  lessons?: Lesson[]
}

interface CourseStructureFormProps {
  courseId: string
  initialStructure?: CourseStructureType
  modules?: ModuleContentType[]
  isAddingModule: boolean
  setIsAddingModule: (value: boolean) => void
  isAddingContent: boolean
  setIsAddingContent: (value: boolean) => void
}

export default function CourseStructureForm({
  courseId,
  initialStructure,
  modules,
  isAddingModule,
  setIsAddingModule,
  isAddingContent,
  setIsAddingContent,
}: CourseStructureFormProps) {
  const router = useRouter()
  const [structure, setStructure] = useState<CourseStructureType>({
    modules: initialStructure?.modules || []
  })
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [newItemName, setNewItemName] = useState('')
  const [newItemType, setNewItemType] = useState<'lesson' | 'media' | 'quiz'>('lesson')
  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({})

  // Fetch course structure when component mounts
  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}/structure`)
        const data = await response.json()
        if (data.success) {
          // Ensure each lesson has its content array
          setStructure({
            modules: data.structure?.map((module: any) => ({
              ...module,
              children: module.children?.map((child: any) => ({
                ...child,
                content: child.content_type === 'lesson' ? (child.content || []) : undefined
              })) || []
            })) || []
          })
        }
      } catch (error) {
        toast.error('Failed to fetch course structure')
      }
    }
    fetchStructure()
  }, [courseId])

  const deleteModule = async (moduleId: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/modules/${moduleId}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      
      if (data.success) {
        setStructure(prev => ({
          ...prev,
          modules: prev.modules.filter(m => m.id !== moduleId)
        }))
        toast.success('Module deleted successfully')
      }
    } catch (error) {
      toast.error('Failed to delete module')
    }
  }

  const deleteContent = async (moduleId: string, content: any) => {
    try {
      let endpoint = ''
      switch (content.content_type) {
        case 'lesson':
          endpoint = `/api/courses/${courseId}/modules/${moduleId}/lessons/${content.id}`
          break
        case 'media':
          endpoint = `/api/courses/${courseId}/media/${content.id}`
          break
        case 'quiz':
          endpoint = `/api/courses/${courseId}/quizzes/${content.id}`
          break
      }

      const response = await fetch(endpoint, {
        method: 'DELETE',
      })
      const data = await response.json()

      if (data.success) {
        setStructure(prev => {
          const newStructure = { ...prev }
          const module = newStructure.modules.find(m => m.id === moduleId)
          if (module) {
            module.children = module.children.filter(c => c.id !== content.id)
          }
          return newStructure
        })
        toast.success('Content deleted successfully')
      }
    } catch (error) {
      toast.error('Failed to delete content')
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return

    const newStructure = { ...structure }
    // Handle reordering logic here
    // This will need to handle modules, lessons, media, and quizzes

    try {
      await fetch(`/api/courses/${courseId}/structure`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ structure: newStructure }),
      })
      setStructure(newStructure)
    } catch (error) {
      toast.error('Failed to update course structure')
    }
  }

  const addModule = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/modules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newItemName }),
      })
      const data = await response.json()
      if (data.success) {
        setStructure(prev => ({
          ...prev,
          modules: [...prev.modules, { ...data.module, children: [] }],
        }))
        setNewItemName('')
        setIsAddingModule(false)
        toast.success('Module added successfully')
      }
    } catch (error) {
      toast.error('Failed to add module')
    }
  }

  const addContent = async () => {
    if (!selectedModuleId) return

    try {
      let endpoint = ''
      let body: Record<string, any> = { name: newItemName }

      switch (newItemType) {
        case 'lesson':
          endpoint = `/api/courses/${courseId}/modules/${selectedModuleId}/lessons`
          break
        case 'media':
          endpoint = `/api/courses/${courseId}/media`
          body = { ...body, media_type: 'video', media_url: '' }
          break
        case 'quiz':
          endpoint = `/api/courses/${courseId}/quizzes`
          break
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await response.json()

      if (data.success) {
        // Refresh the course structure after adding new content
        const structureResponse = await fetch(`/api/courses/${courseId}/structure`)
        const structureData = await structureResponse.json()
        
        if (structureData.success) {
          setStructure({
            modules: structureData.structure?.map((module: any) => ({
              ...module,
              children: module.children || []
            })) || []
          })
          setNewItemName('')
          setIsAddingContent(false)
          toast.success('Content added successfully')
        } else {
          toast.error('Content added but failed to refresh structure')
        }
      }
    } catch (error) {
      toast.error('Failed to add content')
    }
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />
      case 'quiz':
        return <Pencil className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }))
  }

  const refreshLessonContent = async (lessonId: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/lessons/${lessonId}/content`)
      const data = await response.json()
      
      if (data.success) {
        setStructure(prev => {
          const newStructure = { ...prev }
          let contentUpdated = false
          
          newStructure.modules = newStructure.modules.map(module => ({
            ...module,
            children: module.children.map(child => {
              if (child.id === lessonId && child.content_type === 'lesson') {
                contentUpdated = true
                return {
                  ...child,
                  content: data.content || []  // Ensure we have an empty array if no content
                }
              }
              return child
            })
          }))

          // If content wasn't updated, log a warning
          if (!contentUpdated) {
            console.warn(`Could not find lesson ${lessonId} to update content`)
          }

          return newStructure
        })
      } else {
        console.error('Failed to fetch lesson content:', data.error)
        toast.error('Failed to refresh lesson content')
      }
    } catch (error) {
      console.error('Failed to fetch lesson content:', error)
      toast.error('Failed to refresh lesson content')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Course Structure</h2>
        <Button onClick={() => setIsAddingModule(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="modules">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {(structure?.modules || []).map((module, moduleIndex) => (
                <Draggable key={module.id} draggableId={module.id} index={moduleIndex}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-4"
                    >
                      <div className="bg-card rounded-lg shadow-sm">
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold">{module.name}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedModuleId(module.id)}
                            >
                              <Plus className="h-4 w-4" />
                              Add Content
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteModule(module.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>

                        <Droppable droppableId={module.id} type="content">
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="p-4 pt-0"
                            >
                              {module.children?.map((content, contentIndex) => (
                                <Draggable
                                  key={content.id}
                                  draggableId={content.id}
                                  index={contentIndex}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className="mb-2 last:mb-0"
                                    >
                                      <div className="bg-background border rounded-lg">
                                        <div className="p-3 flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            <div {...provided.dragHandleProps}>
                                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            {content.content_type === 'lesson' ? (
                                              <FileText className="h-4 w-4" />
                                            ) : (
                                              <Video className="h-4 w-4" />
                                            )}
                                            <span>{content.name}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            {content.content_type === 'lesson' && (
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleLesson(content.id)}
                                              >
                                                {expandedLessons[content.id] ? (
                                                  <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                  <ChevronDown className="h-4 w-4" />
                                                )}
                                              </Button>
                                            )}
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => deleteContent(module.id, content)}
                                            >
                                              <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                          </div>
                                        </div>
                                        {content.content_type === 'lesson' && expandedLessons[content.id] && (
                                          <div className="p-4 border-t bg-muted/50">
                                            <div className="flex justify-between items-center mb-4">
                                              <h4 className="text-sm font-medium">Lesson Content</h4>
                                              <LessonMediaUpload
                                                courseId={courseId}
                                                lessonId={content.id}
                                                onContentAdded={() => refreshLessonContent(content.id)}
                                              />
                                            </div>
                                            <div className="space-y-4">
                                              {content.content?.map((item) => (
                                                <LessonContent key={item.id} content={item} />
                                              ))}
                                              {(!content.content || content.content.length === 0) && (
                                                <div className="text-sm text-muted-foreground text-center py-4">
                                                  No content added yet. Click "Add Content" to get started.
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={isAddingModule} onOpenChange={setIsAddingModule}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Module</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="moduleName">Module Name</Label>
              <Input
                id="moduleName"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter module name"
              />
            </div>
            <Button onClick={addModule}>Add Module</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddingContent} onOpenChange={setIsAddingContent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="contentType">Content Type</Label>
              <Select
                value={newItemType}
                onValueChange={(value: 'lesson' | 'media' | 'quiz') =>
                  setNewItemType(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lesson">Lesson</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="contentName">Content Name</Label>
              <Input
                id="contentName"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter content name"
              />
            </div>
            <Button onClick={addContent}>Add Content</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 