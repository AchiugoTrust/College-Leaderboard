<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Course } from '$lib/pocketbase';

  const dispatch = createEventDispatcher();

  export let course: Course;
  export let isEnrolled = false;
  export let loading = false;

  function handleEnroll() {
    dispatch('enroll', { courseId: course.id });
  }

  function handleDrop() {
    dispatch('drop', { courseId: course.id });
  }
</script>

<div class="card hover:shadow-lg transition-shadow duration-200">
  <div class="flex items-start justify-between mb-4">
    <div>
      <h3 class="text-lg font-semibold text-gray-900">{course.name}</h3>
      <p class="text-sm text-gray-600">{course.code}</p>
    </div>
    
    <span class="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
      {course.credits} Credits
    </span>
  </div>
  
  <p class="text-sm text-gray-600 mb-4">{course.description || 'No description available.'}</p>
  
  <div class="space-y-3 mb-4">
    <div class="flex items-center text-sm text-gray-600">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
      Lecturer: {course.lecturer}
    </div>
    
    <div class="flex items-center text-sm text-gray-600">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      {course.semester} {course.year}
    </div>

    {#if course.max_students}
      <div class="flex items-center text-sm text-gray-600">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
        </svg>
        Max {course.max_students} students
      </div>
    {/if}
  </div>
  
  <div class="flex justify-between items-center">
    <div class="text-sm text-gray-500">
      {#if isEnrolled}
        <span class="text-green-600 font-medium">✓ Enrolled</span>
      {:else}
        Available for enrollment
      {/if}
    </div>
    
    {#if isEnrolled}
      <button
        on:click={handleDrop}
        disabled={loading}
        class="btn-secondary text-sm"
      >
        {#if loading}
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Dropping...
        {:else}
          Drop Course
        {/if}
      </button>
    {:else}
      <button
        on:click={handleEnroll}
        disabled={loading}
        class="btn-primary text-sm"
      >
        {#if loading}
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Enrolling...
        {:else}
          Enroll Now
        {/if}
      </button>
    {/if}
  </div>
</div> 