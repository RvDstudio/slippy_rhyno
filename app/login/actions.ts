'use server'

import {createClient} from "@/utils/supabase/server";
import {cookies, headers} from "next/headers";
import {redirect} from "next/navigation";

export const signIn = async (formData: FormData) => {
    const supabase = createClient();

    const { data: session, error } = await supabase.auth.signInWithPassword({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if (error) {
        return redirect('/login?message=Could not authenticate user');
    }

    if (session) {
        return redirect('/dashboard');
    }

    return redirect('/login?message=Authentication failed');
};

export const signUp = async (formData: FormData) => {
    const origin = (await headers()).get('origin')
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
}

export const signInWithEmail = async (formData: FormData) => {
    const origin = (await headers()).get('origin')
    const email = formData.get('email') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email for login link')
}

export const signInWithGoogle = async () => {
    const origin = (await headers()).get('origin')
    const supabase = createClient()

    const { data: { url }, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }
    return redirect(url!)
}

export const signInWithGithub = async () => {
    const origin = (await headers()).get('origin')
    const supabase = createClient()

    const { data: { url }, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }

    return redirect(url!)
}

export const signInWithDiscord = async () => {
    const origin = (await headers()).get('origin')
    const supabase = createClient()

    const { data: { url }, error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }

    return redirect(url!)
}