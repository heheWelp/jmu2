Set up the frontend according to the following prompt:
  <frontend-prompt>
  Create detailed components with these requirements:
  1. Use 'use client' directive for client-side components
  2. Make sure to concatenate strings correctly using backslash
  3. Style with Tailwind CSS utility classes for responsive design
  4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
  5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
  6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
  7. Create root layout.tsx page that wraps necessary navigation items to all pages
  8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
  9. Accurately implement necessary grid layouts
  10. Follow proper import practices:
     - Use @/ path aliases
     - Keep component imports organized
     - Update current src/app/page.tsx with new comprehensive code
     - Don't forget root route (page.tsx) handling
     - You MUST complete the entire prompt before stopping
  </frontend-prompt>

  <summary_title>
Music Academy Course Management Dashboard
</summary_title>

<image_analysis>
1. Navigation Elements:
- Primary navigation: Admin Edit Course (Basic Info), Admin Edit Course (Learning Objectives), Admin Edit Courses (Course Structure), Admin Edit Course (Media Content), Admin Edit Course (Feedback Settings), Admin Edit Course (Assessments), Admin Edit Course (Review)
- Left sidebar navigation: 60px width, dark blue (#1A1F36)
- Menu items: Dashboard, Manage Users, Manage Content, Reports, Tips & Talk, Settings
- Logo: "JMU Academy" in top left corner
- "+ Create Course" button in top right (black background)

2. Layout Components:
- Main container: ~1200px max-width
- Left sidebar: 240px fixed width
- Content area: Flexible width with 24px padding
- Course cards: ~350px width, flexible height
- Card grid: 3 columns with 24px gap

3. Content Sections:
- Header with "Courses" title
- Course grid displaying:
  - Course thumbnail image
  - Course title
  - Status badge (Draft/Published)
  - Course details (Code, Type, Level, Duration)
  - Course description
  - Action buttons (Edit, View, Publish/Unpublish, Delete)

4. Interactive Controls:
- Action buttons per course:
  - Edit (icon button)
  - View (icon button)
  - Publish/Unpublish (text button)
  - Delete (red button)
- Create Course button (fixed position)

5. Colors:
- Primary: #1A1F36 (sidebar)
- Secondary: #FFFFFF (background)
- Accent: #FF0000 (delete button)
- Status: #00FF00 (published), #808080 (draft)
- Text: #000000, #666666 (description)

6. Grid/Layout Structure:
- 12-column grid system
- 24px grid gap
- Responsive breakpoints:
  - Desktop: 3 columns
  - Tablet: 2 columns
  - Mobile: 1 column
</image_analysis>

<development_planning>
1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── CourseGrid.tsx
│   ├── features/
│   │   ├── CourseCard.tsx
│   │   ├── CreateCourse.tsx
│   │   └── CourseActions.tsx
│   └── shared/
│       ├── Button.tsx
│       └── StatusBadge.tsx
├── assets/
├── styles/
├── hooks/
└── utils/
```

2. Key Features:
- Course CRUD operations
- Status management (Draft/Published)
- Image upload and management
- Role-based access control
- Course filtering and search

3. State Management:
```typescript
interface AppState {
  courses: {
    items: Course[]
    loading: boolean
    error: string | null
  }
  ui: {
    selectedCourse: string | null
    filterStatus: 'all' | 'draft' | 'published'
    searchQuery: string
  }
}
```

4. Component Architecture:
- CourseGrid (container)
  - CourseCard (presentation)
    - StatusBadge (shared)
    - ActionButtons (shared)
  - CreateCourse (feature)
  - FilterControls (feature)

5. Responsive Breakpoints:
```scss
$breakpoints: (
  'mobile': 320px,
  'tablet': 768px,
  'desktop': 1024px,
  'wide': 1200px
);
```
</development_planning>