<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore, utils } from '$lib/pocketbase';
  import CourseEnrollmentCard from '$lib/components/CourseEnrollmentCard.svelte';
  import type { Course } from '$lib/pocketbase';

  $: user = $authStore.user;
  $: userRole = user?.role || 'student';

  let availableCourses: Course[] = [];
  let enrolledCourseIds: string[] = [];
  let loading = true;
  let error = '';
  let enrollmentLoading: { [courseId: string]: boolean } = {};

  // Load available courses and user's enrollments
  async function loadData() {
    loading = true;
    error = '';
    
    try {
      // Load available courses
      availableCourses = await utils.getAvailableCourses();
      
      // Load user's enrolled courses
      if (userRole === 'student') {
        const enrolledCourses = await utils.getUserCourses(user!.id);
        enrolledCourseIds = enrolledCourses.map(course => course.id);
      }
    } catch (err: any) {
      error = err.message || 'Failed to load courses';
      console.error('Error loading courses:', err);
    } finally {
      loading = false;
    }
  }

  // Handle course enrollment
  async function handleEnroll(event: CustomEvent) {
    const { courseId } = event.detail;
    
    enrollmentLoading[courseId] = true;
    try {
      await utils.enrollStudent(user!.id, courseId);
      enrolledCourseIds = [...enrolledCourseIds, courseId];
    } catch (err: any) {
      error = err.message || 'Failed to enroll in course';
      console.error('Error enrolling in course:', err);
    } finally {
      enrollmentLoading[courseId] = false;
    }
  }

  // Handle course drop
  async function handleDrop(event: CustomEvent) {
    const { courseId } = event.detail;
    
    enrollmentLoading[courseId] = true;
    try {
      await utils.dropStudent(user!.id, courseId);
      enrolledCourseIds = enrolledCourseIds.filter(id => id !== courseId);
    } catch (err: any) {
      error = err.message || 'Failed to drop course';
      console.error('Error dropping course:', err);
    } finally {
      enrollmentLoading[courseId] = false;
    }
  }

  // Load data on mount and when user changes
  onMount(() => {
    if (user && userRole === 'student') {
      loadData();
    }
  });

  $: if (user && userRole === 'student') {
    loadData();
  }
</script>

<svelte:head>
  <title>Course Enrollment - University Management Platform</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Course Enrollment</h1>
      <p class="text-gray-600 mt-1">
        Browse available courses and enroll for the upcoming semester
      </p>
    </div>
    
    <a href="/dashboard/courses" class="btn-secondary">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      Back to My Courses
    </a>
  </div>

  {#if error}
    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      {error}
    </div>
  {/if}

  {#if userRole !== 'student'}
    <div class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Access Restricted</h3>
      <p class="mt-1 text-sm text-gray-500">
        Only students can access the course enrollment page.
      </p>
    </div>
  {:else if loading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    </div>
  {:else if availableCourses.length === 0}
    <div class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No courses available</h3>
      <p class="mt-1 text-sm text-gray-500">
        There are currently no courses available for enrollment.
      </p>
    </div>
  {:else}
    <!-- Course Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Available Courses</p>
            <p class="text-2xl font-semibold text-gray-900">{availableCourses.length}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Enrolled Courses</p>
            <p class="text-2xl font-semibold text-gray-900">{enrolledCourseIds.length}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Credits</p>
            <p class="text-2xl font-semibold text-gray-900">
              {availableCourses
                .filter(course => enrolledCourseIds.includes(course.id))
                .reduce((total, course) => total + course.credits, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each availableCourses as course}
        <CourseEnrollmentCard 
          {course}
          isEnrolled={enrolledCourseIds.includes(course.id)}
          loading={enrollmentLoading[course.id] || false}
          on:enroll={handleEnroll}
          on:drop={handleDrop}
        />
      {/each}
    </div>
  {/if}
</div> 