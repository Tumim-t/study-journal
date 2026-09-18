'use client'

import { useState } from 'react'
import { ArrowRight, Zap, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Input, Label } from '@/components/ui/field'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function fillDemo() {
    setEmail('elena.vance@campus.edu')
    setPassword('studyjournal')
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border/70 bg-card p-8 shadow-[0_20px_60px_-40px_rgba(60,55,40,0.5)] sm:p-10">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-accent">
          <BookOpen className="size-6 text-accent-foreground" strokeWidth={1.75} />
        </div>
        <h1 className="mt-5 font-heading text-3xl font-bold tracking-tight text-foreground">
          Welcome Back
        </h1>
        <p className="mt-2 text-balance text-muted-foreground">
          Log in to share your thoughts and contribute to Study Journal.
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 space-y-5"
      >
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@campus.edu"
            autoComplete="email"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <Label htmlFor="password" className="mb-0">
              Password
            </Label>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-[15px] font-semibold text-background transition-opacity hover:opacity-90"
        >
          Log In
          <ArrowRight className="size-4" />
        </button>

        <button
          type="button"
          onClick={fillDemo}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-[15px] font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <Zap className="size-4 text-primary" />
          Demo Student Login (Elena Vance)
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here?{' '}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  )
}
