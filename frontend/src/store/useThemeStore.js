import { create } from "zustand";

// Store for managing the theme of the application
// It uses Zustand for state management and stores the theme in localStorage so that everytime we refresh the page, the theme is preserved
// The default theme is set to "dracula" if no theme is found in localStorage
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "dracula",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
