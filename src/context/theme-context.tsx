'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

// Check if we're in the browser environment
const isBrowser = typeof window !== 'undefined';

// Function to detect if dark mode is already active
const isDarkModeActive = () => {
  if (!isBrowser) return false;
  return document.documentElement.classList.contains('dark');
};

// Function to set a cookie with theme preference
const setThemeCookie = (isDark: boolean) => {
  // Set cookie that expires in 1 year
  const oneYear = 365 * 24 * 60 * 60 * 1000;
  const expires = new Date(Date.now() + oneYear).toUTCString();
  document.cookie = `theme=${
    isDark ? 'dark' : 'light'
  }; expires=${expires}; path=/; samesite=strict`;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize with the current state from the document to prevent flashing
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeActive());

  // On mount, ensure localStorage matches the current state
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    // Check if we need to update the state or the document
    const shouldBeDark =
      storedTheme === 'dark' || (!storedTheme && systemPrefersDark);

    if (shouldBeDark !== isDarkMode) {
      setIsDarkMode(shouldBeDark);

      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Also set the cookie for server-side rendering
      setThemeCookie(shouldBeDark);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      // Store in localStorage
      localStorage.setItem('theme', newValue ? 'dark' : 'light');

      // Also set cookie for server-side rendering
      setThemeCookie(newValue);

      // Toggle class on document
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
