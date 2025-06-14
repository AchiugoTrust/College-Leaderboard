import { c as create_ssr_component, e as escape, d as add_attribute, a as subscribe, b as each, v as validate_component } from "../../../../chunks/ssr.js";
import { a as authStore } from "../../../../chunks/auth.js";
function formatDueDate(dateString) {
  const date = new Date(dateString);
  const now = /* @__PURE__ */ new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1e3 * 60 * 60 * 24));
  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  return `Due in ${diffDays} days`;
}
function getStatusColor(status) {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    submitted: "bg-blue-100 text-blue-800 border-blue-200",
    graded: "bg-green-100 text-green-800 border-green-200",
    overdue: "bg-red-100 text-red-800 border-red-200"
  };
  return colors[status] || colors.pending;
}
function getStatusIcon(status) {
  const icons = {
    pending: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    submitted: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    graded: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    overdue: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-2.265-.833-3.036 0l-6.928 12c-.77.833.192 2.5 1.732 2.5z"
  };
  return icons[status] || icons.pending;
}
const AssignmentCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { assignment } = $$props;
  let { userRole } = $$props;
  if ($$props.assignment === void 0 && $$bindings.assignment && assignment !== void 0) $$bindings.assignment(assignment);
  if ($$props.userRole === void 0 && $$bindings.userRole && userRole !== void 0) $$bindings.userRole(userRole);
  return `<div class="card hover:shadow-md transition-shadow duration-200"><div class="flex items-start justify-between mb-4"><div class="flex-1"><div class="flex items-center space-x-3 mb-2"><h3 class="text-lg font-semibold text-gray-900">${escape(assignment.title)}</h3> <span class="${"border rounded-full px-3 py-1 text-xs font-medium " + escape(getStatusColor(assignment.status), true)}"><svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${add_attribute("d", getStatusIcon(assignment.status), 0)}></path></svg> ${escape(assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1))}</span></div> <div class="flex items-center text-sm text-gray-600 space-x-4 mb-2"><span class="font-medium">${escape(assignment.courseCode)} - ${escape(assignment.course)}</span> <span>${escape(assignment.points)} points</span></div> <p class="text-sm text-gray-600 mb-3">${escape(assignment.description)}</p></div></div> <div class="flex items-center justify-between text-sm"><div class="flex items-center text-gray-600"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> ${escape(formatDueDate(assignment.dueDate))}</div> ${assignment.grade !== void 0 && assignment.grade !== null ? `<div class="flex items-center text-green-600 font-medium"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg> ${escape(assignment.grade)}/${escape(assignment.points)}</div>` : ``}</div> <div class="mt-4 flex justify-between"><button class="btn-secondary text-sm" data-svelte-h="svelte-2okj8t">View Details</button> ${userRole === "student" ? `${assignment.status === "pending" ? `<button class="btn-primary text-sm" data-svelte-h="svelte-1c9cabh">Submit Assignment</button>` : `${assignment.status === "submitted" ? `<button class="btn-secondary text-sm" disabled data-svelte-h="svelte-msz46n">Submitted</button>` : ``}`}` : `${userRole === "lecturer" ? `${assignment.status === "submitted" ? `<button class="btn-primary text-sm" data-svelte-h="svelte-105hg1g">Grade Assignment</button>` : `<button class="btn-secondary text-sm" data-svelte-h="svelte-jaem01">Edit Assignment</button>`}` : ``}`}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let userRole;
  let filteredAssignments;
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  const assignments = [
    {
      id: "1",
      title: "React Component Architecture",
      course: "Advanced Web Development",
      courseCode: "CS401",
      dueDate: "2024-01-20T23:59:00",
      status: "pending",
      description: "Build a complex React application with proper component architecture.",
      points: 100,
      submitted: userRole === "student" ? false : null,
      grade: userRole === "lecturer" ? null : null
    },
    {
      id: "2",
      title: "Database Design Project",
      course: "Database Systems",
      courseCode: "CS302",
      dueDate: "2024-01-25T23:59:00",
      status: "submitted",
      description: "Design and implement a normalized database for an e-commerce system.",
      points: 150,
      submitted: userRole === "student" ? true : null,
      grade: userRole === "lecturer" ? null : 85
    },
    {
      id: "3",
      title: "Team Project Proposal",
      course: "Software Engineering",
      courseCode: "CS350",
      dueDate: "2024-01-18T17:00:00",
      status: "graded",
      description: "Submit a detailed proposal for your semester-long team project.",
      points: 75,
      submitted: userRole === "student" ? true : null,
      grade: 92
    }
  ];
  let filterCourse = "all";
  const courses = ["CS401", "CS302", "CS350"];
  user = $authStore.user;
  userRole = user?.role || "student";
  filteredAssignments = assignments.filter((assignment) => {
    const courseMatch = filterCourse === "all";
    return courseMatch;
  });
  $$unsubscribe_authStore();
  return `${$$result.head += `<!-- HEAD_svelte-m0gm3y_START -->${$$result.title = `<title>Assignments - University Management Platform</title>`, ""}<!-- HEAD_svelte-m0gm3y_END -->`, ""} <div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-gray-900">${escape(userRole === "student" ? "My Assignments" : userRole === "lecturer" ? "Assignment Management" : "All Assignments")}</h1> <p class="text-gray-600 mt-1">${escape(userRole === "student" ? "Track and submit your assignments" : userRole === "lecturer" ? "Create and grade assignments" : "System assignment overview")}</p></div> ${userRole === "lecturer" ? `<button class="btn-primary" data-svelte-h="svelte-ads5fl"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        Create Assignment</button>` : ``}</div>  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4"><div class="flex flex-wrap gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1" data-svelte-h="svelte-k3ni99">Status</label> <select class="input-field min-w-[120px]"><option value="all" data-svelte-h="svelte-rskcdc">All Status</option><option value="pending" data-svelte-h="svelte-mygx0s">Pending</option><option value="submitted" data-svelte-h="svelte-wjchc">Submitted</option><option value="graded" data-svelte-h="svelte-102w0me">Graded</option></select></div> <div><label class="block text-sm font-medium text-gray-700 mb-1" data-svelte-h="svelte-176bdaq">Course</label> <select class="input-field min-w-[200px]"><option value="all" data-svelte-h="svelte-11dx1re">All Courses</option>${each(courses, (course) => {
    return `<option${add_attribute("value", course, 0)}>${escape(course)}</option>`;
  })}</select></div></div></div>  <div class="space-y-4">${each(filteredAssignments, (assignment) => {
    return `${validate_component(AssignmentCard, "AssignmentCard").$$render($$result, { assignment, userRole }, {}, {})}`;
  })}</div> ${filteredAssignments.length === 0 ? `<div class="text-center py-12"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> <h3 class="mt-2 text-sm font-medium text-gray-900" data-svelte-h="svelte-ge1uci">No assignments found</h3> <p class="mt-1 text-sm text-gray-500">${escape("No assignments available at the moment.")}</p></div>` : ``}</div>`;
});
export {
  Page as default
};
