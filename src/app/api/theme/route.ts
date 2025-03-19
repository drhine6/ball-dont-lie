import { NextRequest, NextResponse } from 'next/server';
import { setUserTheme } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { userId, theme } = await request.json();

    if (
      !userId ||
      !theme ||
      (theme !== 'light' && theme !== 'dark')
    ) {
      return NextResponse.json(
        { error: 'Invalid request: userId and theme are required' },
        { status: 400 },
      );
    }

    // Save to database
    const success = await setUserTheme(
      userId,
      theme as 'light' | 'dark',
    );

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save theme preference' },
        { status: 500 },
      );
    }

    // Set cookie for server-side rendering
    const response = NextResponse.json({ success: true });

    // Set cookie that expires in 1 year
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    response.cookies.set({
      name: 'theme',
      value: theme,
      expires: Date.now() + oneYear,
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Error saving theme:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  // Read theme from cookie and return it
  const theme = request.cookies.get('theme')?.value || 'light';

  return NextResponse.json({ theme });
}
