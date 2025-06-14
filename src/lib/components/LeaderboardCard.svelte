<script lang="ts">
  export let student: {
    id: string;
    name: string;
    avatar: string;
    score: number;
    rank: number;
    assignments: number;
    exams: number;
    trend: 'up' | 'down';
    isCurrentUser?: boolean;
  };
  
  $: rankColor = student.rank <= 3 ? 'text-yellow-600' : 'text-gray-600';
  $: trendColor = student.trend === 'up' ? 'text-green-500' : 'text-red-500';
</script>

<div class="px-6 py-4 hover:bg-gray-50 transition-colors duration-200 {student.isCurrentUser ? 'bg-primary-50 border-l-4 border-primary-500' : ''}">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <!-- Rank -->
      <div class="flex items-center justify-center w-8 h-8">
        {#if student.rank <= 3}
          <svg class="w-6 h-6 {rankColor}" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        {:else}
          <span class="text-lg font-bold {rankColor}">#{student.rank}</span>
        {/if}
      </div>
      
      <!-- Avatar and Info -->
      <div class="flex items-center space-x-3">
        <div class="bg-primary-100 rounded-full h-10 w-10 flex items-center justify-center">
          <span class="text-primary-600 font-semibold text-sm">{student.avatar}</span>
        </div>
        
        <div>
          <p class="text-sm font-semibold text-gray-900 {student.isCurrentUser ? 'text-primary-700' : ''}">
            {student.name}
            {#if student.isCurrentUser}
              <span class="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full ml-2">You</span>
            {/if}
          </p>
          <div class="flex items-center text-xs text-gray-500 space-x-4">
            <span>{student.assignments} assignments</span>
            <span>{student.exams} exams</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Score and Trend -->
    <div class="flex items-center space-x-4">
      <div class="text-right">
        <p class="text-lg font-bold text-gray-900">{student.score.toFixed(1)}%</p>
        <div class="flex items-center justify-end">
          <svg class="w-4 h-4 {trendColor} mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if student.trend === 'up'}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
            {/if}
          </svg>
          <span class="text-xs {trendColor} capitalize">{student.trend}</span>
        </div>
      </div>
    </div>
  </div>
</div>