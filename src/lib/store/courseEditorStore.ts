import { create } from 'zustand'

interface CourseFormData {
  id?: string
  name?: string
  description?: string
  course_code?: string
  education_level?: string
  user_type?: string
  duration_hours?: number
}

interface CourseEditorState {
  formData: CourseFormData
  isDirty: boolean
  setFormData: (data: Partial<CourseFormData>) => void
  updateField: <K extends keyof CourseFormData>(key: K, value: CourseFormData[K]) => void
  resetForm: (initialData?: CourseFormData) => void
  setIsDirty: (isDirty: boolean) => void
}

export const useCourseEditorStore = create<CourseEditorState>((set) => ({
  formData: {},
  isDirty: false,
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
    isDirty: true
  })),
  updateField: (key, value) => set((state) => ({
    formData: { ...state.formData, [key]: value },
    isDirty: true
  })),
  resetForm: (initialData = {}) => set(() => ({
    formData: { ...initialData },
    isDirty: false
  })),
  setIsDirty: (isDirty) => set(() => ({ isDirty }))
})) 