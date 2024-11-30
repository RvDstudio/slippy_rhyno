import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    // The `/auth/callback` route exchanges an auth code for the user's session.
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        await supabase.auth.exchangeCodeForSession(code);
    }

    // Redirect to the dashboard after login
    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
}
