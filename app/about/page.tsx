import { BookOpen, Sparkles, Coffee, NotebookPen } from 'lucide-react'
import { PageShell } from '@/components/page-shell'

const values = [
  {
    icon: Sparkles,
    title: 'Gentle, not hustle',
    body: 'We believe studying can feel calm and intentional instead of frantic and guilt-driven.',
  },
  {
    icon: NotebookPen,
    title: 'Practical over perfect',
    body: 'Every idea here is small enough to try tonight — no overhauling your whole life required.',
  },
  {
    icon: Coffee,
    title: 'Made for real student life',
    body: 'Late lectures, part-time jobs, and messy weeks included. These tips bend around your reality.',
  },
]

export default function AboutPage() {
  return (
    <PageShell>
      <section className="bg-[oklch(0.95_0.008_60)]">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent">
            <BookOpen className="size-6 text-accent-foreground" strokeWidth={1.75} />
          </div>
          <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About Study Journal
          </h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-muted-foreground">
            Study Journal is a space for students to find simple, practical ideas for studying,
            staying productive, and navigating student life.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="prose-none max-w-2xl text-lg leading-relaxed text-muted-foreground">
          <p>
            It started as a private notebook — a place to keep the study tricks that actually worked
            and quietly forget the ones that didn&apos;t. Over time it grew into something worth
            sharing: honest notes on focus, note-taking, motivation, and the small rituals that make
            long semesters feel a little more human.
          </p>
          <p className="mt-6">
            There are no productivity gurus here and no promises of overnight transformation. Just a
            growing collection of ideas from students who are figuring it out one evening at a time —
            and romanticizing the academic struggle while they do.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-border/70 bg-card p-6"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-accent">
                <v.icon className="size-5 text-accent-foreground" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
