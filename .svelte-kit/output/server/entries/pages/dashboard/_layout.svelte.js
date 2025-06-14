import { c as create_ssr_component, a as subscribe, e as escape, b as each, d as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import { p as page } from "../../../chunks/stores.js";
import { a as authStore } from "../../../chunks/auth.js";
function getIcon(iconName) {
  const icons = {
    home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    "book-open": "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    "file-text": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    trophy: "M12 15l-2-5h4l-2 5zM12 15l-2-5h4l-2 5zM9 12l3-8 3 8M8 21l4-7 4 7H8z",
    star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    award: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    users: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
    "edit-3": "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    clipboard: "M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    "user-check": "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    "bar-chart": "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  };
  return icons[iconName] || icons.home;
}
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let userRole;
  let navItems;
  let $authStore, $$unsubscribe_authStore;
  let $page, $$unsubscribe_page;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const studentNavItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "home"
    },
    {
      href: "/dashboard/courses",
      label: "My Courses",
      icon: "book-open"
    },
    {
      href: "/dashboard/assignments",
      label: "Assignments",
      icon: "file-text"
    },
    {
      href: "/dashboard/leaderboard",
      label: "Leaderboard",
      icon: "trophy"
    },
    {
      href: "/dashboard/grades",
      label: "Grades",
      icon: "star"
    },
    {
      href: "/dashboard/transcript",
      label: "Transcript",
      icon: "award"
    }
  ];
  const lecturerNavItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "home"
    },
    {
      href: "/dashboard/courses",
      label: "My Courses",
      icon: "book-open"
    },
    {
      href: "/dashboard/assignments",
      label: "Assignments",
      icon: "file-text"
    },
    {
      href: "/dashboard/students",
      label: "Students",
      icon: "users"
    },
    {
      href: "/dashboard/grading",
      label: "Grading",
      icon: "edit-3"
    },
    {
      href: "/dashboard/exams",
      label: "Exams",
      icon: "clipboard"
    }
  ];
  const staffNavItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "home"
    },
    {
      href: "/dashboard/courses",
      label: "All Courses",
      icon: "book-open"
    },
    {
      href: "/dashboard/students",
      label: "Students",
      icon: "users"
    },
    {
      href: "/dashboard/lecturers",
      label: "Lecturers",
      icon: "user-check"
    },
    {
      href: "/dashboard/reports",
      label: "Reports",
      icon: "bar-chart"
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: "settings"
    }
  ];
  user = $authStore.user;
  userRole = user?.role || "student";
  navItems = userRole === "student" ? studentNavItems : userRole === "lecturer" ? lecturerNavItems : staffNavItems;
  $$unsubscribe_authStore();
  $$unsubscribe_page();
  return `<div class="bg-white w-64 shadow-sm border-r border-gray-200 flex flex-col"> <div class="flex items-center px-6 py-4 border-b border-gray-200" data-svelte-h="svelte-1f9s54v"><div class="bg-primary-600 rounded-lg p-2 mr-3"><svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div> <span class="text-xl font-bold text-gray-900">UniPortal</span></div>  <div class="px-6 py-4 border-b border-gray-200"><div class="flex items-center"><div class="bg-primary-100 rounded-full h-10 w-10 flex items-center justify-center"><span class="text-primary-600 font-semibold text-sm">${escape(user?.name?.split(" ").map((n) => n[0]).join("") || "U")}</span></div> <div class="ml-3"><p class="text-sm font-medium text-gray-900">${escape(user?.name || "User")}</p> <p class="text-xs text-gray-500 capitalize">${escape(userRole)}</p></div></div></div>  <nav class="flex-1 px-4 py-4 space-y-1">${each(navItems, (item) => {
    return `<a${add_attribute("href", item.href, 0)} class="${"sidebar-link " + escape($page.url.pathname === item.href ? "active" : "", true)}"><svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${add_attribute("d", getIcon(item.icon), 0)}></path></svg> ${escape(item.label)} </a>`;
  })}</nav>  <div class="px-4 py-4 border-t border-gray-200"><button class="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors duration-200" data-svelte-h="svelte-j6um4q"><svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
      Logout</button></div></div>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let unreadCount;
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  const notifications = [
    {
      id: "1",
      title: "New assignment posted",
      message: "CS401: React Component Architecture",
      time: "5 min ago",
      unread: true
    },
    {
      id: "2",
      title: "Grade published",
      message: "Database Design Project: 85/100",
      time: "1 hour ago",
      unread: true
    },
    {
      id: "3",
      title: "Course reminder",
      message: "Software Engineering class at 9:00 AM",
      time: "2 hours ago",
      unread: false
    }
  ];
  user = $authStore.user;
  unreadCount = notifications.filter((n) => n.unread).length;
  $$unsubscribe_authStore();
  return `<header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4"><div class="flex items-center justify-between"><div class="flex-1" data-svelte-h="svelte-o1xqe"></div> <div class="flex items-center space-x-4"> <div class="relative"><button class="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg> ${unreadCount > 0 ? `<span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${escape(unreadCount)}</span>` : ``}</button> ${``}</div>  <div class="flex items-center space-x-3"><div class="bg-primary-100 rounded-full h-8 w-8 flex items-center justify-center"><span class="text-primary-600 font-semibold text-sm">${escape(user?.name?.split(" ").map((n) => n[0]).join("") || "U")}</span></div> <span class="text-sm font-medium text-gray-900">${escape(user?.name || "User")}</span></div></div></div></header>  ${``}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex h-screen bg-gray-50">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})} <div class="flex-1 flex flex-col overflow-hidden">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">${slots.default ? slots.default({}) : ``}</main></div></div>`;
});
export {
  Layout as default
};
