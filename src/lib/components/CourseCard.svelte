<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let course: {
    id: string;
    name: string;
    code: string;
    lecturer: string;
    students: number;
    progress: number;
    nextClass: string;
    description: string;
  };
  
  export let userRole: string;
  
  function formatNextClass(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = date.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
    
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (isToday) return `Today at ${timeStr}`;
    if (isTomorrow) return `Tomorrow at ${timeStr}`;
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ` at ${timeStr}`;
  }

  function handleDelete() {
    // Dispatch delete event to parent component
    dispatch('delete', { courseId: course.id, courseName: course.name });
  }
</script>

<div class="card hover:shadow-lg transition-shadow duration-200 cursor-pointer">
  <div class="flex items-start justify-between mb-4">
    <div>
      <h3 class="text-lg font-semibold text-gray-900">{course.name}</h3>
      <p class="text-sm text-gray-600">{course.code}</p>
    </div>
    
    <div class="flex items-center space-x-2">
      <span class="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full">
        {course.progress}% Complete
      </span>
      
      {#if userRole === 'lecturer'}
        <button
          on:click|stopPropagation={handleDelete}
          class="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded transition-colors"
          title="Delete course"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      {/if}
    </div>
  </div>
  
  <p class="text-sm text-gray-600 mb-4">{course.description}</p>
  
  <div class="space-y-3">
    {#if userRole === 'student'}
      <div class="flex items-center text-sm text-gray-600">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        Instructor: {course.lecturer}
      </div>
    {/if}
    
    <div class="flex items-center text-sm text-gray-600">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      Next class: {formatNextClass(course.nextClass)}
    </div>
    
    {#if userRole === 'lecturer' || userRole === 'staff'}
      <div class="flex items-center text-sm text-gray-600">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
        </svg>
        {course.students} students enrolled
      </div>
    {/if}
  </div>
  
  <!-- Progress Bar -->
  <div class="mt-4">
    <div class="bg-gray-200 rounded-full h-2">
      <div 
        class="bg-primary-600 h-2 rounded-full transition-all duration-300"
        style="width: {course.progress}%"
      ></div>
    </div>
  </div>
  
  <div class="mt-4 flex justify-between">
    <button class="btn-secondary text-sm">
      View Details
    </button>
    
    {#if userRole === 'student'}
      <button class="btn-primary text-sm">
        Enter Course
      </button>
    {:else if userRole === 'lecturer'}
      <button class="btn-primary text-sm">
        Manage Course
      </button>
    {/if}
  </div>
</div>