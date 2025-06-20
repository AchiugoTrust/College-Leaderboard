<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore, utils } from '$lib/pocketbase';
  import CourseCard from '$lib/components/CourseCard.svelte';
  import CourseForm from '$lib/components/CourseForm.svelte';
  import DeleteConfirmationModal from '$lib/components/DeleteConfirmationModal.svelte';
  import type { Course } from '$lib/pocketbase';

  $: user = $authStore.user;
  $: userRole = user?.role || 'student';

  let courses: Course[] = [];
  let loading = true;
  let error = '';
  let showCreateForm = false;
  let showDeleteModal = false;
  let courseToDelete: { id: string; name: string } | null = null;
  let deleteLoading = false;

  // Load courses based on user role
  async function loadCourses() {
    loading = true;
    error = '';
    
    try {
      if (userRole === 'lecturer') {
        courses = await utils.getLecturerCourses(user!.id);
      } else if (userRole === 'student') {
        courses = await utils.getUserCourses(user!.id);
      } else {
        courses = await utils.getAvailableCourses();
      }
    } catch (err: any) {
      error = err.message || 'Failed to load courses';
      console.error('Error loading courses:', err);
    } finally {
      loading = false;
    }
  }

  // Handle course creation
  function handleCourseCreated(event: CustomEvent) {
    const newCourse = event.detail;
    courses = [newCourse, ...courses];
    showCreateForm = false;
  }

  // Handle course deletion request
  function handleDeleteRequest(event: CustomEvent) {
    const { courseId, courseName } = event.detail;
    courseToDelete = { id: courseId, name: courseName };
    showDeleteModal = true;
  }

  // Handle course deletion confirmation
  async function handleDeleteConfirm() {
    if (!courseToDelete) return;
    
    deleteLoading = true;
    try {
      await utils.deleteCourse(courseToDelete.id);
      courses = courses.filter(course => course.id !== courseToDelete!.id);
      showDeleteModal = false;
      courseToDelete = null;
    } catch (err: any) {
      error = err.message || 'Failed to delete course';
      console.error('Error deleting course:', err);
    } finally {
      deleteLoading = false;
    }
  }

  // Handle delete modal close
  function handleDeleteCancel() {
    showDeleteModal = false;
    courseToDelete = null;
  }

  // Load courses on mount and when user changes
  onMount(() => {
    if (user) {
      loadCourses();
    }
  });

  $: if (user) {
    loadCourses();
  }
</script>

<svelte:head>
  <title>Courses - University Management Platform</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">
        {userRole === 'student' ? 'My Courses' : userRole === 'lecturer' ? 'Teaching Courses' : 'All Courses'}
      </h1>
      <p class="text-gray-600 mt-1">
        {userRole === 'student' ? 'Manage your enrolled courses' : userRole === 'lecturer' ? 'Manage your teaching assignments' : 'System course overview'}
      </p>
    </div>
    
    {#if userRole === 'lecturer' || userRole === 'staff'}
      <button 
        on:click={() => showCreateForm = true}
        class="btn-primary"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Add Course
      </button>
    {/if}
  </div>

  {#if error}
    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      {error}
    </div>
  {/if}

  {#if loading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    </div>
  {:else if courses.length === 0}
    <div class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
      <p class="mt-1 text-sm text-gray-500">
        {userRole === 'student' ? 'You are not enrolled in any courses yet.' : userRole === 'lecturer' ? 'You are not teaching any courses yet.' : 'No courses available.'}
      </p>
      {#if userRole === 'lecturer'}
        <div class="mt-6">
          <button 
            on:click={() => showCreateForm = true}
            class="btn-primary"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create Your First Course
          </button>
        </div>
      {/if}
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each courses as course}
        <CourseCard 
          {course} 
          {userRole} 
          on:delete={handleDeleteRequest}
        />
      {/each}
    </div>
  {/if}
  
  {#if userRole === 'student'}
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Course Enrollment</h3>
      <p class="text-gray-600 mb-4">
        Browse available courses and enroll for the upcoming semester.
      </p>
      <a href="/dashboard/courses/enroll" class="btn-secondary">
        Browse Available Courses
      </a>
    </div>
  {/if}
</div>

<!-- Course Creation Form -->
<CourseForm 
  isOpen={showCreateForm}
  onClose={() => showCreateForm = false}
  on:courseCreated={handleCourseCreated}
/>

<!-- Delete Confirmation Modal -->
<DeleteConfirmationModal
  isOpen={showDeleteModal}
  title="Delete Course"
  message="Are you sure you want to delete this course? This action cannot be undone."
  itemName={courseToDelete?.name || ''}
  loading={deleteLoading}
  on:confirm={handleDeleteConfirm}
  on:cancel={handleDeleteCancel}
/>