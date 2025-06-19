<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '$lib/pocketbase';
  import LeaderboardCard from '$lib/components/LeaderboardCard.svelte';
  
  $: user = $authStore.user;
  
  let selectedCourse = 'CS401';
  let leaderboardData = [];
  let isLoading = false;
  
  const courses = [
    { id: 'CS401', name: 'Advanced Web Development' },
    { id: 'CS302', name: 'Database Systems' },
    { id: 'CS350', name: 'Software Engineering' }
  ];
  
  // Mock leaderboard data with real-time simulation
  function generateLeaderboardData() {
    return [
      {
        id: '1',
        name: 'Alice Johnson',
        avatar: 'AJ',
        score: 95.5,
        rank: 1,
        assignments: 12,
        exams: 3,
        trend: 'up'
      },
      {
        id: '2',
        name: 'Bob Smith',
        avatar: 'BS',
        score: 92.3,
        rank: 2,
        assignments: 11,
        exams: 3,
        trend: 'up'
      },
      {
        id: '3',
        name: 'Carol Davis',
        avatar: 'CD',
        score: 89.7,
        rank: 3,
        assignments: 12,
        exams: 2,
        trend: 'down'
      },
      {
        id: '4',
        name: 'David Wilson',
        avatar: 'DW',
        score: 87.2,
        rank: 4,
        assignments: 10,
        exams: 3,
        trend: 'up'
      },
      {
        id: '5',
        name: user?.name || 'John Doe',
        avatar: (user?.name || 'John Doe').split(' ').map(n => n[0]).join(''),
        score: 84.9,
        rank: 5,
        assignments: 11,
        exams: 2,
        trend: 'up',
        isCurrentUser: true
      },
      {
        id: '6',
        name: 'Eva Brown',
        avatar: 'EB',
        score: 82.1,
        rank: 6,
        assignments: 9,
        exams: 3,
        trend: 'down'
      }
    ];
  }
  
  async function loadLeaderboard() {
    isLoading = true;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      leaderboardData = generateLeaderboardData();
    } finally {
      isLoading = false;
    }
  }
  
  onMount(() => {
    loadLeaderboard();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Randomly update scores to simulate real-time changes
      leaderboardData = leaderboardData.map(student => ({
        ...student,
        score: student.score + (Math.random() - 0.5) * 0.5,
        trend: Math.random() > 0.5 ? 'up' : 'down'
      })).sort((a, b) => b.score - a.score)
      .map((student, index) => ({ ...student, rank: index + 1 }));
    }, 5000);
    
    return () => clearInterval(interval);
  });
  
  $: {
    if (selectedCourse) {
      loadLeaderboard();
    }
  }
</script>

<svelte:head>
  <title>Leaderboard - University Management Platform</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Course Leaderboard</h1>
      <p class="text-gray-600 mt-1">Real-time ranking based on assignments and exam scores</p>
    </div>
    
    <div class="flex items-center space-x-4">
      <select bind:value={selectedCourse} class="input-field max-w-xs">
        {#each courses as course}
          <option value={course.id}>{course.name}</option>
        {/each}
      </select>
      
      <div class="flex items-center text-sm text-gray-500">
        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
        Live Updates
      </div>
    </div>
  </div>
  
  {#if isLoading}
    <div class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  {:else}
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">
          Rankings for {courses.find(c => c.id === selectedCourse)?.name}
        </h3>
      </div>
      
      <div class="divide-y divide-gray-200">
        {#each leaderboardData as student, index (student.id)}
          <LeaderboardCard {student} />
        {/each}
      </div>
    </div>
    
    <div class="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-200">
      <div class="flex items-start space-x-4">
        <div class="bg-primary-100 rounded-lg p-3">
          <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h3>
          <p class="text-gray-600 mb-4">
            Rankings are updated automatically when new assignments are graded or exam results are published. 
            Watch your position change in real-time!
          </p>
          <div class="flex items-center text-sm text-primary-600">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>