<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore, utils } from '$lib/pocketbase';
  import StatsCard from '$lib/components/StatsCard.svelte';
  import RecentActivity from '$lib/components/RecentActivity.svelte';
  import UpcomingAssignments from '$lib/components/UpcomingAssignments.svelte';
  import QuickActions from '$lib/components/QuickActions.svelte';
  
  $: user = $authStore.user;
  $: userRole = user?.role || 'student';
  
  let stats = {
    enrolledCourses: 0,
    assignmentsDue: 0,
    currentGPA: '0.0',
    leaderboardRank: '#--',
    activeCourses: 0,
    totalStudents: 0,
    assignmentsToGrade: 0,
    upcomingExams: 0,
    totalLecturers: 0,
    systemAlerts: 0
  };
  
  let loading = true;
  
  onMount(async () => {
    if (user) {
      try {
        const userStats = await utils.getUserStats(user.id, userRole);
        stats = { ...stats, ...userStats };
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        loading = false;
      }
    }
  });
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
    {#if loading}
      <!-- Loading skeleton -->
      {#each Array(4) as _}
        <div class="bg-white rounded-lg shadow p-6 animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      {/each}
    {:else if userRole === 'student'}
      <StatsCard
        title="Enrolled Courses"
        value={stats.enrolledCourses.toString()}
        icon="book-open"
        color="primary"
      />
      <StatsCard
        title="Assignments Due"
        value={stats.assignmentsDue.toString()}
        icon="calendar"
        color="accent"
      />
      <StatsCard
        title="Current GPA"
        value={stats.currentGPA}
        icon="star"
        color="secondary"
      />
      <StatsCard
        title="Leaderboard Rank"
        value={stats.leaderboardRank}
        icon="trophy"
        color="primary"
      />
    {:else if userRole === 'lecturer'}
      <StatsCard
        title="Active Courses"
        value={stats.activeCourses.toString()}
        icon="book-open"
        color="primary"
      />
      <StatsCard
        title="Students"
        value={stats.totalStudents.toString()}
        icon="users"
        color="secondary"
      />
      <StatsCard
        title="Assignments to Grade"
        value={stats.assignmentsToGrade.toString()}
        icon="file-text"
        color="accent"
      />
      <StatsCard
        title="Upcoming Exams"
        value={stats.upcomingExams.toString()}
        icon="calendar"
        color="primary"
      />
    {:else}
      <StatsCard
        title="Total Students"
        value={stats.totalStudents.toString()}
        icon="users"
        color="primary"
      />
      <StatsCard
        title="Active Courses"
        value={stats.activeCourses.toString()}
        icon="book-open"
        color="secondary"
      />
      <StatsCard
        title="Lecturers"
        value={stats.totalLecturers.toString()}
        icon="user-check"
        color="accent"
      />
      <StatsCard
        title="System Alerts"
        value={stats.systemAlerts.toString()}
        icon="alert-circle"
        color="primary"
      />
    {/if}
  </div>
  
  <!-- Main Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 space-y-6">
      <RecentActivity {userRole} userId={user?.id || ''} />
      
      {#if userRole === 'student'}
        <UpcomingAssignments />
      {/if}
    </div>
    
    <div class="space-y-6">
      <QuickActions {userRole} />
    </div>
  </div>
</div>