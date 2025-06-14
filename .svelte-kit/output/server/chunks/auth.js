import { w as writable } from "./index.js";
const initialState = {
  isAuthenticated: false,
  user: null
};
const authStore = writable(initialState);
export {
  authStore as a
};
