Set up the page structure according to the following prompt:
   
<page-structure-prompt>
Next.js route structure based on navigation menu items (excluding main route). Make sure to wrap all routes with the component:

Routes:
- /dashboard
- /manage-users
- /manage-content
- /reports
- /tag-talk
- /settings

Page Implementations:
/dashboard:
Core Purpose: Provide overview of key metrics, recent activities, and quick actions
Key Components
- Stats cards (users, content, engagement)
- Activity feed component
- Quick action buttons
- Analytics charts
- Notification center
Layout Structure
- Grid layout with 4 columns on desktop, 2 on tablet, 1 on mobile
- Sticky header with key metrics
- Scrollable content area

/manage-users:
Core Purpose: User administration and management interface
Key Components
- User table

/edit forms
- Role management interface
- Bulk action tools
- Search and filter controls
Layout Structure:
- Split view with filters sidebar
- Main content area with responsive table
- Modal forms for user operations

/manage-content:
Core Purpose: Content creation, editing, and organization
Key Components
- Content list

/tag management
- Publishing workflow controls
Layout Structure:
- Three-panel layout (navigation, content list, editor)
- Collapsible panels for mobile
- Full-width editor on small screens

/reports:
Core Purpose: Data visualization and analytics reporting
Key Components
- Customizable dashboard
- Various chart types
- Export functionality
- Date range selectors
- Report templates
Layout Structure
- Configurable grid layout
- Draggable report widgets
- Expandable charts
- Filter panel

/tag-talk:
Core Purpose: Discussion and collaboration platform
Key Components
- Thread list
- Chat interface
- User mentions
- File sharing
- Topic organization
Layout Structure
- Two-column layout (threads, chat)
- Bottom composer
- Responsive single column on mobile
- Floating user list

/settings:
Core Purpose: System and user preferences configuration
Key Components
- Settings categories
- Form controls
- Save

/reset buttons
- Profile settings
- System preferences
Layout Structure:
- Tabbed interface
- Sectioned forms
- Responsive single column
- Sticky save button

Layouts:
AdminLayout:
- Applicable routes: All routes
- Core components
  - Sidebar navigation
  - Top header bar
  - User menu
  - Breadcrumbs
  - Content area
- Responsive behavior
  - Collapsible sidebar on mobile
  - Dropdown menu for navigation on small screens
  - Adjustable content padding
  - Sticky header

DashboardLayout
- Applicable routes: /dashboard, /reports
- Core components
  - Quick actions bar
  - Widgets container
  - Refresh controls
  - Export options
- Responsive behavior
  - Reflow widgets to single column
  - Collapsible sections
  - Touch-friendly controls

ContentLayout
- Applicable routes: /manage-content, /tag-talk
- Core components
  - Split view container
  - Toolbar
  - Preview pane
  - Status bar
- Responsive behavior
  - Stack panels vertically on mobile
  - Swipe between panels
  - Floating action buttons
</page-structure-prompt>