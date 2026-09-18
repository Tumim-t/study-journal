import { Mail } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { ContactForm } from '@/components/contact-form'

export default function ContactPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[oklch(0.9_0.03_300)]">
          <Mail className="size-6 text-[oklch(0.4_0.06_300)]" strokeWidth={1.75} />
        </div>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-5 text-balance text-lg leading-relaxed text-muted-foreground">
          Have a question or want to share an idea? We&apos;d love to hear from you.
        </p>
        <a
          href="mailto:tumimtaye40@gmail.com"
          className="mt-4 inline-block text-[15px] font-medium text-primary hover:underline"
        >
          tumimtaye40@gmail.com
        </a>

        <div className="mt-12 text-left">
          <ContactForm />
        </div>
      </section>
    </PageShell>
  )
}
