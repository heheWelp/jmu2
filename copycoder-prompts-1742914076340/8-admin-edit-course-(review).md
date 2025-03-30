<summary_title>
Course Creation/Edit Interface - Multi-Step Course Configuration Form
</summary_title>

<image_analysis>
1. Content Structure:
- Main Content Elements:
  * Progress stepper (7 steps)
  * Form sections for Basic Info, Learning Objectives, Course Structure, etc.
  * Completion status indicators
  * Navigation controls
- Content Grouping:
  * Distinct collapsible sections for each course component
  * Media content metrics display
  * Assessment configuration areas
- Visual Hierarchy:
  * Step progression at top
  * Expandable content sections
  * Clear section headings
  * Status indicators and counts
- Content Types:
  * Form inputs
  * Progress indicators
  * Expandable panels
  * Numeric displays
  * Status badges
- Text Elements:
  * Section headers
  * Field labels
  * Help text
  * Navigation buttons
  * Status text

2. Layout Structure:
- Content Distribution:
  * Vertical stacking of major sections
  * Three-column layout for media metrics
  * Two-column layout for assessment components
- Spacing Patterns:
  * Consistent padding between sections
  * Grid-based alignment of form elements
  * Uniform margins around containers
- Container Structure:
  * Card-style containers for each section
  * Nested subsection containers
  * Fixed-width input fields
- Grid/Alignment:
  * Left-aligned labels and inputs
  * Balanced column layouts for metrics
  * Consistent form field widths

3. UI Components:
- Content Cards:
  * Expandable section panels
  * Media content cards
  * Assessment component cards
- Interactive Elements:
  * Form inputs
  * Expand/collapse toggles
  * Navigation buttons
  * Checkboxes
- Data Display:
  * Progress indicators
  * Numeric counters
  * Status badges
  * Completion checkmarks

4. Interactive Patterns:
- Content Interactions:
  * Section expansion/collapse
  * Form field input
  * Step navigation
  * Progress tracking
- State Changes:
  * Section expansion states
  * Form validation states
  * Completion status updates
- Dynamic Content:
  * Progress updates
  * Validation feedback
  * Counter updates
</image_analysis>

<development_planning>
1. Component Structure:
- Page-specific components:
  * CourseEditor container
  * StepProgress component
  * SectionContainer component
  * MediaMetrics component
  * AssessmentConfig component
- Props/Interfaces:
  * Course data model
  * Section completion status
  * Validation rules
  * Progress tracking

2. Content Layout:
- Implement responsive grid system
- Use CSS Grid for metrics displays
- Flexbox for form layouts
- Maintain consistent spacing scale

3. Integration Points:
- Theme integration for colors/typography
- Form validation system
- Progress tracking service
- Data persistence layer

4. Performance Considerations:
- Lazy load section content
- Optimize form validation
- Implement efficient state updates
- Cache form data locally
</development_planning>