'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Zap, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Input, Label } from '@/components/ui/field'
import { supabase } from '@/lib/supabase'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function fillDemo() {
    setEmail('elena.vance@campus.edu')
    setPassword('studyjournal')
    setErrorMessage('')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')

    if (!email || !password) {
      setErrorMessage('Enter your email address and password.')
      return
    }

    setIsLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setIsLoading(false)
      return
    }

    router.replace('/write')
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

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {errorMessage && (
          <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        )}

        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setErrorMessage('')
            }}
            placeholder="you@campus.edu"
            autoComplete="email"
            disabled={isLoading}
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
            onChange={(event) => {
              setPassword(event.target.value)
              setErrorMessage('')
            }}
            placeholder="••••••••••"
            autoComplete="current-password"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-[15px] font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Logging in…' : 'Log In'}
          <ArrowRight className="size-4" />
        </button>

        <button
          type="button"
          onClick={fillDemo}
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-[15px] font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
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
