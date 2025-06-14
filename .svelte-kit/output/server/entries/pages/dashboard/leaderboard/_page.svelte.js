import { c as create_ssr_component, e as escape, a as subscribe, b as each, d as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import { a as authStore } from "../../../../chunks/auth.js";
const LeaderboardCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rankColor;
  let trendColor;
  let { student } = $$props;
  if ($$props.student === void 0 && $$bindings.student && student !== void 0) $$bindings.student(student);
  rankColor = student.rank <= 3 ? "text-yellow-600" : "text-gray-600";
  trendColor = student.trend === "up" ? "text-green-500" : "text-red-500";
  return `<div class="${"px-6 py-4 hover:bg-gray-50 transition-colors duration-200 " + escape(
    student.isCurrentUser ? "bg-primary-50 border-l-4 border-primary-500" : "",
    true
  )}"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"> <div class="flex items-center justify-center w-8 h-8">${student.rank <= 3 ? `<svg class="${"w-6 h-6 " + escape(rankColor, true)}" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>` : `<span class="${"text-lg font-bold " + escape(rankColor, true)}">#${escape(student.rank)}</span>`}</div>  <div class="flex items-center space-x-3"><div class="bg-primary-100 rounded-full h-10 w-10 flex items-center justify-center"><span class="text-primary-600 font-semibold text-sm">${escape(student.avatar)}</span></div> <div><p class="${"text-sm font-semibold text-gray-900 " + escape(student.isCurrentUser ? "text-primary-700" : "", true)}">${escape(student.name)} ${student.isCurrentUser ? `<span class="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full ml-2" data-svelte-h="svelte-1qkbcrw">You</span>` : ``}</p> <div class="flex items-center text-xs text-gray-500 space-x-4"><span>${escape(student.assignments)} assignments</span> <span>${escape(student.exams)} exams</span></div></div></div></div>  <div class="flex items-center space-x-4"><div class="text-right"><p class="text-lg font-bold text-gray-900">${escape(student.score.toFixed(1))}%</p> <div class="flex items-center justify-end"><svg class="${"w-4 h-4 " + escape(trendColor, true) + " mr-1"}" fill="none" stroke="currentColor" viewBox="0 0 24 24">${student.trend === "up" ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>` : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>`}</svg> <span class="${"text-xs " + escape(trendColor, true) + " capitalize"}">${escape(student.trend)}</span></div></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  let selectedCourse = "CS401";
  let leaderboardData = [];
  let isLoading = false;
  const courses = [
    {
      id: "CS401",
      name: "Advanced Web Development"
    },
    { id: "CS302", name: "Database Systems" },
    {
      id: "CS350",
      name: "Software Engineering"
    }
  ];
  function generateLeaderboardData() {
    return [
      {
        id: "1",
        name: "Alice Johnson",
        avatar: "AJ",
        score: 95.5,
        rank: 1,
        assignments: 12,
        exams: 3,
        trend: "up"
      },
      {
        id: "2",
        name: "Bob Smith",
        avatar: "BS",
        score: 92.3,
        rank: 2,
        assignments: 11,
        exams: 3,
        trend: "up"
      },
      {
        id: "3",
        name: "Carol Davis",
        avatar: "CD",
        score: 89.7,
        rank: 3,
        assignments: 12,
        exams: 2,
        trend: "down"
      },
      {
        id: "4",
        name: "David Wilson",
        avatar: "DW",
        score: 87.2,
        rank: 4,
        assignments: 10,
        exams: 3,
        trend: "up"
      },
      {
        id: "5",
        name: user?.name || "John Doe",
        avatar: (user?.name || "John Doe").split(" ").map((n) => n[0]).join(""),
        score: 84.9,
        rank: 5,
        assignments: 11,
        exams: 2,
        trend: "up",
        isCurrentUser: true
      },
      {
        id: "6",
        name: "Eva Brown",
        avatar: "EB",
        score: 82.1,
        rank: 6,
        assignments: 9,
        exams: 3,
        trend: "down"
      }
    ];
  }
  async function loadLeaderboard() {
    isLoading = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      leaderboardData = generateLeaderboardData();
    } finally {
      isLoading = false;
    }
  }
  user = $authStore.user;
  {
    {
      {
        loadLeaderboard();
      }
    }
  }
  $$unsubscribe_authStore();
  return `${$$result.head += `<!-- HEAD_svelte-1i5u8vj_START -->${$$result.title = `<title>Leaderboard - University Management Platform</title>`, ""}<!-- HEAD_svelte-1i5u8vj_END -->`, ""} <div class="space-y-6"><div class="flex items-center justify-between"><div data-svelte-h="svelte-uxmm2b"><h1 class="text-3xl font-bold text-gray-900">Course Leaderboard</h1> <p class="text-gray-600 mt-1">Real-time ranking based on assignments and exam scores</p></div> <div class="flex items-center space-x-4"><select class="input-field max-w-xs">${each(courses, (course) => {
    return `<option${add_attribute("value", course.id, 0)}>${escape(course.name)}</option>`;
  })}</select> <div class="flex items-center text-sm text-gray-500" data-svelte-h="svelte-193y6z0"><div class="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
        Live Updates</div></div></div> ${isLoading ? `<div class="flex items-center justify-center py-12" data-svelte-h="svelte-pwmo69"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>` : `<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div class="px-6 py-4 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900">Rankings for ${escape(courses.find((c) => c.id === selectedCourse)?.name)}</h3></div> <div class="divide-y divide-gray-200">${each(leaderboardData, (student, index) => {
    return `${validate_component(LeaderboardCard, "LeaderboardCard").$$render($$result, { student }, {}, {})}`;
  })}</div></div> <div class="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-200"><div class="flex items-start space-x-4"><div class="bg-primary-100 rounded-lg p-3" data-svelte-h="svelte-zoi4ga"><svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div> <div><h3 class="text-lg font-semibold text-gray-900 mb-2" data-svelte-h="svelte-o6sv0a">Real-time Updates</h3> <p class="text-gray-600 mb-4" data-svelte-h="svelte-btk57s">Rankings are updated automatically when new assignments are graded or exam results are published. 
            Watch your position change in real-time!</p> <div class="flex items-center text-sm text-primary-600"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Last updated: ${escape((/* @__PURE__ */ new Date()).toLocaleTimeString())}</div></div></div></div>`}</div>`;
});
export {
  Page as default
};
