'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getAnonymousUserId,
  saveThemePreference,
} from '@/lib/client-utils';

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isThemeReady: boolean;
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

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Start with a safe state to prevent hydration mismatch
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // First mount effect - get the anonymous user ID
  useEffect(() => {
    const anonymousId = getAnonymousUserId();
    if (anonymousId) {
      setUserId(anonymousId);
    }
  }, []);

  // On mount or when userId is available, determine the theme
  useEffect(() => {
    if (!isBrowser) return;

    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    // Check if we need to update the state or the document
    const shouldBeDark =
      storedTheme === 'dark' || (!storedTheme && systemPrefersDark);

    // Update state and document
    setIsDarkMode(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Mark theme as ready
    setIsThemeReady(true);

    // If we have a userId, sync with the server
    if (userId) {
      saveThemePreference(
        userId,
        shouldBeDark ? 'dark' : 'light',
      ).catch((err) =>
        console.error('Failed to sync theme with server:', err),
      );
    }
  }, [userId]);

  const toggleDarkMode = async () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      // Store in localStorage
      localStorage.setItem('theme', newValue ? 'dark' : 'light');

      // Toggle class on document
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // If we have a userId, save to database via API
      if (userId) {
        // We don't await this to keep the UI responsive
        saveThemePreference(
          userId,
          newValue ? 'dark' : 'light',
        ).catch((err) =>
          console.error('Failed to save theme to server:', err),
        );
      }

      return newValue;
    });
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleDarkMode, isThemeReady }}
    >
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
