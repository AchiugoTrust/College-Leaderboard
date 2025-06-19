<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { authStore } from '$lib/pocketbase';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  onMount(() => {
    authStore.init();
  });
  
  // Redirect to login if not authenticated and not on login page
  $: if (!$authStore.loading && !$authStore.isAuthenticated && $page.url.pathname !== '/') {
    goto('/');
  }
  
  $: isAuthPage = $page.url.pathname === '/';
</script>

{#if isAuthPage}
  <main class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
    <slot />
  </main>
{:else}
  <div class="min-h-screen bg-gray-50">
    <slot />
  </div>
{/if}