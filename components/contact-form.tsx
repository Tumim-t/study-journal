'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { Input, Textarea, Label } from '@/components/ui/field'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
    e.currentTarget.reset()
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-border/70 bg-card p-6 sm:p-8"
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Elena Vance" required />
      </div>
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input id="email" name="email" type="email" placeholder="you@campus.edu" required />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Share a question, an idea, or a study ritual you love…"
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Send className="size-4" />
        Send Message
      </button>

      {sent && (
        <p className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
          <CheckCircle2 className="size-4" />
          Thanks! Your message has been sent.
        </p>
      )}
    </form>
  )
}
