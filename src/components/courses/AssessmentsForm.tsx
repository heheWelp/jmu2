'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, Trash2, FileText, Settings } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface Quiz {
  id: string
  name: string
  number: number
  course_order: number
  questions_count?: number
  settings?: QuizSettings
}

interface QuizSettings {
  id?: string
  quiz_id: string
  min_pass_score: number | null
  is_pass_required: boolean
  time_limit_minutes: number | null
  allow_retakes: boolean
  max_attempts: number | null
}

interface AssessmentsFormProps {
  courseId: string
  initialQuizzes?: Quiz[]
}

export default function AssessmentsForm({ courseId, initialQuizzes = [] }: AssessmentsFormProps) {
  const router = useRouter()
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes)
  const [isLoading, setIsLoading] = useState(false)
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  const [newQuizName, setNewQuizName] = useState('')
  const dataFetchedRef = useRef(false)
  
  // Settings state for selected quiz
  const [minPassScore, setMinPassScore] = useState<number | null>(null)
  const [isPassRequired, setIsPassRequired] = useState(false)
  const [timeLimit, setTimeLimit] = useState<number | null>(null)
  const [allowRetakes, setAllowRetakes] = useState(true)
  const [maxAttempts, setMaxAttempts] = useState<number | null>(null)
  
  // Active tab
  const [activeTab, setActiveTab] = useState('quizzes')

  // Load quizzes if not provided in props
  useEffect(() => {
    // Prevent multiple fetches
    if (dataFetchedRef.current) return;
    
    if (initialQuizzes.length === 0) {
      const fetchQuizzes = async () => {
        try {
          dataFetchedRef.current = true;
          const response = await fetch(`/api/courses/${courseId}/quizzes`)
          if (!response.ok) throw new Error('Failed to fetch quizzes')
          
          const data = await response.json()
          if (data.success && data.quizzes) {
            setQuizzes(data.quizzes)
          }
        } catch (error) {
          console.error('Error fetching quizzes:', error)
          toast({
            title: 'Error',
            description: 'Failed to load quizzes. Please try again.',
            variant: 'destructive',
          })
        }
      }
      
      fetchQuizzes()
    }
  }, [courseId, initialQuizzes.length])

  // Load quiz settings when a quiz is selected
  useEffect(() => {
    if (!activeQuiz) return;
    
    if (activeQuiz.settings) {
      // Use cached settings if available
      setMinPassScore(activeQuiz.settings.min_pass_score)
      setIsPassRequired(activeQuiz.settings.is_pass_required)
      setTimeLimit(activeQuiz.settings.time_limit_minutes)
      setAllowRetakes(activeQuiz.settings.allow_retakes)
      setMaxAttempts(activeQuiz.settings.max_attempts)
    } else {
      // Otherwise fetch settings
      const fetchQuizSettings = async () => {
        try {
          const response = await fetch(`/api/courses/${courseId}/quizzes/${activeQuiz.id}/settings`)
          if (!response.ok) throw new Error('Failed to fetch quiz settings')
          
          const data = await response.json()
          if (data.success && data.settings) {
            // Update settings
            setMinPassScore(data.settings.min_pass_score)
            setIsPassRequired(data.settings.is_pass_required)
            setTimeLimit(data.settings.time_limit_minutes)
            setAllowRetakes(data.settings.allow_retakes)
            setMaxAttempts(data.settings.max_attempts)
            
            // Cache settings in the quiz object
            setQuizzes(prevQuizzes => 
              prevQuizzes.map(quiz => 
                quiz.id === activeQuiz.id 
                  ? { ...quiz, settings: data.settings } 
                  : quiz
              )
            )
          }
        } catch (error) {
          console.error('Error fetching quiz settings:', error)
          toast({
            title: 'Error',
            description: 'Failed to load quiz settings. Please try again.',
            variant: 'destructive',
          })
        }
      }
      
      fetchQuizSettings()
    }
  }, [activeQuiz?.id, courseId])

  const handleCreateQuiz = async () => {
    if (!newQuizName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a quiz name',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    
    try {
      const newQuiz = {
        name: newQuizName,
        course_id: courseId,
        number: quizzes.length + 1,
        course_order: quizzes.length + 1
      }
      
      const response = await fetch(`/api/courses/${courseId}/quizzes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuiz)
      })
      
      if (!response.ok) throw new Error('Failed to create quiz')
      
      const result = await response.json()
      
      if (result.success) {
        // Update state with the newly created quiz
        const addedQuiz = result.quiz
        setQuizzes([...quizzes, addedQuiz])
        setNewQuizName('')
        setActiveQuiz(addedQuiz)
        toast({
          title: 'Success',
          description: 'Quiz created successfully',
        })
      } else {
        throw new Error(result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error creating quiz:', error)
      toast({
        title: 'Error',
        description: 'Failed to create quiz. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/courses/${courseId}/quizzes/${quizId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete quiz')
      
      const result = await response.json()
      
      if (result.success) {
        // Remove the quiz from state
        const updatedQuizzes = quizzes
          .filter(quiz => quiz.id !== quizId)
          .map((quiz, index) => ({ ...quiz, number: index + 1, course_order: index + 1 }))
        
        setQuizzes(updatedQuizzes)
        
        // Clear active quiz if the deleted quiz was active
        if (activeQuiz?.id === quizId) {
          setActiveQuiz(null)
        }
        
        toast({
          title: 'Success',
          description: 'Quiz deleted successfully',
        })
      } else {
        throw new Error(result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error deleting quiz:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete quiz. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleManageQuestions = (quiz: Quiz) => {
    router.push(`/admin/courses/${courseId}/quizzes/${quiz.id}/questions`)
  }

  const handleSaveSettings = async () => {
    if (!activeQuiz) return
    
    setIsLoading(true)
    
    try {
      const settings: QuizSettings = {
        quiz_id: activeQuiz.id,
        min_pass_score: minPassScore,
        is_pass_required: isPassRequired,
        time_limit_minutes: timeLimit,
        allow_retakes: allowRetakes,
        max_attempts: maxAttempts
      }
      
      const response = await fetch(`/api/courses/${courseId}/quizzes/${activeQuiz.id}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      
      if (!response.ok) throw new Error('Failed to update quiz settings')
      
      const result = await response.json()
      
      if (result.success) {
        // Update quiz settings in state
        setQuizzes(prevQuizzes => 
          prevQuizzes.map(quiz => 
            quiz.id === activeQuiz.id 
              ? { ...quiz, settings } 
              : quiz
          )
        )
        
        toast({
          title: 'Success',
          description: 'Quiz settings updated successfully',
        })
      } else {
        throw new Error(result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error updating quiz settings:', error)
      toast({
        title: 'Error',
        description: 'Failed to update quiz settings. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Course Assessments</h2>
        <p className="text-sm text-gray-500">
          Create and manage quizzes and assessments for your course.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="settings" disabled={!activeQuiz}>Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quizzes" className="space-y-4">
          {/* Create new quiz */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Add New Quiz</h3>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Enter quiz name"
                    value={newQuizName}
                    onChange={(e) => setNewQuizName(e.target.value)}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleCreateQuiz} 
                    disabled={isLoading || !newQuizName.trim()}
                  >
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Add Quiz
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quiz list */}
          <Card>
            <CardHeader>
              <CardTitle>Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              {quizzes.length === 0 ? (
                <div className="p-8 text-center border border-dashed rounded-lg">
                  <FileText className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    No quizzes created yet. Add a quiz using the form above.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quizzes.map((quiz) => (
                    <div 
                      key={quiz.id} 
                      className={`flex items-center p-4 border rounded-md transition-colors ${
                        activeQuiz?.id === quiz.id ? 'border-blue-500 bg-blue-50' : 'bg-white'
                      }`}
                      onClick={() => setActiveQuiz(quiz)}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{quiz.name}</h4>
                        <p className="text-sm text-gray-500">
                          {quiz.questions_count || 0} questions
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleManageQuestions(quiz)
                          }}
                        >
                          Manage Questions
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteQuiz(quiz.id)
                          }}
                          disabled={isLoading}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          {activeQuiz && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Settings for {activeQuiz.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Pass/Fail Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pass-required" className="text-base">Require Passing Score</Label>
                        <p className="text-sm text-gray-500">
                          Students must achieve a minimum score to pass
                        </p>
                      </div>
                      <Switch
                        id="pass-required"
                        checked={isPassRequired}
                        onCheckedChange={setIsPassRequired}
                        disabled={isLoading}
                      />
                    </div>
                    
                    {isPassRequired && (
                      <div className="space-y-2">
                        <Label htmlFor="min-pass-score">Minimum Passing Score (%)</Label>
                        <Input
                          id="min-pass-score"
                          type="number"
                          min="1"
                          max="100"
                          value={minPassScore || ''}
                          onChange={(e) => setMinPassScore(e.target.value ? parseInt(e.target.value, 10) : null)}
                          disabled={isLoading}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Time Limit */}
                  <div className="space-y-2">
                    <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                    <p className="text-sm text-gray-500 mb-2">
                      Set a time limit for completing the quiz (leave empty for no limit)
                    </p>
                    <Input
                      id="time-limit"
                      type="number"
                      min="1"
                      value={timeLimit || ''}
                      onChange={(e) => setTimeLimit(e.target.value ? parseInt(e.target.value, 10) : null)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  {/* Retake Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allow-retakes" className="text-base">Allow Retakes</Label>
                        <p className="text-sm text-gray-500">
                          Students can retry the quiz if they fail
                        </p>
                      </div>
                      <Switch
                        id="allow-retakes"
                        checked={allowRetakes}
                        onCheckedChange={setAllowRetakes}
                        disabled={isLoading}
                      />
                    </div>
                    
                    {allowRetakes && (
                      <div className="space-y-2">
                        <Label htmlFor="max-attempts">Maximum Attempts</Label>
                        <p className="text-sm text-gray-500 mb-2">
                          Maximum number of attempts allowed (leave empty for unlimited)
                        </p>
                        <Input
                          id="max-attempts"
                          type="number"
                          min="1"
                          value={maxAttempts || ''}
                          onChange={(e) => setMaxAttempts(e.target.value ? parseInt(e.target.value, 10) : null)}
                          disabled={isLoading}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSaveSettings}
                      disabled={isLoading}
                    >
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 