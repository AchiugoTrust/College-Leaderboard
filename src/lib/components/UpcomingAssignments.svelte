<script lang="ts">
  import { onMount } from 'svelte';
  import type { Assignment, Course } from '$lib/pocketbase';
  import { authStore, utils } from '$lib/pocketbase';
  
  let assignments: (Assignment & { course_name?: string })[] = [];
  let loading = true;
  let error = '';
  
  onMount(async () => {
    if ($authStore.user) {
      try {
        const userAssignments = await utils.getUpcomingAssignments($authStore.user.id);
        
        // Transform the data to include course names
        assignments = userAssignments.map((assignment: any) => ({
          ...assignment,
          course_name: assignment.expand?.course?.name || assignment.course
        }));
        
      } catch (err) {
        console.error('Error fetching assignments:', err);
        error = 'Failed to load assignments';
      } finally {
        loading = false;
      }
    } else {
      loading = false;
    }
  });
  
  function getTimeUntilDue(dueDate: string) {
    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  }
  
  function getStatusColor(status: string) {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getSubmissionStatus(assignment: Assignment): string {
    // Check if user has submitted this assignment
    if (assignment.expand?.submissions && assignment.expand.submissions.length > 0) {
      return 'submitted';
    }
    
    // Check if assignment is overdue
    const now = new Date();
    const due = new Date(assignment.due_date);
    if (due < now) {
      return 'overdue';
    }
    
    return 'pending';
  }
</script>

<div class="card">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-gray-900">Upcoming Assignments</h3>
    <a href="/dashboard/assignments" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
      View All
    </a>
  </div>
  
  {#if loading}
    <div class="space-y-3">
      {#each Array(3) as _}
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-pulse">
          <div class="flex-1">
            <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div class="ml-4">
            <div class="h-6 bg-gray-300 rounded-full w-16"></div>
          </div>
        </div>
      {/each}
    </div>
  {:else if error}
    <div class="text-center py-8">
      <p class="text-red-600 text-sm">{error}</p>
    </div>
  {:else if assignments.length === 0}
    <div class="text-center py-8">
      <p class="text-gray-500 text-sm">No upcoming assignments</p>
    </div>
  {:else}
    <div class="space-y-3">
      {#each assignments as assignment}
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">{assignment.title}</p>
            <div class="flex items-center text-xs text-gray-500 mt-1">
              <span>{assignment.course_name || assignment.course}</span>
              <span class="mx-2">•</span>
              <span>{getTimeUntilDue(assignment.due_date)}</span>
            </div>
          </div>
          
          <div class="ml-4">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(getSubmissionStatus(assignment))}">
              {getSubmissionStatus(assignment).replace('-', ' ')}
            </span>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>