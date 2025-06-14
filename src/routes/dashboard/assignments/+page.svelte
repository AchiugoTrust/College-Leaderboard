<script lang="ts">
  import { authStore } from '$lib/stores/auth';
  import AssignmentCard from '$lib/components/AssignmentCard.svelte';
  
  $: user = $authStore.user;
  $: userRole = user?.role || 'student';
  
  // Mock assignment data
  const assignments = [
    {
      id: '1',
      title: 'React Component Architecture',
      course: 'Advanced Web Development',
      courseCode: 'CS401',
      dueDate: '2024-01-20T23:59:00',
      status: 'pending',
      description: 'Build a complex React application with proper component architecture.',
      points: 100,
      submitted: userRole === 'student' ? false : null,
      grade: userRole === 'lecturer' ? null : null
    },
    {
      id: '2',
      title: 'Database Design Project',
      course: 'Database Systems',
      courseCode: 'CS302',
      dueDate: '2024-01-25T23:59:00',
      status: 'submitted',
      description: 'Design and implement a normalized database for an e-commerce system.',
      points: 150,
      submitted: userRole === 'student' ? true : null,
      grade: userRole === 'lecturer' ? null : 85
    },
    {
      id: '3',
      title: 'Team Project Proposal',
      course: 'Software Engineering',
      courseCode: 'CS350',
      dueDate: '2024-01-18T17:00:00',
      status: 'graded',
      description: 'Submit a detailed proposal for your semester-long team project.',
      points: 75,
      submitted: userRole === 'student' ? true : null,
      grade: 92
    }
  ];
  
  let filterStatus = 'all';
  let filterCourse = 'all';
  
  $: filteredAssignments = assignments.filter(assignment => {
    const statusMatch = filterStatus === 'all' || assignment.status === filterStatus;
    const courseMatch = filterCourse === 'all' || assignment.courseCode === filterCourse;
    return statusMatch && courseMatch;
  });
  
  const courses = ['CS401', 'CS302', 'CS350'];
</script>

<svelte:head>
  <title>Assignments - University Management Platform</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">
        {userRole === 'student' ? 'My Assignments' : userRole === 'lecturer' ? 'Assignment Management' : 'All Assignments'}
      </h1>
      <p class="text-gray-600 mt-1">
        {userRole === 'student' ? 'Track and submit your assignments' : userRole === 'lecturer' ? 'Create and grade assignments' : 'System assignment overview'}
      </p>
    </div>
    
    {#if userRole === 'lecturer'}
      <button class="btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Create Assignment
      </button>
    {/if}
  </div>
  
  <!-- Filters -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
    <div class="flex flex-wrap gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select bind:value={filterStatus} class="input-field min-w-[120px]">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="submitted">Submitted</option>
          <option value="graded">Graded</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Course</label>
        <select bind:value={filterCourse} class="input-field min-w-[200px]">
          <option value="all">All Courses</option>
          {#each courses as course}
            <option value={course}>{course}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
  
  <!-- Assignment List -->
  <div class="space-y-4">
    {#each filteredAssignments as assignment}
      <AssignmentCard {assignment} {userRole} />
    {/each}
  </div>
  
  {#if filteredAssignments.length === 0}
    <div class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No assignments found</h3>
      <p class="mt-1 text-sm text-gray-500">
        {filterStatus !== 'all' || filterCourse !== 'all' 
          ? 'Try adjusting your filters to see more assignments.' 
          : 'No assignments available at the moment.'}
      </p>
    </div>
  {/if}
</div>