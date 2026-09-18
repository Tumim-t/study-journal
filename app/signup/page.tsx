'use client'

import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { Input, Label } from '@/components/ui/field'

export default function SignupPage() {
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

          <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-5">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Elena Vance" autoComplete="name" />
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@campus.edu" autoComplete="email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-[15px] font-semibold text-background transition-opacity hover:opacity-90"
            >
              Create Account
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
