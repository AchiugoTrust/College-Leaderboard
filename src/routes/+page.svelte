<script lang="ts">
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/pocketbase';
  import { onMount } from 'svelte';
  
  let loginForm = {
    email: '',
    password: '',
    userType: 'student'
  };
  
  let registerForm = {
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    userType: 'student'
  };
  
  let isLoading = false;
  let showRegister = false;
  let errorMessage = '';
  
  async function handleLogin() {
    isLoading = true;
    errorMessage = '';
    
    try {
      await authStore.login({
        email: loginForm.email,
        password: loginForm.password,
        role: loginForm.userType as 'student' | 'lecturer' | 'staff'
      });
      
      goto('/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error);
      errorMessage = error.message || 'Login failed. Please check your credentials.';
    } finally {
      isLoading = false;
    }
  }
  
  async function handleRegisterSubmit() {
    if (registerForm.password !== registerForm.passwordConfirm) {
      errorMessage = 'Passwords do not match';
      return;
    }
    
    isLoading = true;
    errorMessage = '';
    
    try {
      await authStore.register({
        email: registerForm.email,
        password: registerForm.password,
        passwordConfirm: registerForm.passwordConfirm,
        name: registerForm.name,
        role: registerForm.userType as 'student' | 'lecturer' | 'staff'
      });
      
      goto('/dashboard');
    } catch (error: any) {
      console.error('Registration failed:', error);
      errorMessage = error.message || 'Registration failed. Please try again.';
    } finally {
      isLoading = false;
    }
  }
  
  function toggleRegister() {
    showRegister = !showRegister;
    errorMessage = '';
    // Reset forms
    loginForm = { email: '', password: '', userType: 'student' };
    registerForm = { email: '', password: '', passwordConfirm: '', name: '', userType: 'student' };
  }
  
  onMount(() => {
    authStore.init();
  });
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
      {#if errorMessage}
        <div class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      {/if}
      
      {#if !showRegister}
        <!-- Login Form -->
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
            <button on:click={toggleRegister} class="text-primary-600 hover:text-primary-500 font-medium">
              Register here
            </button>
          </p>
        </div>
      {:else}
        <!-- Registration Form -->
        <form on:submit|preventDefault={handleRegisterSubmit} class="space-y-6">
          <div>
            <label for="regUserType" class="block text-sm font-medium text-gray-700 mb-2">
              User Type
            </label>
            <select bind:value={registerForm.userType} class="input-field">
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          
          <div>
            <label for="regName" class="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="regName"
              type="text"
              bind:value={registerForm.name}
              required
              class="input-field"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label for="regEmail" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="regEmail"
              type="email"
              bind:value={registerForm.email}
              required
              class="input-field"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label for="regPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="regPassword"
              type="password"
              bind:value={registerForm.password}
              required
              class="input-field"
              placeholder="Enter your password"
            />
          </div>
          
          <div>
            <label for="regPasswordConfirm" class="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="regPasswordConfirm"
              type="password"
              bind:value={registerForm.passwordConfirm}
              required
              class="input-field"
              placeholder="Confirm your password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            class="w-full btn-primary py-3 {isLoading ? 'opacity-50 cursor-not-allowed' : ''}"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <button on:click={toggleRegister} class="text-primary-600 hover:text-primary-500 font-medium">
              Sign in here
            </button>
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>