// Client-side utility functions

// Get or create a unique ID for anonymous users
export function getAnonymousUserId(): string {
  if (typeof window === 'undefined') return '';

  // Try to get from localStorage
  let userId = localStorage.getItem('anonymousUserId');

  // If not found, create a new one
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem('anonymousUserId', userId);
  }

  return userId;
}

// Generate a UUID v4 (simplified version)
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    },
  );
}

// Save theme preference via API
export async function saveThemePreference(
  userId: string,
  theme: 'light' | 'dark',
): Promise<boolean> {
  try {
    const response = await fetch('/api/theme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, theme }),
    });

    if (!response.ok) {
      throw new Error(
        `API responded with status: ${response.status}`,
      );
    }

    return true;
  } catch (error) {
    console.error('Error saving theme via API:', error);
    return false;
  }
}

// Get theme preference from API
export async function getThemePreference(): Promise<
  'light' | 'dark'
> {
  try {
    const response = await fetch('/api/theme');

    if (!response.ok) {
      throw new Error(
        `API responded with status: ${response.status}`,
      );
    }

    const data = await response.json();
    return data.theme as 'light' | 'dark';
  } catch (error) {
    console.error('Error getting theme from API:', error);
    return 'light'; // Default to light theme if API fails
  }
}
