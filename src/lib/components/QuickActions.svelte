<script lang="ts">
  export let userRole: string;
  
  const studentActions = [
    { title: 'Submit Assignment', description: 'Upload your completed work', icon: 'upload', color: 'primary' },
    { title: 'View Grades', description: 'Check your latest scores', icon: 'star', color: 'secondary' },
    { title: 'Course Schedule', description: 'See upcoming classes', icon: 'calendar', color: 'accent' }
  ];
  
  const lecturerActions = [
    { title: 'Create Assignment', description: 'Add new assignment', icon: 'plus', color: 'primary' },
    { title: 'Grade Submissions', description: 'Review student work', icon: 'edit-3', color: 'secondary' },
    { title: 'Class Attendance', description: 'Mark attendance', icon: 'check', color: 'accent' }
  ];
  
  const staffActions = [
    { title: 'Add New Course', description: 'Create course offering', icon: 'plus', color: 'primary' },
    { title: 'Manage Users', description: 'Add students/lecturers', icon: 'users', color: 'secondary' },
    { title: 'System Reports', description: 'Generate analytics', icon: 'bar-chart', color: 'accent' }
  ];
  
  $: actions = userRole === 'student' ? studentActions : 
               userRole === 'lecturer' ? lecturerActions : 
               staffActions;
  
  const iconPaths = {
    upload: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
    star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    plus: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
    'edit-3': 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    check: 'M5 13l4 4L19 7',
    users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
    'bar-chart': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  };
  
  function getColorClasses(color: string) {
    const colors = {
      primary: 'bg-primary-600 hover:bg-primary-700',
      secondary: 'bg-secondary-600 hover:bg-secondary-700',
      accent: 'bg-accent-600 hover:bg-accent-700'
    };
    return colors[color] || colors.primary;
  }
</script>

<div class="card">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
  
  <div class="space-y-3">
    {#each actions as action}
      <button class="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
        <div class="flex items-start space-x-3">
          <div class="{getColorClasses(action.color)} p-2 rounded-lg text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconPaths[action.icon]}></path>
            </svg>
          </div>
          
          <div>
            <p class="text-sm font-medium text-gray-900">{action.title}</p>
            <p class="text-xs text-gray-500 mt-1">{action.description}</p>
          </div>
        </div>
      </button>
    {/each}
  </div>
</div>