<script lang="ts">
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  
  let loginForm = {
    email: '',
    password: '',
    userType: 'student'
  };
  
  let isLoading = false;
  let showRegister = false;
  
  async function handleLogin() {
    isLoading = true;
    try {
      // Simulate login - replace with actual PocketBase authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      authStore.set({
        isAuthenticated: true,
        user: {
          id: '1',
          email: loginForm.email,
          name: 'John Doe',
          role: loginForm.userType as 'student' | 'lecturer' | 'staff'
        }
      });
      
      goto('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      isLoading = false;
    }
  }
  
  function handleRegister() {
    showRegister = !showRegister;
  }
</script>

<svelte:head>
  <title>Login - University Management Platform</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div class="text-center">
      <div class="mx-auto h-20 w-20 bg-primary-600 rounded-full flex items-center justify-center mb-4">
        <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">University Portal</h2>
      <p class="text-gray-600">Sign in to access your dashboard</p>
    </div>
    
    <div class="bg-white p-8 rounded-xl shadow-lg">
      <form on:submit|preventDefault={handleLogin} class="space-y-6">
        <div>
          <label for="userType" class="block text-sm font-medium text-gray-700 mb-2">
            User Type
          </label>
          <select bind:value={loginForm.userType} class="input-field">
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            bind:value={loginForm.email}
            required
            class="input-field"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            bind:value={loginForm.password}
            required
            class="input-field"
            placeholder="Enter your password"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          class="w-full btn-primary py-3 {isLoading ? 'opacity-50 cursor-not-allowed' : ''}"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <button on:click={handleRegister} class="text-primary-600 hover:text-primary-500 font-medium">
            Register here
          </button>
        </p>
      </div>
    </div>
  </div>
</div>