<script lang="ts">
  import { onMount } from 'svelte';
  import { utils } from '$lib/pocketbase';
  
  export let userRole: string;
  export let userId: string;
  
  interface Activity {
    id: string;
    type: string;
    title: string;
    course: string;
    time: string;
    icon: string;
  }
  
  let activities: Activity[] = [];
  let loading = true;
  
  function formatTimeAgo(date: string): string {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return activityDate.toLocaleDateString();
  }
  
  onMount(async () => {
    try {
      const recentActivity = await utils.getRecentActivity(userId, userRole);
      
      // Transform the data into the expected format
      activities = recentActivity.map((item: any) => {
        let title = '';
        let course = '';
        let icon = 'file-text';
        
        if (userRole === 'student') {
          title = `Submitted assignment: ${item.expand?.assignment?.title || 'Unknown Assignment'}`;
          course = item.expand?.assignment?.expand?.course?.name || 'Unknown Course';
          icon = 'file-text';
        } else if (userRole === 'lecturer') {
          title = `New submission from ${item.expand?.student?.name || 'Unknown Student'}`;
          course = item.expand?.assignment?.title || 'Unknown Assignment';
          icon = 'edit-3';
        } else {
          title = item.title || 'System Announcement';
          course = item.content?.substring(0, 50) + '...' || 'No content';
          icon = 'megaphone';
        }
        
        return {
          id: item.id,
          type: 'activity',
          title,
          course,
          time: formatTimeAgo(item.created || item.updated || new Date().toISOString()),
          icon
        };
      });
    } catch (error) {
      console.error('Failed to load recent activities:', error);
      // Fallback to empty array
      activities = [];
    } finally {
      loading = false;
    }
  });
  
  const iconPaths = {
    'file-text': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    'book-open': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    'edit-3': 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    megaphone: 'M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h5a2 2 0 012 2v11a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2h-1z',
    users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
    'bar-chart': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  };
</script>

<div class="card">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
    <button class="text-sm text-primary-600 hover:text-primary-700 font-medium">
      View All
    </button>
  </div>
  
  <div class="space-y-4">
    {#each activities as activity}
      <div class="flex items-start space-x-3">
        <div class="bg-primary-50 rounded-lg p-2 mt-1">
          <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconPaths[activity.icon]}></path>
          </svg>
        </div>
        
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-900">{activity.title}</p>
          <div class="flex items-center text-xs text-gray-500 mt-1">
            <span>{activity.course}</span>
            <span class="mx-2">•</span>
            <span>{activity.time}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>