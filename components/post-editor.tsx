'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  Bold,
  Italic,
  Type,
  Quote,
  List,
  ImagePlus,
  Bookmark,
  Eye,
  Send,
  X,
} from 'lucide-react'
import { CATEGORIES, type Category } from '@/lib/posts'
import { Input } from '@/components/ui/field'
import { cn } from '@/lib/utils'

const SAMPLE_BODY = `For the first two years of university, my evenings were chaotic marathons. I would alternate between anxious flashcard drills and aimless tab scrolling until 1:00 AM, waking up exhausted.

Everything changed when I designed a deliberate evening wind-down rhythm. Instead of measuring success by raw hours logged, I anchored my evening around three simple principles:

01. The Amber Light Transition
At 8:00 PM, all overhead fluorescents go off. A single warm desk lamp is switched on, and lecture slides are swapped for analog reading notes and pencil summaries.

02. The Low-Cognitive Buffer
I reserve difficult mathematical proofs or initial drafts for morning windows. Evenings are strictly for consolidation: highlighting printed essays, organizing tomorrow's binder, and reading literature.`

const toolbarButtons = [
  { icon: Bold, label: 'Bold' },
  { icon: Italic, label: 'Italic' },
  { icon: Type, label: 'Heading' },
  { icon: Quote, label: 'Quote' },
  { icon: List, label: 'List' },
]

export function PostEditor() {
  const [title, setTitle] = useState('Building a Restorative Evening Study Ritual')
  const [category, setCategory] = useState<Category>('Habits')
  const [body, setBody] = useState(SAMPLE_BODY)
  const [cover, setCover] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(file?: File) {
    if (!file) return
    const url = URL.createObjectURL(file)
    setCover(url)
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 lg:px-8">
      {/* Header row */}
      <div className="flex flex-col gap-5 border-b border-border/70 pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
            Write a Post
          </h1>
          <p className="mt-2 text-muted-foreground">
            Share your study methods, reflections, or campus routines.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50">
            <Bookmark className="size-4" />
            Save Draft
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50">
            <Eye className="size-4" />
            Preview
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <Send className="size-4" />
            Publish
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="mt-8">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Article Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your headline goes here…"
          className="mt-3 w-full border-none bg-transparent font-heading text-4xl font-bold tracking-tight text-foreground outline-none placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Category */}
      <div className="mt-10">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Select Category
        </label>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium uppercase tracking-wide transition-colors',
                category === c
                  ? 'border-primary bg-accent text-accent-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Cover */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Cover Photography
          </label>
          <span className="text-sm text-muted-foreground">Upload custom or choose from presets</span>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {cover ? (
          <div className="relative mt-3 aspect-[21/9] overflow-hidden rounded-2xl border border-border">
            <Image src={cover || '/placeholder.svg'} alt="Cover preview" fill className="object-cover" />
            <button
              onClick={() => setCover(null)}
              className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm hover:bg-background"
              aria-label="Remove cover photo"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-3 flex aspect-[21/9] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card/50 text-center transition-colors hover:border-primary/40 hover:bg-card"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-accent">
              <ImagePlus className="size-6 text-accent-foreground" strokeWidth={1.75} />
            </span>
            <span className="text-[15px] text-muted-foreground">
              <span className="font-semibold text-foreground">Click to choose a cover photo</span> or
              drag and drop
            </span>
          </button>
        )}
      </div>

      {/* Body */}
      <div className="mt-10">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Article Body Content
        </label>
        <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-1 border-b border-border/70 bg-muted/40 px-3 py-2.5">
            {toolbarButtons.map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-background"
              >
                <b.icon className="size-4" strokeWidth={2} />
              </button>
            ))}
            <div className="mx-2 h-5 w-px bg-border" />
            <span className="text-sm text-muted-foreground">Markdown &amp; plain text friendly</span>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={16}
            placeholder="Start writing your story…"
            className="w-full resize-y bg-transparent px-5 py-5 text-[17px] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/60"
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {body.trim() ? body.trim().split(/\s+/).length : 0} words
        </p>
      </div>
    </div>
  )
}
