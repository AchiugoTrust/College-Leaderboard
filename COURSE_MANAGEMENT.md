# Course Management System

This document describes the course management functionality that allows lecturers to create and delete courses, and students to enroll in them.

## Features

### For Lecturers

#### Creating Courses
- **Access**: Lecturers can create courses from the main courses page
- **Form Fields**:
  - Course Name (required)
  - Course Code (required)
  - Description
  - Credits (1-6)
  - Department (required)
  - Maximum Students
  - Semester (Fall/Spring/Summer)
  - Year
  - Active Status

#### Deleting Courses
- **Safety Checks**: Courses can only be deleted if:
  - No students are currently enrolled
  - No assignments exist for the course
- **Confirmation**: Delete action requires confirmation via modal
- **Visual Indicator**: Delete button appears as a trash icon on course cards

#### Course Management
- View all courses they are teaching
- See enrollment statistics
- Manage course content and assignments

### For Students

#### Course Enrollment
- **Browse Available Courses**: Students can view all active courses
- **Enrollment Process**: One-click enrollment with validation
- **Drop Courses**: Students can drop courses they're enrolled in
- **Enrollment Limits**: Respects course capacity limits
- **Duplicate Prevention**: Cannot enroll in the same course twice

#### Course Viewing
- View enrolled courses with progress tracking
- See course details including instructor, schedule, and description
- Access course-specific content and assignments

## Technical Implementation

### Components Created

1. **CourseForm.svelte** - Modal form for creating new courses
2. **DeleteConfirmationModal.svelte** - Reusable confirmation modal
3. **CourseEnrollmentCard.svelte** - Card component for course enrollment
4. **Updated CourseCard.svelte** - Added delete functionality for lecturers

### Database Functions

Added to `src/lib/pocketbase.ts`:

- `createCourse()` - Create new course
- `updateCourse()` - Update existing course
- `deleteCourse()` - Delete course with safety checks
- `getLecturerCourses()` - Get courses taught by a lecturer
- `getAvailableCourses()` - Get all active courses
- `enrollStudent()` - Enroll student in course
- `dropStudent()` - Drop student from course

### Pages

1. **Main Courses Page** (`/dashboard/courses`) - Shows courses based on user role
2. **Course Enrollment Page** (`/dashboard/courses/enroll`) - Student enrollment interface

## User Experience

### Lecturer Workflow
1. Navigate to Courses page
2. Click "Add Course" button
3. Fill out course creation form
4. Submit to create course
5. Course appears in their teaching list
6. Can delete courses using trash icon (with confirmation)

### Student Workflow
1. Navigate to Courses page
2. Click "Browse Available Courses"
3. View all available courses
4. Click "Enroll Now" on desired courses
5. View enrolled courses on main courses page
6. Can drop courses if needed

## Security & Validation

- **Role-based Access**: Only lecturers can create/delete courses
- **Enrollment Validation**: Prevents duplicate enrollments and respects capacity
- **Deletion Safety**: Prevents deletion of courses with active enrollments
- **Form Validation**: Required fields and data type validation
- **Error Handling**: Comprehensive error messages for all operations

## Future Enhancements

- Course editing functionality
- Bulk enrollment operations
- Course prerequisites system
- Waitlist functionality for full courses
- Course scheduling and time conflicts
- Advanced filtering and search
- Course templates for quick creation 