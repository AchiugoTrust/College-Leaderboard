<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { collections, authStore } from '$lib/pocketbase';
  import type { Course, Department } from '$lib/pocketbase';

  const dispatch = createEventDispatcher();

  export let isOpen = false;
  export let onClose: () => void;

  let loading = false;
  let error = '';
  let departments: Department[] = [];

  // Form data
  let formData = {
    name: '',
    code: '',
    description: '',
    credits: 3,
    department: '',
    lecturer: '', // Will be set to current user ID
    semester: 'Fall' as 'Fall' | 'Spring' | 'Summer',
    year: new Date().getFullYear(),
    max_students: 50,
    is_active: true
  };

  const semesters = ['Fall', 'Spring', 'Summer'];
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

  // Load departments on mount
  async function loadDepartments() {
    try {
      departments = await collections.departments().getFullList();
      console.log('Loaded departments:', departments);
    } catch (error) {
      console.error('Error loading departments:', error);
      error = 'Failed to load departments. Please refresh the page.';
    }
  }

  async function handleSubmit() {
    if (!formData.name || !formData.code || !formData.department) {
      error = 'Please fill in all required fields';
      return;
    }

    // Validate that we have departments loaded
    if (departments.length === 0) {
      error = 'No departments available. Please refresh the page.';
      return;
    }

    // Set the lecturer to the current user's ID
    const currentUser = $authStore.user;
    if (!currentUser) {
      error = 'You must be logged in to create a course';
      return;
    }

    loading = true;
    error = '';

    try {
      const courseData = {
        ...formData,
        lecturer: currentUser.id,
        departments: [formData.department]
      };
      
      console.log('Creating course with data:', courseData);
      
      const course = await collections.courses().create(courseData);
      dispatch('courseCreated', course);
      resetForm();
      onClose();
    } catch (err: any) {
      console.error('Course creation error:', err);
      if (err.data) {
        console.error('Error data:', err.data);
        // Try to extract field-specific errors
        if (err.data.data) {
          const fieldErrors = Object.entries(err.data.data)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          error = `Validation errors: ${fieldErrors}`;
        } else {
          error = err.data.message || err.message || 'Failed to create course';
        }
      } else {
        error = err.message || 'Failed to create course';
      }
    } finally {
      loading = false;
    }
  }

  function resetForm() {
    formData = {
      name: '',
      code: '',
      description: '',
      credits: 3,
      department: '',
      lecturer: '',
      semester: 'Fall',
      year: new Date().getFullYear(),
      max_students: 50,
      is_active: true
    };
    error = '';
  }

  // Load departments when component mounts
  $: if (isOpen) {
    loadDepartments();
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">Create New Course</h2>
          <button 
            on:click={onClose}
            class="text-gray-400 transition-colors hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <form on:submit|preventDefault={handleSubmit} class="p-6 space-y-6">
        {#if error}
          <div class="px-4 py-3 text-red-700 border border-red-200 rounded-lg bg-red-50">
            {error}
          </div>
        {/if}

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <!-- Course Name -->
          <div class="md:col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-700">
              Course Name *
            </label>
            <input
              id="name"
              type="text"
              bind:value={formData.name}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., Advanced Web Development"
              required
            />
          </div>

          <!-- Course Code -->
          <div>
            <label for="code" class="block mb-2 text-sm font-medium text-gray-700">
              Course Code *
            </label>
            <input
              id="code"
              type="text"
              bind:value={formData.code}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., CS401"
              required
            />
          </div>

          <!-- Credits -->
          <div>
            <label for="credits" class="block mb-2 text-sm font-medium text-gray-700">
              Credits
            </label>
            <input
              id="credits"
              type="number"
              bind:value={formData.credits}
              min="1"
              max="6"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <!-- Department -->
          <div>
            <label for="department" class="block mb-2 text-sm font-medium text-gray-700">
              Department *
            </label>
            <select
              id="department"
              bind:value={formData.department}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="">Select Department</option>
              {#each departments as dept}
                <option value={dept.id}>{dept.name}</option>
              {/each}
            </select>
          </div>

          <!-- Max Students -->
          <div>
            <label for="max_students" class="block mb-2 text-sm font-medium text-gray-700">
              Maximum Students
            </label>
            <input
              id="max_students"
              type="number"
              bind:value={formData.max_students}
              min="1"
              max="200"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <!-- Semester -->
          <div>
            <label for="semester" class="block mb-2 text-sm font-medium text-gray-700">
              Semester
            </label>
            <select
              id="semester"
              bind:value={formData.semester}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {#each semesters as semester}
                <option value={semester}>{semester}</option>
              {/each}
            </select>
          </div>

          <!-- Year -->
          <div>
            <label for="year" class="block mb-2 text-sm font-medium text-gray-700">
              Year
            </label>
            <select
              id="year"
              bind:value={formData.year}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {#each years as year}
                <option value={year}>{year}</option>
              {/each}
            </select>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            bind:value={formData.description}
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Course description and learning objectives..."
          ></textarea>
        </div>

        <!-- Active Status -->
        <div class="flex items-center">
          <input
            id="is_active"
            type="checkbox"
            bind:checked={formData.is_active}
            class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
          />
          <label for="is_active" class="block ml-2 text-sm text-gray-700">
            Course is active and available for enrollment
          </label>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end pt-6 space-x-3 border-t border-gray-200">
          <button
            type="button"
            on:click={onClose}
            class="px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn-primary"
            disabled={loading}
          >
            {#if loading}
              <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            {:else}
              Create Course
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if} 