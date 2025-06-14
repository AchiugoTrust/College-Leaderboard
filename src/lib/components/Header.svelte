<script lang="ts">
  import { authStore } from '$lib/stores/auth';
  
  $: user = $authStore.user;
  
  // Mock notifications
  const notifications = [
    { id: '1', title: 'New assignment posted', message: 'CS401: React Component Architecture', time: '5 min ago', unread: true },
    { id: '2', title: 'Grade published', message: 'Database Design Project: 85/100', time: '1 hour ago', unread: true },
    { id: '3', title: 'Course reminder', message: 'Software Engineering class at 9:00 AM', time: '2 hours ago', unread: false }
  ];
  
  let showNotifications = false;
  $: unreadCount = notifications.filter(n => n.unread).length;
</script>

<header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <div class="flex-1">
      <!-- Search could go here -->
    </div>
    
    <div class="flex items-center space-x-4">
      <!-- Notifications -->
      <div class="relative">
        <button
          on:click={() => showNotifications = !showNotifications}
          class="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          {#if unreadCount > 0}
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          {/if}
        </button>
        
        {#if showNotifications}
          <div class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div class="p-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <div class="max-h-96 overflow-y-auto">
              {#each notifications as notification}
                <div class="p-4 border-b border-gray-100 hover:bg-gray-50 {notification.unread ? 'bg-blue-50' : ''}">
                  <div class="flex items-start space-x-3">
                    {#if notification.unread}
                      <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    {:else}
                      <div class="w-2 h-2 mt-2"></div>
                    {/if}
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p class="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p class="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
            <div class="p-4 border-t border-gray-200">
              <button class="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all notifications
              </button>
            </div>
          </div>
        {/if}
      </div>
      
      <!-- User Menu -->
      <div class="flex items-center space-x-3">
        <div class="bg-primary-100 rounded-full h-8 w-8 flex items-center justify-center">
          <span class="text-primary-600 font-semibold text-sm">
            {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
          </span>
        </div>
        <span class="text-sm font-medium text-gray-900">{user?.name || 'User'}</span>
      </div>
    </div>
  </div>
</header>

<!-- Click outside to close notifications -->
{#if showNotifications}
  <div class="fixed inset-0 z-40" on:click={() => showNotifications = false}></div>
{/if}