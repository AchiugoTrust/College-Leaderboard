<script lang="ts">
  import { authStore } from '$lib/stores/auth';
  import StatsCard from '$lib/components/StatsCard.svelte';
  import RecentActivity from '$lib/components/RecentActivity.svelte';
  import UpcomingAssignments from '$lib/components/UpcomingAssignments.svelte';
  import QuickActions from '$lib/components/QuickActions.svelte';
  
  $: user = $authStore.user;
  $: userRole = user?.role || 'student';
</script>

<svelte:head>
  <title>Dashboard - University Management Platform</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">
        Welcome back, {user?.name || 'User'}!
      </h1>
      <p class="text-gray-600 mt-1 capitalize">
        {userRole} Dashboard
      </p>
    </div>
  </div>
  
  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#if userRole === 'student'}
      <StatsCard
        title="Enrolled Courses"
        value="6"
        icon="book-open"
        color="primary"
      />
      <StatsCard
        title="Assignments Due"
        value="3"
        icon="calendar"
        color="accent"
      />
      <StatsCard
        title="Current GPA"
        value="3.8"
        icon="star"
        color="secondary"
      />
      <StatsCard
        title="Leaderboard Rank"
        value="#5"
        icon="trophy"
        color="primary"
      />
    {:else if userRole === 'lecturer'}
      <StatsCard
        title="Active Courses"
        value="4"
        icon="book-open"
        color="primary"
      />
      <StatsCard
        title="Students"
        value="156"
        icon="users"
        color="secondary"
      />
      <StatsCard
        title="Assignments to Grade"
        value="23"
        icon="file-text"
        color="accent"
      />
      <StatsCard
        title="Upcoming Exams"
        value="2"
        icon="calendar"
        color="primary"
      />
    {:else}
      <StatsCard
        title="Total Students"
        value="1,234"
        icon="users"
        color="primary"
      />
      <StatsCard
        title="Active Courses"
        value="45"
        icon="book-open"
        color="secondary"
      />
      <StatsCard
        title="Lecturers"
        value="89"
        icon="user-check"
        color="accent"
      />
      <StatsCard
        title="System Alerts"
        value="7"
        icon="alert-circle"
        color="primary"
      />
    {/if}
  </div>
  
  <!-- Main Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 space-y-6">
      <RecentActivity {userRole} />
      
      {#if userRole === 'student'}
        <UpcomingAssignments />
      {/if}
    </div>
    
    <div class="space-y-6">
      <QuickActions {userRole} />
    </div>
  </div>
</div>