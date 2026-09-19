'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { Input, Textarea, Label } from '@/components/ui/field'
import { supabase } from '@/lib/supabase'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (isSubmitting) return

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName) {
      setErrorMessage('Enter your name.')
      return
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('Enter a valid email address.')
      return
    }

    if (!trimmedMessage) {
      setErrorMessage('Enter a message.')
      return
    }

    setErrorMessage('')
    setSent(false)
    setIsSubmitting(true)

    const { error } = await supabase.from('contact_messages').insert({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    })

    if (error) {
      setErrorMessage(error.message)
      setIsSubmitting(false)
      return
    }

    setName('')
    setEmail('')
    setMessage('')
    setSent(true)
    setIsSubmitting(false)

    window.setTimeout(() => setSent(false), 4000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-border/70 bg-card p-6 sm:p-8"
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setErrorMessage('')
          }}
          placeholder="Elena Vance"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setErrorMessage('')
          }}
          placeholder="you@campus.edu"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            setErrorMessage('')
          }}
          rows={5}
          placeholder="Share a question, an idea, or a study ritual you love…"
          required
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="size-4" />
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>

      {errorMessage && (
        <p className="text-sm font-medium text-destructive" role="alert">
          {errorMessage}
        </p>
      )}

      {sent && (
        <p className="flex items-center justify-center gap-2 text-sm font-medium text-primary" role="status">
          <CheckCircle2 className="size-4" />
          Thanks! Your message has been sent.
        </p>
      )}
    </form>
  )
}
