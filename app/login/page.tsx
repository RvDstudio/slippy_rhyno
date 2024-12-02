import Messages from "./messages";
import {
  signIn,
  signUp,
  signInWithEmail,
  signInWithGoogle,
  signInWithGithub,
  signInWithDiscord,
} from "./actions";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="w-full h-screen lg:grid  lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid p-8 rounded-2xl gap-6 bg-gray-100 border border-gray-200 shadow-md">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-gray-500">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="animate-in grid gap-4" action={signIn}>
            <div className="grid gap-2 text-gray-500">
              <label className="text-md" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center text-gray-500">
                <label className="text-md" htmlFor="password">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <input
                className="rounded-md px-4 py-2 bg-inherit border"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>
            <button className="bg-green-700 rounded-md px-4 py-2 text-foreground">
              Sign In
            </button>
            <button
              formAction={signUp}
              className="border  rounded-md px-4 py-2 text-gray-500"
            >
              Sign Up
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <form className="animate-in">
            <div className="flex items-center w-full space-x-2 text-foreground">
              <Button
                variant="outline"
                formAction={signInWithGoogle}
                className="flex-grow border bg-transparent rounded-md px-4 py-2 text-gray-500 hover:bg-gray-500"
              >
                Google
              </Button>
              <Button
                variant="outline"
                formAction={signInWithGithub}
                className="flex-grow border bg-transparent rounded-md px-4 py-2 text-gray-500 hover:bg-gray-500"
              >
                Github
              </Button>
              <Button
                variant="outline"
                formAction={signInWithDiscord}
                className="flex-grow border bg-transparent rounded-md px-4 py-2 text-gray-500 hover:bg-gray-500"
              >
                Discord
              </Button>
            </div>
          </form>

          <form action={signInWithEmail}>
            <div className="flex items-center w-full space-x-2 text-foreground">
              <input
                className="flex-grow rounded-md px-4 py-2 bg-inherit border"
                name="email"
                placeholder="you@example.com"
                required
              />
              <Button
                variant="outline"
                className="flex-grow border bg-transparent rounded-md px-4 py-2 text-gray-500 hover:bg-gray-500"
              >
                Magic Link
              </Button>
            </div>
          </form>

          <Suspense>
            <Messages />
          </Suspense>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/images/login-bg.png"
          alt="Login cover"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
