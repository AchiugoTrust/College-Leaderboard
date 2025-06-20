<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let isOpen = false;
  export let title = 'Confirm Deletion';
  export let message = 'Are you sure you want to delete this item?';
  export let itemName = '';
  export let loading = false;

  function handleConfirm() {
    dispatch('confirm');
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
      <div class="p-6">
        <!-- Icon -->
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-medium text-gray-900 text-center mb-2">
          {title}
        </h3>

        <!-- Message -->
        <p class="text-sm text-gray-500 text-center mb-6">
          {message}
          {#if itemName}
            <span class="font-medium text-gray-900">"{itemName}"</span>?
          {/if}
        </p>

        <!-- Actions -->
        <div class="flex justify-center space-x-3">
          <button
            type="button"
            on:click={handleCancel}
            class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            on:click={handleConfirm}
            class="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            disabled={loading}
          >
            {#if loading}
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Deleting...
            {:else}
              Delete
            {/if}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if} 