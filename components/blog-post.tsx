import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock3 } from 'lucide-react'
import { CategoryTag } from '@/components/category-tag'
import { PageShell } from '@/components/page-shell'
import type { Post } from '@/lib/posts'

export function BlogPost({ post }: { post: Post }) {
  return (
    <PageShell>
      <article>
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-10 sm:px-6 sm:pt-14 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Home
          </Link>

          <div className="mx-auto mt-10 max-w-4xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-muted-foreground">
              <CategoryTag category={post.category} className="text-[10px]" />
              <span className="text-border" aria-hidden="true">
                •
              </span>
              <time dateTime={post.publishedAt}>{post.date}</time>
              <span className="text-border" aria-hidden="true">
                •
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-4" aria-hidden="true" />
                {post.readingTime}
              </span>
            </div>

            <h1 className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {post.excerpt}
            </p>
          </div>

          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_24px_60px_-35px_rgba(60,55,40,0.35)] sm:aspect-[21/9]">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
              className="object-cover"
            />
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-5 pb-16 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-accent" aria-hidden="true" />

          <div className="mt-10 space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-heading text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
                  {section.heading}
                </h2>

                <div className="mt-5 space-y-5 text-[17px] leading-[1.85] text-foreground/85">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.list && (
                  <ul className="mt-6 space-y-3.5 text-[17px] leading-[1.85] text-foreground/85">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3.5">
                        <span className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.quote && (
                  <blockquote className="mt-8 border-l-2 border-accent pl-6 font-heading text-xl font-medium italic leading-relaxed text-foreground sm:text-2xl">
                    {section.quote}
                  </blockquote>
                )}
              </section>
            ))}
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-border/70 pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to Home
            </Link>
            <span className="text-sm text-muted-foreground">Study Journal</span>
          </div>
        </div>
      </article>
    </PageShell>
  )
}
