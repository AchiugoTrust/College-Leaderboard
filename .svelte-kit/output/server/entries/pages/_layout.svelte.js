import { c as create_ssr_component, a as subscribe } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let isAuthPage = false;
  isAuthPage = $page.route.id?.includes("auth") || $page.route.id === "/";
  $$unsubscribe_page();
  return `${isAuthPage ? `<main class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">${slots.default ? slots.default({}) : ``}</main>` : `<div class="min-h-screen bg-gray-50">${slots.default ? slots.default({}) : ``}</div>`}`;
});
export {
  Layout as default
};
