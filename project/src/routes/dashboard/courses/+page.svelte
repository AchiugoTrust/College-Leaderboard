<script lang="ts">
  import { authStore } from '$lib/stores/auth';
  import CourseCard from '$lib/components/CourseCard.svelte';
  
  $: user = $authStore.user;
  $: userRole = user?.role || 'student';
  
  // Mock course data
  const courses = [
    {
      id: '1',
      name: 'Advanced Web Development',
      code: 'CS401',
      lecturer: 'Dr. Sarah Johnson',
      students: 45,
      progress: 75,
      nextClass: '2024-01-15T10:00:00',
      description: 'Advanced concepts in modern web development including frameworks, APIs, and deployment.'
    },
    {
      id: '2',
      name: 'Database Systems',
      code: 'CS302',
      lecturer: 'Prof. Michael Chen',
      students: 38,
      progress: 60,
      nextClass: '2024-01-16T14:00:00',
      description: 'Comprehensive study of database design, implementation, and optimization.'
    },
    {
      id: '3',
      name: 'Software Engineering',
      code: 'CS350',
      lecturer: 'Dr. Emily Rodriguez',
      students: 52,
      progress: 80,
      nextClass: '2024-01-17T09:00:00',
      description: 'Software development lifecycle, project management, and team collaboration.'
    }
  ];
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
      <button class="btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Add Course
      </button>
    {/if}
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each courses as course}
      <CourseCard {course} {userRole} />
    {/each}
  </div>
  
  {#if userRole === 'student'}
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Course Enrollment</h3>
      <p class="text-gray-600 mb-4">
        Browse available courses and enroll for the upcoming semester.
      </p>
      <button class="btn-secondary">
        Browse Available Courses
      </button>
    </div>
  {/if}
</div>