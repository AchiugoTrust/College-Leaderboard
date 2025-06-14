<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  
  let isAuthPage = false;
  
  $: isAuthPage = $page.route.id?.includes('auth') || $page.route.id === '/';
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