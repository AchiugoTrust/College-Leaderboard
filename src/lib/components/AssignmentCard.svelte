<script lang="ts">
  export let assignment: {
    id: string;
    title: string;
    course: string;
    courseCode: string;
    dueDate: string;
    status: string;
    description: string;
    points: number;
    submitted?: boolean;
    grade?: number;
  };
  
  export let userRole: string;
  
  function formatDueDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  }
  
  function getStatusColor(status: string) {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      submitted: 'bg-blue-100 text-blue-800 border-blue-200',
      graded: 'bg-green-100 text-green-800 border-green-200',
      overdue: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.pending;
  }
  
  function getStatusIcon(status: string) {
    const icons = {
      pending: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      submitted: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      graded: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      overdue: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-2.265-.833-3.036 0l-6.928 12c-.77.833.192 2.5 1.732 2.5z'
    };
    return icons[status] || icons.pending;
  }
</script>

<div class="card hover:shadow-md transition-shadow duration-200">
  <div class="flex items-start justify-between mb-4">
    <div class="flex-1">
      <div class="flex items-center space-x-3 mb-2">
        <h3 class="text-lg font-semibold text-gray-900">{assignment.title}</h3>
        <span class="border rounded-full px-3 py-1 text-xs font-medium {getStatusColor(assignment.status)}">
          <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getStatusIcon(assignment.status)}></path>
          </svg>
          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
        </span>
      </div>
      
      <div class="flex items-center text-sm text-gray-600 space-x-4 mb-2">
        <span class="font-medium">{assignment.courseCode} - {assignment.course}</span>
        <span>{assignment.points} points</span>
      </div>
      
      <p class="text-sm text-gray-600 mb-3">{assignment.description}</p>
    </div>
  </div>
  
  <div class="flex items-center justify-between text-sm">
    <div class="flex items-center text-gray-600">
      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      {formatDueDate(assignment.dueDate)}
    </div>
    
    {#if assignment.grade !== undefined && assignment.grade !== null}
      <div class="flex items-center text-green-600 font-medium">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
        </svg>
        {assignment.grade}/{assignment.points}
      </div>
    {/if}
  </div>
  
  <div class="mt-4 flex justify-between">
    <button class="btn-secondary text-sm">
      View Details
    </button>
    
    {#if userRole === 'student'}
      {#if assignment.status === 'pending'}
        <button class="btn-primary text-sm">
          Submit Assignment
        </button>
      {:else if assignment.status === 'submitted'}
        <button class="btn-secondary text-sm" disabled>
          Submitted
        </button>
      {/if}
    {:else if userRole === 'lecturer'}
      {#if assignment.status === 'submitted'}
        <button class="btn-primary text-sm">
          Grade Assignment
        </button>
      {:else}
        <button class="btn-secondary text-sm">
          Edit Assignment
        </button>
      {/if}
    {/if}
  </div>
</div>