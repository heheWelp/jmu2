'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

interface FeedbackSettingsFormProps {
  courseId: string
  initialSettings?: {
    feedback_enabled: boolean
    feedback_type: string | null
    feedback_frequency: string | null
  }
}

export default function FeedbackSettingsForm({ 
  courseId, 
  initialSettings = { 
    feedback_enabled: false, 
    feedback_type: null, 
    feedback_frequency: null 
  } 
}: FeedbackSettingsFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [feedbackEnabled, setFeedbackEnabled] = useState(initialSettings.feedback_enabled)
  const [feedbackType, setFeedbackType] = useState<string | null>(initialSettings.feedback_type)
  const [feedbackFrequency, setFeedbackFrequency] = useState<string | null>(initialSettings.feedback_frequency)

  // Add an effect to log to terminal on component mount
  useEffect(() => {
    const logToTerminal = async () => {
      try {
        await fetch(`/api/courses/${courseId}/log`, {
          method: 'GET'
        })
      } catch (error) {
        // Ignore any errors, this is just for logging
        console.log('Feedback settings tab loaded')
      }
    }
    
    logToTerminal()
  }, [courseId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = {
        feedback_enabled: feedbackEnabled,
        feedback_type: feedbackEnabled ? feedbackType : null,
        feedback_frequency: feedbackEnabled ? feedbackFrequency : null
      }

      const response = await fetch(`/api/courses/${courseId}/feedback-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) throw new Error('Failed to update feedback settings')
      
      const result = await response.json()
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Feedback settings updated successfully',
        })
      } else {
        throw new Error(result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error updating feedback settings:', error)
      toast({
        title: 'Error',
        description: 'Failed to update feedback settings. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Feedback Settings</h2>
        <p className="text-sm text-gray-500">
          Configure how students can provide feedback for this course.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-8">
            {/* Enable/Disable Feedback */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="feedback-toggle" className="text-base">Enable Course Feedback</Label>
                <p className="text-sm text-gray-500">
                  Allow students to provide feedback on this course
                </p>
              </div>
              <Switch
                id="feedback-toggle"
                checked={feedbackEnabled}
                onCheckedChange={setFeedbackEnabled}
                disabled={isLoading}
              />
            </div>

            {feedbackEnabled && (
              <>
                {/* Feedback Type */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">Feedback Type</Label>
                    <p className="text-sm text-gray-500 mb-2">
                      Select how students can provide feedback
                    </p>
                  </div>
                  
                  <RadioGroup
                    value={feedbackType || ''}
                    onValueChange={setFeedbackType}
                    disabled={isLoading}
                    className="grid gap-4 md:grid-cols-2"
                  >
                    <div className="flex items-start space-x-3 border p-4 rounded-md">
                      <RadioGroupItem value="star-rating" id="star-rating" className="mt-1" />
                      <div>
                        <Label htmlFor="star-rating" className="font-medium">Star Rating</Label>
                        <p className="text-sm text-gray-500">
                          Simple 1-5 star rating system
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border p-4 rounded-md">
                      <RadioGroupItem value="text-comments" id="text-comments" className="mt-1" />
                      <div>
                        <Label htmlFor="text-comments" className="font-medium">Text Comments</Label>
                        <p className="text-sm text-gray-500">
                          Allow written comments
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border p-4 rounded-md">
                      <RadioGroupItem value="survey" id="survey" className="mt-1" />
                      <div>
                        <Label htmlFor="survey" className="font-medium">Survey</Label>
                        <p className="text-sm text-gray-500">
                          Multi-question feedback form
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border p-4 rounded-md">
                      <RadioGroupItem value="comprehensive" id="comprehensive" className="mt-1" />
                      <div>
                        <Label htmlFor="comprehensive" className="font-medium">Comprehensive</Label>
                        <p className="text-sm text-gray-500">
                          Ratings, comments, and structured questions
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Feedback Frequency */}
                <div className="space-y-2">
                  <Label htmlFor="feedback-frequency">Feedback Frequency</Label>
                  <Select
                    value={feedbackFrequency || ''}
                    onValueChange={setFeedbackFrequency}
                    disabled={isLoading}
                  >
                    <SelectTrigger id="feedback-frequency" className="w-full">
                      <SelectValue placeholder="Select when to collect feedback" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="end-of-course">End of Course Only</SelectItem>
                      <SelectItem value="end-of-module">After Each Module</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="after-assessment">After Each Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                Save Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
} 