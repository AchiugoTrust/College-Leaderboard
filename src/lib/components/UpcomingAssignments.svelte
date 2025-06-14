<script lang="ts">
  const assignments = [
    {
      id: '1',
      title: 'React Component Architecture',
      course: 'CS401',
      dueDate: '2024-01-20T23:59:00',
      status: 'pending'
    },
    {
      id: '2',
      title: 'SQL Query Optimization',
      course: 'CS302',
      dueDate: '2024-01-22T17:00:00',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Team Project Presentation',
      course: 'CS350',
      dueDate: '2024-01-25T14:00:00',
      status: 'pending'
    }
  ];
  
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
      default: return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<div class="card">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-gray-900">Upcoming Assignments</h3>
    <a href="/dashboard/assignments" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
      View All
    </a>
  </div>
  
  <div class="space-y-3">
    {#each assignments as assignment}
      <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-900">{assignment.title}</p>
          <div class="flex items-center text-xs text-gray-500 mt-1">
            <span>{assignment.course}</span>
            <span class="mx-2">•</span>
            <span>{getTimeUntilDue(assignment.dueDate)}</span>
          </div>
        </div>
        
        <div class="ml-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(assignment.status)}">
            {assignment.status.replace('-', ' ')}
          </span>
        </div>
      </div>
    {/each}
  </div>
</div>