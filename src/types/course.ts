export type ContentType = 'module' | 'lesson' | 'media' | 'quiz';

export interface CourseContentItem {
  id: string;
  content_type: ContentType;
  content_id: string;
  parent_id: string | null;
  display_order: number;
}

export interface ModuleContent {
  id: string;
  name: string;
  course_id: string;
  content_type: 'module';
  children: (LessonContent | MediaContent | QuizContent)[];
}

export interface LessonContent {
  id: string;
  name: string;
  module_id: string;
  content_type: 'lesson';
  children: (MediaContent | QuizContent)[];
}

export interface MediaContent {
  id: string;
  name: string;
  media_type: string;
  media_url: string;
  content_type: 'media';
}

export interface QuizContent {
  id: string;
  name: string;
  content_type: 'quiz';
  description?: string;
  settings?: {
    min_pass_score?: number;
    is_pass_required?: boolean;
    time_limit_minutes?: number;
    allow_retakes?: boolean;
    max_attempts?: number;
  };
}

export interface CourseStructure {
  modules: ModuleContent[];
} 