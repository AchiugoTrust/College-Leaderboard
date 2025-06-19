<script lang="ts">
  import { page } from '$app/stores';
  import { authStore } from '$lib/pocketbase';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  
  onMount(() => {
    // Check authentication
    const unsubscribe = authStore.subscribe(auth => {
      if (!auth.isAuthenticated && !auth.loading) {
        goto('/');
      }
    });
    
    return unsubscribe;
  });
</script>

<div class="flex h-screen bg-gray-50">
  <Sidebar />
  
  <div class="flex-1 flex flex-col overflow-hidden">
    <Header />
    
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
      <slot />
    </main>
  </div>
</div>