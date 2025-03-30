'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle, Trash2, MoveUp, MoveDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

interface Objective {
  id: string
  course_id: string
  objective_text: string
  objective_order: number
}

interface LearningObjectivesFormProps {
  courseId: string
  objectives: Objective[]
}

export default function LearningObjectivesForm({
  courseId,
  objectives: initialObjectives,
}: LearningObjectivesFormProps) {
  const [objectives, setObjectives] = useState<Objective[]>(initialObjectives)
  const [newObjective, setNewObjective] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const loggedRef = useRef(false)
  
  // Log to terminal when component mounts
  useEffect(() => {
    if (loggedRef.current) return;
    
    const logToTerminal = async () => {
      try {
        loggedRef.current = true;
        await fetch(`/api/courses/${courseId}/log`, {
          method: 'GET'
        })
      } catch (error) {
        // Ignore any errors, this is just for logging
        console.log('Learning objectives tab loaded')
      }
    }
    
    logToTerminal()
  }, [courseId]);
  
  const handleAddObjective = async () => {
    if (!newObjective.trim()) return
    
    setIsSaving(true)
    setError(null)
    
    try {
      // Get the next order number
      const nextOrder = objectives.length > 0 
        ? Math.max(...objectives.map(o => o.objective_order)) + 1 
        : 1
      
      const response = await fetch(`/api/courses/${courseId}/objectives`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objective_text: newObjective,
          objective_order: nextOrder,
        })
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add objective')
      }
      
      const data = await response.json()
      
      // Update local state
      if (data.success && data.objective) {
        setObjectives([...objectives, data.objective])
        setNewObjective('')
        
        toast({
          title: 'Success',
          description: 'Objective added successfully',
        })
      }
    } catch (err: any) {
      console.error('Error adding objective:', err)
      setError(err.message || 'Failed to add objective')
      
      toast({
        title: 'Error',
        description: err.message || 'Failed to add objective',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleRemoveObjective = async (id: string) => {
    setIsSaving(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/courses/${courseId}/objectives/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to remove objective')
      }
      
      // Update local state
      setObjectives(objectives.filter(o => o.id !== id))
      
      toast({
        title: 'Success',
        description: 'Objective removed successfully',
      })
    } catch (err: any) {
      console.error('Error removing objective:', err)
      setError(err.message || 'Failed to remove objective')
      
      toast({
        title: 'Error',
        description: err.message || 'Failed to remove objective',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleMoveObjective = async (id: string, direction: 'up' | 'down') => {
    const index = objectives.findIndex(o => o.id === id)
    if (index === -1) return
    
    const newIndex = direction === 'up' ? index - 1 : index + 1
    
    // Don't move outside array bounds
    if (newIndex < 0 || newIndex >= objectives.length) return
    
    setIsSaving(true)
    setError(null)
    
    try {
      // Create a copy of the objectives array
      const newObjectives = [...objectives]
      
      // Store the current orders for swapping
      const currentOrder = newObjectives[index].objective_order
      const targetOrder = newObjectives[newIndex].objective_order
      
      // Swap the order values
      newObjectives[index].objective_order = targetOrder
      newObjectives[newIndex].objective_order = currentOrder
      
      // Swap the positions in the array
      const temp = newObjectives[index]
      newObjectives[index] = newObjectives[newIndex]
      newObjectives[newIndex] = temp
      
      // Update in database using API
      const updates = [
        { id: newObjectives[index].id, objective_order: newObjectives[index].objective_order },
        { id: newObjectives[newIndex].id, objective_order: newObjectives[newIndex].objective_order }
      ]
      
      const response = await fetch(`/api/courses/${courseId}/objectives/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to reorder objectives')
      }
      
      // Update local state
      setObjectives(newObjectives)
      
      toast({
        title: 'Success',
        description: 'Objectives reordered successfully',
      })
    } catch (err: any) {
      console.error('Error reordering objectives:', err)
      setError(err.message || 'Failed to reorder objectives')
      
      toast({
        title: 'Error',
        description: err.message || 'Failed to reorder objectives',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }
  
  return (
    <div className="space-y-8 bg-white p-6 rounded-lg border">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Learning Objectives</h2>
        <p className="text-sm text-gray-500">
          Add specific objectives that students will achieve by taking this course.
        </p>
        
        <div className="space-y-4">
          {objectives.length === 0 ? (
            <p className="text-gray-500 italic">No objectives added yet.</p>
          ) : (
            objectives.map((objective, index) => (
              <div key={objective.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-md">
                <div className="flex-1">
                  <p>{objective.objective_text}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveObjective(objective.id, 'up')}
                    disabled={index === 0 || isSaving}
                    className="h-8 w-8 p-0"
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveObjective(objective.id, 'down')}
                    disabled={index === objectives.length - 1 || isSaving}
                    className="h-8 w-8 p-0"
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveObjective(objective.id)}
                    disabled={isSaving}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="pt-4 space-y-4">
          <h3 className="text-md font-medium">Add New Objective</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newObjective}
              onChange={(e) => setNewObjective(e.target.value)}
              placeholder="Enter a learning objective"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={handleAddObjective}
              disabled={!newObjective.trim() || isSaving}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 