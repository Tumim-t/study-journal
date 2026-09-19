'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { Input, Label } from '@/components/ui/field'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setNeedsEmailVerification(false)

    if (!fullName.trim() || !email || !password) {
      setErrorMessage('Enter your name, email address, and password.')
      return
    }

    setIsLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setIsLoading(false)
      return
    }

    if (data.session) {
      router.replace('/write')
      return
    }

    setPassword('')
    setIsLoading(false)
    setNeedsEmailVerification(true)
  }

  return (
    <PageShell>
      <section className="mx-auto flex max-w-6xl justify-center px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-border/70 bg-card p-8 shadow-[0_20px_60px_-40px_rgba(60,55,40,0.5)] sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-accent">
              <UserPlus className="size-6 text-accent-foreground" strokeWidth={1.75} />
            </div>
            <h1 className="mt-5 font-heading text-3xl font-bold tracking-tight text-foreground">
              Join Study Journal
            </h1>
            <p className="mt-2 text-balance text-muted-foreground">
              Create an account to publish your own study notes and reflections.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {errorMessage && (
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
                {errorMessage}
              </p>
            )}

            {needsEmailVerification && (
              <p className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary" role="status">
                Check your email to finish creating your account.
              </p>
            )}

            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={fullName}
                onChange={(event) => {
                  setFullName(event.target.value)
                  setErrorMessage('')
                }}
                placeholder="Elena Vance"
                autoComplete="name"
                disabled={isLoading}
              />
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setErrorMessage('')
                }}
                placeholder="••••••••••"
                autoComplete="new-password"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || needsEmailVerification}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-[15px] font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </PageShell>
  )
}
