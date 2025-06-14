import { c as create_ssr_component, d as add_attribute, e as escape, b as each, a as subscribe, v as validate_component } from "../../../chunks/ssr.js";
import { a as authStore } from "../../../chunks/auth.js";
const StatsCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let colorClasses;
  let { title } = $$props;
  let { value } = $$props;
  let { icon } = $$props;
  let { color = "primary" } = $$props;
  const iconPaths = {
    "book-open": "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    trophy: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    users: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
    "file-text": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    "user-check": "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    "alert-circle": "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-2.265-.833-3.036 0l-6.928 12c-.77.833.192 2.5 1.732 2.5z"
  };
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  colorClasses = {
    primary: "bg-primary-50 text-primary-600",
    secondary: "bg-secondary-50 text-secondary-600",
    accent: "bg-accent-50 text-accent-600"
  }[color];
  return `<div class="card hover:shadow-md transition-shadow duration-200"><div class="flex items-center"><div class="${"p-3 rounded-lg " + escape(colorClasses, true)}"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${add_attribute("d", iconPaths[icon], 0)}></path></svg></div> <div class="ml-4"><p class="text-sm font-medium text-gray-600">${escape(title)}</p> <p class="text-2xl font-bold text-gray-900">${escape(value)}</p></div></div></div>`;
});
const RecentActivity = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activities;
  let { userRole } = $$props;
  const studentActivities = [
    {
      id: "1",
      type: "assignment",
      title: "Submitted React Component Architecture",
      course: "CS401",
      time: "2 hours ago",
      icon: "file-text"
    },
    {
      id: "2",
      type: "grade",
      title: "Grade received for Database Design Project",
      course: "CS302",
      time: "1 day ago",
      icon: "star"
    },
    {
      id: "3",
      type: "enrollment",
      title: "Enrolled in Advanced Algorithms",
      course: "CS501",
      time: "3 days ago",
      icon: "book-open"
    }
  ];
  const lecturerActivities = [
    {
      id: "1",
      type: "grading",
      title: "Graded 15 assignments for CS401",
      course: "CS401",
      time: "1 hour ago",
      icon: "edit-3"
    },
    {
      id: "2",
      type: "assignment",
      title: "Created new assignment: API Integration",
      course: "CS401",
      time: "3 hours ago",
      icon: "file-text"
    },
    {
      id: "3",
      type: "announcement",
      title: "Posted announcement about midterm exam",
      course: "CS302",
      time: "1 day ago",
      icon: "megaphone"
    }
  ];
  const staffActivities = [
    {
      id: "1",
      type: "course",
      title: "Approved new course: Machine Learning Basics",
      course: "CS600",
      time: "2 hours ago",
      icon: "book-open"
    },
    {
      id: "2",
      type: "user",
      title: "Registered 25 new students",
      course: "System",
      time: "4 hours ago",
      icon: "users"
    },
    {
      id: "3",
      type: "report",
      title: "Generated semester performance report",
      course: "System",
      time: "1 day ago",
      icon: "bar-chart"
    }
  ];
  const iconPaths = {
    "file-text": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    "book-open": "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    "edit-3": "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    megaphone: "M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h5a2 2 0 012 2v11a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2h-1z",
    users: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
    "bar-chart": "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  };
  if ($$props.userRole === void 0 && $$bindings.userRole && userRole !== void 0) $$bindings.userRole(userRole);
  activities = userRole === "student" ? studentActivities : userRole === "lecturer" ? lecturerActivities : staffActivities;
  return `<div class="card"><div class="flex items-center justify-between mb-4" data-svelte-h="svelte-1wie2pu"><h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3> <button class="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</button></div> <div class="space-y-4">${each(activities, (activity) => {
    return `<div class="flex items-start space-x-3"><div class="bg-primary-50 rounded-lg p-2 mt-1"><svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${add_attribute("d", iconPaths[activity.icon], 0)}></path></svg></div> <div class="flex-1"><p class="text-sm font-medium text-gray-900">${escape(activity.title)}</p> <div class="flex items-center text-xs text-gray-500 mt-1"><span>${escape(activity.course)}</span> <span class="mx-2" data-svelte-h="svelte-ybth69">•</span> <span>${escape(activity.time)}</span> </div></div> </div>`;
  })}</div></div>`;
});
function getTimeUntilDue(dueDate) {
  const now = /* @__PURE__ */ new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1e3 * 60 * 60 * 24));
  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  return `Due in ${diffDays} days`;
}
function getStatusColor(status) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "submitted":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
const UpcomingAssignments = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const assignments = [
    {
      id: "1",
      title: "React Component Architecture",
      course: "CS401",
      dueDate: "2024-01-20T23:59:00",
      status: "pending"
    },
    {
      id: "2",
      title: "SQL Query Optimization",
      course: "CS302",
      dueDate: "2024-01-22T17:00:00",
      status: "in-progress"
    },
    {
      id: "3",
      title: "Team Project Presentation",
      course: "CS350",
      dueDate: "2024-01-25T14:00:00",
      status: "pending"
    }
  ];
  return `<div class="card"><div class="flex items-center justify-between mb-4" data-svelte-h="svelte-2vgzmq"><h3 class="text-lg font-semibold text-gray-900">Upcoming Assignments</h3> <a href="/dashboard/assignments" class="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</a></div> <div class="space-y-3">${each(assignments, (assignment) => {
    return `<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div class="flex-1"><p class="text-sm font-medium text-gray-900">${escape(assignment.title)}</p> <div class="flex items-center text-xs text-gray-500 mt-1"><span>${escape(assignment.course)}</span> <span class="mx-2" data-svelte-h="svelte-ybth69">•</span> <span>${escape(getTimeUntilDue(assignment.dueDate))}</span> </div></div> <div class="ml-4"><span class="${"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium " + escape(getStatusColor(assignment.status), true)}">${escape(assignment.status.replace("-", " "))} </span></div> </div>`;
  })}</div></div>`;
});
function getColorClasses(color) {
  const colors = {
    primary: "bg-primary-600 hover:bg-primary-700",
    secondary: "bg-secondary-600 hover:bg-secondary-700",
    accent: "bg-accent-600 hover:bg-accent-700"
  };
  return colors[color] || colors.primary;
}
const QuickActions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let actions;
  let { userRole } = $$props;
  const studentActions = [
    {
      title: "Submit Assignment",
      description: "Upload your completed work",
      icon: "upload",
      color: "primary"
    },
    {
      title: "View Grades",
      description: "Check your latest scores",
      icon: "star",
      color: "secondary"
    },
    {
      title: "Course Schedule",
      description: "See upcoming classes",
      icon: "calendar",
      color: "accent"
    }
  ];
  const lecturerActions = [
    {
      title: "Create Assignment",
      description: "Add new assignment",
      icon: "plus",
      color: "primary"
    },
    {
      title: "Grade Submissions",
      description: "Review student work",
      icon: "edit-3",
      color: "secondary"
    },
    {
      title: "Class Attendance",
      description: "Mark attendance",
      icon: "check",
      color: "accent"
    }
  ];
  const staffActions = [
    {
      title: "Add New Course",
      description: "Create course offering",
      icon: "plus",
      color: "primary"
    },
    {
      title: "Manage Users",
      description: "Add students/lecturers",
      icon: "users",
      color: "secondary"
    },
    {
      title: "System Reports",
      description: "Generate analytics",
      icon: "bar-chart",
      color: "accent"
    }
  ];
  const iconPaths = {
    upload: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
    star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    plus: "M12 6v6m0 0v6m0-6h6m-6 0H6",
    "edit-3": "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    check: "M5 13l4 4L19 7",
    users: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
    "bar-chart": "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  };
  if ($$props.userRole === void 0 && $$bindings.userRole && userRole !== void 0) $$bindings.userRole(userRole);
  actions = userRole === "student" ? studentActions : userRole === "lecturer" ? lecturerActions : staffActions;
  return `<div class="card"><h3 class="text-lg font-semibold text-gray-900 mb-4" data-svelte-h="svelte-1haoar8">Quick Actions</h3> <div class="space-y-3">${each(actions, (action) => {
    return `<button class="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"><div class="flex items-start space-x-3"><div class="${escape(getColorClasses(action.color), true) + " p-2 rounded-lg text-white"}"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${add_attribute("d", iconPaths[action.icon], 0)}></path></svg></div> <div><p class="text-sm font-medium text-gray-900">${escape(action.title)}</p> <p class="text-xs text-gray-500 mt-1">${escape(action.description)}</p> </div></div> </button>`;
  })}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let userRole;
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  user = $authStore.user;
  userRole = user?.role || "student";
  $$unsubscribe_authStore();
  return `${$$result.head += `<!-- HEAD_svelte-ypjzog_START -->${$$result.title = `<title>Dashboard - University Management Platform</title>`, ""}<!-- HEAD_svelte-ypjzog_END -->`, ""} <div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-gray-900">Welcome back, ${escape(user?.name || "User")}!</h1> <p class="text-gray-600 mt-1 capitalize">${escape(userRole)} Dashboard</p></div></div>  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">${userRole === "student" ? `${validate_component(StatsCard, "StatsCard").$$render(
    $$result,
    {
      title: "Enrolled Courses",
      value: "6",
      icon: "book-open",
      color: "primary"
    },
    {},
    {}
  )} ${validate_component(StatsCard, "StatsCard").$$render(
    $$result,
    {
      title: "Assignments Due",
      value: "3",
      icon: "calendar",
      color: "accent"
    },
    {},
    {}
  )} ${validate_component(StatsCard, "StatsCard").$$render(
    $$result,
    {
      title: "Current GPA",
      value: "3.8",
      icon: "star",
      color: "secondary"
    },
    {},
    {}
  )} ${validate_component(StatsCard, "StatsCard").$$render(
    $$result,
    {
      title: "Leaderboard Rank",
      value: "#5",
      icon: "trophy",
      color: "primary"
    },
    {},
    {}
  )}` : `${userRole === "lecturer" ? `${validate_component(StatsCard, "StatsCard").$$render(
    $$result,
    {
      title: "Active Courses",
      value: "4",
      icon: "book-open",
      color: "primary"
    },
    {},
    {}
  )} ${validate_component(StatsCard, "StatsCard").$$render(
    $$result,
    {
      title: "Students",
      value: "156",
      icon: "users",
      color: "secondary"
    },
    {},
    {}
  )} ${validate_component(StatsCard, "StatsCard").$$render(
    $$result,
    {
      title: "Assignments to Grade",
      value: "23",
      icon: "file-text",
      color: "accent"
    },
    {},
    {}
  )} ${validate_component(StatsCard, "StatsCard").$$render(
    $$result,
    {
      title: "Upcoming Exams",
      value: "2",
      icon: "calendar",
      color: "primary"
    },
    {},
    {}
  )}` : `${validate_component(StatsCard, "StatsCard").$$render(
    $$result,
    {
      title: "Total Students",
      value: "1,234",
      icon: "users",
      color: "primary"
    },
    {},
    {}
  )} ${validate_component(StatsCard, "StatsCard").$$render(
    $$result,
    {
      title: "Active Courses",
      value: "45",
      icon: "book-open",
      color: "secondary"
    },
    {},
    {}
  )} ${validate_component(StatsCard, "StatsCard").$$render(
    $$result,
    {
      title: "Lecturers",
      value: "89",
      icon: "user-check",
      color: "accent"
    },
    {},
    {}
  )} ${validate_component(StatsCard, "StatsCard").$$render(
    $$result,
    {
      title: "System Alerts",
      value: "7",
      icon: "alert-circle",
      color: "primary"
    },
    {},
    {}
  )}`}`}</div>  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6">${validate_component(RecentActivity, "RecentActivity").$$render($$result, { userRole }, {}, {})} ${userRole === "student" ? `${validate_component(UpcomingAssignments, "UpcomingAssignments").$$render($$result, {}, {}, {})}` : ``}</div> <div class="space-y-6">${validate_component(QuickActions, "QuickActions").$$render($$result, { userRole }, {}, {})}</div></div></div>`;
});
export {
  Page as default
};
