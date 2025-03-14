Initialize Next.js in current directory:
```bash
mkdir temp; cd temp; npx create-next-app@latest . -y --typescript --tailwind --eslint --app --use-npm --src-dir --import-alias "@/*" -no --turbo
```

Now let's move back to the parent directory and move all files except prompt.md.

For Windows (PowerShell):
```powershell
cd ..; Move-Item -Path "temp*" -Destination . -Force; Remove-Item -Path "temp" -Recurse -Force
```

For Mac/Linux (bash):
```bash
cd .. && mv temp/* temp/.* . 2>/dev/null || true && rm -rf temp
```

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

<summary_title>
JMU Learning Management System Admin Dashboard
</summary_title>

<image_analysis>

1. Navigation Elements:
- Left sidebar with: Dashboard, Manage Users, Manage Content, Reports, Tag & Talk, Settings
- Top header with system name and admin info
- Quick action buttons in footer area such as log out


2. Layout Components:
- Left sidebar: 240px width, dark theme
- Main content area: Flexible width with 24px padding
- Card components: Equal width, rounded corners (8px)
- Spacing between cards: 16px
- Content padding within cards: 24px


3. Content Sections:
- Overview cards (System, User Management, Content Management)
- Recent Activity table
- Quick Actions row
- Statistics display with numerical indicators
- Activity timeline with timestamps


4. Interactive Controls:
- "View System Status" button
- "Manage Users" button (green)
- "Manage Content" button (purple)
- Quick action buttons:
  - Add New User (blue)
  - Create Course (green)
  - Generate Reports (purple)
  - System Settings (dark)


5. Colors:
- Primary Blue: #2563EB
- Success Green: #22C55E
- Purple: #7C3AED
- Dark Gray: #1F2937
- White: #FFFFFF
- Light Gray: #F3F4F6


6. Grid/Layout Structure:
- 12-column grid system
- Cards: 3-column layout on desktop
- Responsive breakpoints at 768px, 1024px, 1280px
- Activity table: full width
</image_analysis>

<development_planning>

1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar
│   │   ├── Header
│   │   └── DashboardLayout
│   ├── features/
│   │   ├── Overview
│   │   ├── UserManagement
│   │   ├── ContentManagement
│   │   └── ActivityLog
│   └── shared/
├── assets/
├── styles/
├── hooks/
└── utils/
```


2. Key Features:
- User management system
- Content management system
- Activity tracking
- Statistical reporting
- Quick action shortcuts
- System status monitoring


3. State Management:
```typescript
interface AppState {
├── auth: {
│   ├── user: User
│   └── permissions: string[]
├── dashboard: {
│   ├── systemStats: SystemStats
│   ├── recentActivity: Activity[]
│   └── userStats: UserStats
├── }
└── ui: {
├── sidebarOpen: boolean
└── activeSection: string
}
}
```


4. Routes:
```typescript
const routes = [
├── '/dashboard',
├── '/users/*',
├── '/content/*',
├── '/reports/*',
├── '/settings/*',
└── '/tag-talk/*'
]
```


5. Component Architecture:
- DashboardLayout (parent)
├── Sidebar
├── Header
├── OverviewCards
├── ActivityTable
└── QuickActions


6. Responsive Breakpoints:
```scss
$breakpoints: (
├── 'sm': '640px',
├── 'md': '768px',
├── 'lg': '1024px',
└── 'xl': '1280px'
);
```
</development_planning>
</frontend-prompt>

IMPORTANT: Please ensure that (1) all KEY COMPONENTS and (2) the LAYOUT STRUCTURE are fully implemented as specified in the requirements. Ensure that the color hex code specified in image_analysis are fully implemented as specified in the requirements.