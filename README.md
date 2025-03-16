# JMU Online Academy Learning Management System

A comprehensive learning management system for Jufura Media Unlimited built with Next.js, React, TypeScript, Tailwind CSS, and Supabase.

## Overview

JMU Online Academy is a comprehensive learning management system (LMS) that provides tailored experiences for different user types through role-based access control and custom dashboards.

## User Types and Roles

The application supports four distinct user roles, each with specific permissions and navigation options:

### 1. Admin
- **Color Theme**: Blue
- **Primary Responsibilities**: System management, user administration, content oversight
- **Access Level**: Full access to all features and administrative functions
- **Special Notes**: Admin roles cannot be changed through the UI for security reasons

### 2. Instructor
- **Color Theme**: Green
- **Primary Responsibilities**: Teaching, course management, student assessment
- **Access Level**: Access to teaching-related features and instructor-specific tools
- **Special Notes**: Focused on educational content delivery and student interaction

### 3. Provider
- **Color Theme**: Purple
- **Primary Responsibilities**: Service provision, resource management
- **Access Level**: Similar to instructors but with provider-specific features
- **Special Notes**: Focused on providing specialized services or resources

### 4. Student
- **Color Theme**: Amber/Yellow
- **Primary Responsibilities**: Learning, assignment completion, course participation
- **Access Level**: Standard access to learning features
- **Special Notes**: Cannot access admin, instructor, or provider-specific features

## Role-Based Navigation

### Admin Navigation
- Dashboard (`/admin/dashboard`)
- Manage Users (`/admin/users`)
- Manage Content (`/admin/content`)
- Reports (`/admin/reports`)
- Tag & Talk (`/admin/tag-talk`)
- Settings (`/admin/settings`)

### Instructor Navigation
- Dashboard (`/instructor/dashboard`)
- View Courses (`/instructor/courses`)
- View Students (`/instructor/students`)
- Reports (`/instructor/reports`)
- Tag & Talk (`/instructor/tag-talk`)
- Profile (`/instructor/profile`)
- Take Instructor Assessments (`/instructor/assessments`)

### Provider Navigation
- Dashboard (`/provider/dashboard`)
- View Courses (`/provider/courses`)
- View Students (`/provider/students`)
- Reports (`/provider/reports`)
- Tag & Talk (`/provider/tag-talk`)
- Profile (`/provider/profile`)
- Take Provider Assessments (`/provider/assessments`)

### Student Navigation
- Dashboard (`/student/dashboard`)
- My Courses (`/student/courses`)
- Assignments (`/student/assignments`)
- Grades (`/student/grades`)
- Calendar (`/student/calendar`)
- Tag & Talk (`/student/tag-talk`)
- Profile (`/student/profile`)

## Dashboard Features

### Admin Dashboard
- System overview with total users, active courses, new enrollments, and system uptime
- User management statistics showing counts of admins, instructors, providers, and students
- Content management metrics for courses, learning materials, and assessments
- Recent activity table showing user actions across the platform
- Quick actions for adding users, creating courses, generating reports, and accessing settings

### Instructor Dashboard
- Course overview with active courses, total students, course materials, and average rating
- Student statistics showing active students, attendance, assignment completion, and at-risk students
- Today's schedule with upcoming classes and office hours
- Course management table with progress tracking
- Quick actions for creating assignments, grading submissions, messaging students, and course settings

### Provider Dashboard
- Services overview with active services, total students, service requests, and average rating
- Student activity metrics for active students, new enrollments, support requests, and discussions
- Service management table with status tracking
- Quick actions for creating services, responding to requests, messaging students, and profile updates

### Student Dashboard
- Learning progress with enrolled courses, completed courses, pending assignments, and average grade
- Upcoming deadlines for assignments and quizzes
- Course enrollment table with progress bars and grades
- Quick actions for browsing courses, submitting assignments, viewing grades, and profile updates

## Authentication and Authorization

- User authentication is handled through Supabase
- User roles are stored in Supabase user metadata
- Role-based access control is implemented in both frontend components and middleware
- Protected routes require authentication
- Admin routes require admin role verification
- Super admin email is hardcoded for additional security

## Tech Stack

- **Frontend**: Next.js App Router, React, TypeScript, Tailwind CSS
- **Backend**: Supabase for authentication, database, and storage
- **UI Components**: Custom components with Shadcn UI and Radix UI
- **Styling**: Responsive design with Tailwind CSS
- **Icons**: Lucide React icons

## Special Features

- **Tag & Talk**: A communication platform available to all user types
- **Educator Functions**: Shared functionality between instructors and providers
- **Role-specific Assessments**: Tailored assessments for instructors and providers
- **Dynamic Dashboard Redirection**: Automatic redirection based on user role
- **Role-specific Color Schemes**: Visual differentiation between user interfaces

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Contains the main application code with Next.js App Router structure
- `src/components`: Reusable UI components
- `src/lib`: Utility functions and helpers
- `public`: Static assets

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Supabase](https://supabase.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
