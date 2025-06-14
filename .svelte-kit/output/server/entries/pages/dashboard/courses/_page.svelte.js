import { c as create_ssr_component, e as escape, a as subscribe, b as each, v as validate_component } from "../../../../chunks/ssr.js";
import { a as authStore } from "../../../../chunks/auth.js";
function formatNextClass(dateString) {
  const date = new Date(dateString);
  const now = /* @__PURE__ */ new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isTomorrow = date.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1e3).toDateString();
  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (isToday) return `Today at ${timeStr}`;
  if (isTomorrow) return `Tomorrow at ${timeStr}`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" }) + ` at ${timeStr}`;
}
const CourseCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { course } = $$props;
  let { userRole } = $$props;
  if ($$props.course === void 0 && $$bindings.course && course !== void 0) $$bindings.course(course);
  if ($$props.userRole === void 0 && $$bindings.userRole && userRole !== void 0) $$bindings.userRole(userRole);
  return `<div class="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"><div class="flex items-start justify-between mb-4"><div><h3 class="text-lg font-semibold text-gray-900">${escape(course.name)}</h3> <p class="text-sm text-gray-600">${escape(course.code)}</p></div> <span class="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full">${escape(course.progress)}% Complete</span></div> <p class="text-sm text-gray-600 mb-4">${escape(course.description)}</p> <div class="space-y-3">${userRole === "student" ? `<div class="flex items-center text-sm text-gray-600"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        Instructor: ${escape(course.lecturer)}</div>` : ``} <div class="flex items-center text-sm text-gray-600"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
      Next class: ${escape(formatNextClass(course.nextClass))}</div> ${userRole === "lecturer" || userRole === "staff" ? `<div class="flex items-center text-sm text-gray-600"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg> ${escape(course.students)} students enrolled</div>` : ``}</div>  <div class="mt-4"><div class="bg-gray-200 rounded-full h-2"><div class="bg-primary-600 h-2 rounded-full transition-all duration-300" style="${"width: " + escape(course.progress, true) + "%"}"></div></div></div> <div class="mt-4 flex justify-between"><button class="btn-secondary text-sm" data-svelte-h="svelte-2okj8t">View Details</button> ${userRole === "student" ? `<button class="btn-primary text-sm" data-svelte-h="svelte-12o54it">Enter Course</button>` : `${userRole === "lecturer" ? `<button class="btn-primary text-sm" data-svelte-h="svelte-p5b0k0">Manage Course</button>` : ``}`}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let userRole;
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  const courses = [
    {
      id: "1",
      name: "Advanced Web Development",
      code: "CS401",
      lecturer: "Dr. Sarah Johnson",
      students: 45,
      progress: 75,
      nextClass: "2024-01-15T10:00:00",
      description: "Advanced concepts in modern web development including frameworks, APIs, and deployment."
    },
    {
      id: "2",
      name: "Database Systems",
      code: "CS302",
      lecturer: "Prof. Michael Chen",
      students: 38,
      progress: 60,
      nextClass: "2024-01-16T14:00:00",
      description: "Comprehensive study of database design, implementation, and optimization."
    },
    {
      id: "3",
      name: "Software Engineering",
      code: "CS350",
      lecturer: "Dr. Emily Rodriguez",
      students: 52,
      progress: 80,
      nextClass: "2024-01-17T09:00:00",
      description: "Software development lifecycle, project management, and team collaboration."
    }
  ];
  user = $authStore.user;
  userRole = user?.role || "student";
  $$unsubscribe_authStore();
  return `${$$result.head += `<!-- HEAD_svelte-1mv25sq_START -->${$$result.title = `<title>Courses - University Management Platform</title>`, ""}<!-- HEAD_svelte-1mv25sq_END -->`, ""} <div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-gray-900">${escape(userRole === "student" ? "My Courses" : userRole === "lecturer" ? "Teaching Courses" : "All Courses")}</h1> <p class="text-gray-600 mt-1">${escape(userRole === "student" ? "Manage your enrolled courses" : userRole === "lecturer" ? "Manage your teaching assignments" : "System course overview")}</p></div> ${userRole === "lecturer" || userRole === "staff" ? `<button class="btn-primary" data-svelte-h="svelte-1ll1v6a"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        Add Course</button>` : ``}</div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${each(courses, (course) => {
    return `${validate_component(CourseCard, "CourseCard").$$render($$result, { course, userRole }, {}, {})}`;
  })}</div> ${userRole === "student" ? `<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" data-svelte-h="svelte-ehyygp"><h3 class="text-lg font-semibold text-gray-900 mb-4">Course Enrollment</h3> <p class="text-gray-600 mb-4">Browse available courses and enroll for the upcoming semester.</p> <button class="btn-secondary">Browse Available Courses</button></div>` : ``}</div>`;
});
export {
  Page as default
};
