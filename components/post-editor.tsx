'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
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
import {
  ArticleSection,
  CATEGORIES,
  type Category,
  type Post,
} from '@/lib/posts'
import {
  getOwnedPostBySlug,
  serializePostContent,
  type OwnedPost,
} from '@/lib/posts-supabase'
import { supabase } from '@/lib/supabase'
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

type UploadedCover = {
  path: string
  isNew: boolean
}

function createSlug(title: string) {
  const slug = title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'untitled-post'
}

function createStoredContent(title: string, category: Category, body: string) {
  const paragraphs = body
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  const firstParagraph = paragraphs[0] || body.trim()
  const excerpt =
    firstParagraph.length > 160 ? `${firstParagraph.slice(0, 157)}…` : firstParagraph
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`
  const now = new Date()
  const sections: ArticleSection[] = [
    {
      heading: 'Article Body',
      paragraphs,
    },
  ]
  const post: Post = {
    slug: '',
    title,
    excerpt,
    date: now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    publishedAt: now.toISOString().slice(0, 10),
    category,
    image: '/placeholder.svg',
    readingTime,
    sections,
  }

  return serializePostContent(post)
}

async function insertPost({
  title,
  category,
  body,
  status,
  authorId,
  coverImage,
}: {
  title: string
  category: Category
  body: string
  status: 'draft' | 'published'
  authorId: string
  coverImage: string | null
}) {
  const baseSlug = createSlug(title)

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const slug = attempt === 0 ? baseSlug : `${baseSlug}-${attempt + 1}`
    const { error } = await supabase.from('posts').insert({
      title,
      slug,
      category,
      content: createStoredContent(title, category, body),
      author_id: authorId,
      status,
      cover_image: coverImage,
    })

    if (!error) {
      return slug
    }

    if (error.code !== '23505') {
      throw new Error(error.message)
    }
  }

  throw new Error('Could not create a unique slug for this post.')
}

async function updatePost({
  id,
  baseSlug,
  title,
  category,
  body,
  status,
  authorId,
  coverImage,
}: {
  id: string
  baseSlug: string
  title: string
  category: Category
  body: string
  status: 'draft' | 'published'
  authorId: string
  coverImage: string | null
}) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const slug = attempt === 0 ? baseSlug : `${baseSlug}-${attempt + 1}`
    const { error } = await supabase
      .from('posts')
      .update({
        title,
        slug,
        category,
        content: createStoredContent(title, category, body),
        status,
        cover_image: coverImage,
      })
      .eq('id', id)
      .eq('author_id', authorId)

    if (!error) {
      return slug
    }

    if (error.code !== '23505') {
      throw new Error(error.message)
    }
  }

  throw new Error('Could not create a unique slug for this post.')
}

function isOwnerImagePath(path: string, userId: string) {
  return path.startsWith(`${userId}/`)
}

export function PostEditor({ postSlug }: { postSlug?: string }) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState('Building a Restorative Evening Study Ritual')
  const [category, setCategory] = useState<Category>('Habits')
  const [body, setBody] = useState(SAMPLE_BODY)
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPath, setCoverPath] = useState<string | null>(null)
  const [uploadedCover, setUploadedCover] = useState<UploadedCover | null>(null)
  const [editingPost, setEditingPost] = useState<OwnedPost | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isLoadingPost, setIsLoadingPost] = useState(Boolean(postSlug))
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function getCoverPreviewUrl(path: string | null) {
    if (!path) return null
    if (path.startsWith('/') || path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }

    const { data } = await supabase.storage.from('blog-images').createSignedUrl(path, 60 * 60)
    return data?.signedUrl || null
  }

  useEffect(() => {
    let isActive = true

    async function load() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (!isActive) return

      if (error || !user) {
        setCurrentUser(null)
        setErrorMessage('Log in to save, edit, or publish a post.')
        setIsCheckingAuth(false)
        setIsLoadingPost(false)
        return
      }

      setCurrentUser({ id: user.id })

      if (postSlug) {
        const post = await getOwnedPostBySlug(postSlug, user.id)
        if (!isActive) return

        if (!post) {
          setErrorMessage('This post was not found or does not belong to your account.')
          setIsLoadingPost(false)
          return
        }

        setEditingPost(post)
        setTitle(post.title)
        setCategory(post.category)
        setBody(post.body)
        setCoverPath(post.cover_image)
        setCoverPreviewUrl(await getCoverPreviewUrl(post.cover_image))
        setIsLoadingPost(false)
      }

      setIsCheckingAuth(false)
    }

    void load()

    return () => {
      isActive = false
    }
  }, [postSlug])

  async function getAuthenticatedUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      setErrorMessage('Log in to save, edit, or publish a post.')
      setCurrentUser(null)
      return null
    }

    setCurrentUser({ id: user.id })
    return { id: user.id }
  }

  async function uploadCover(userId: string): Promise<UploadedCover | null> {
    if (!coverFile) return null
    if (uploadedCover) return uploadedCover

    setIsUploading(true)
    const fileExtension = coverFile.name.includes('.')
      ? coverFile.name.split('.').pop()?.toLowerCase()
      : undefined
    const extension =
      fileExtension && /^[a-z0-9]+$/.test(fileExtension) ? `.${fileExtension}` : ''
    const originalName = coverFile.name
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'cover'

    try {
      for (let attempt = 0; attempt < 3; attempt += 1) {
        const uniquePart =
          typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`
        const filename = `${originalName}-${uniquePart}${extension}`
        const path = `${userId}/${filename}`
        const { error } = await supabase.storage.from('blog-images').upload(path, coverFile, {
          contentType: coverFile.type || 'application/octet-stream',
          upsert: false,
        })

        if (!error) {
          const uploaded = { path, isNew: true }
          setUploadedCover(uploaded)
          setCoverPath(path)
          return uploaded
        }

        if (error.statusCode !== '409') {
          throw new Error(error.message)
        }
      }
    } finally {
      setIsUploading(false)
    }

    throw new Error('Could not create a unique storage path for the cover image.')
  }

  async function removeUploadedCover(path: string) {
    await supabase.storage.from('blog-images').remove([path])
  }

  async function handleSubmit(status: 'draft' | 'published') {
    if (isSaving || isCheckingAuth || isLoadingPost) return

    const user = await getAuthenticatedUser()
    if (!user) return

    const trimmedTitle = title.trim()
    const trimmedBody = body.trim()

    if (!trimmedTitle) {
      setErrorMessage('Enter an article title before saving.')
      return
    }

    if (!trimmedBody) {
      setErrorMessage('Enter article content before saving.')
      return
    }

    setErrorMessage('')
    setSuccessMessage('')
    setIsSaving(true)

    let newlyUploadedCover: UploadedCover | null = null

    try {
      newlyUploadedCover = await uploadCover(user.id)
      const coverImage = newlyUploadedCover?.path ?? coverPath

      if (editingPost) {
        const baseSlug =
          trimmedTitle === editingPost.title ? editingPost.slug : createSlug(trimmedTitle)
        const slug = await updatePost({
          id: editingPost.id,
          baseSlug,
          title: trimmedTitle,
          category,
          body: trimmedBody,
          status,
          authorId: user.id,
          coverImage,
        })

        if (
          newlyUploadedCover?.isNew &&
          editingPost.cover_image &&
          editingPost.cover_image !== newlyUploadedCover.path &&
          isOwnerImagePath(editingPost.cover_image, user.id)
        ) {
          await removeUploadedCover(editingPost.cover_image).catch(() => undefined)
        }

        if (status === 'published') {
          router.push(`/blog/${slug}`)
          return
        }

        setSuccessMessage('Post updated and saved as a draft.')
      } else {
        const slug = await insertPost({
          title: trimmedTitle,
          category,
          body: trimmedBody,
          status,
          authorId: user.id,
          coverImage,
        })

        if (status === 'published') {
          router.push(`/blog/${slug}`)
          return
        }

        setSuccessMessage(`Draft saved. Your post slug is ${slug}.`)
      }
    } catch (error) {
      if (newlyUploadedCover?.isNew && newlyUploadedCover.path) {
        await removeUploadedCover(newlyUploadedCover.path).catch(() => undefined)
        setUploadedCover(null)
        setCoverPath(editingPost?.cover_image ?? null)
      }
      setErrorMessage(error instanceof Error ? error.message : 'Could not save this post.')
    } finally {
      setIsSaving(false)
    }
  }

  function handleFile(file?: File) {
    if (!file) return

    if (coverPreviewUrl) {
      URL.revokeObjectURL(coverPreviewUrl)
    }

    setCoverFile(file)
    setUploadedCover(null)
    setCoverPath(editingPost?.cover_image ?? null)
    setCoverPreviewUrl(URL.createObjectURL(file))
    setErrorMessage('')
  }

  async function handleRemoveCover() {
    if (coverPreviewUrl) {
      URL.revokeObjectURL(coverPreviewUrl)
    }

    setCoverFile(null)
    setUploadedCover(null)
    setCoverPath(editingPost?.cover_image ?? null)
    setCoverPreviewUrl(await getCoverPreviewUrl(editingPost?.cover_image ?? null))
  }

  const isEditing = Boolean(editingPost)

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 border-b border-border/70 pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
            {isEditing ? 'Edit Post' : 'Write a Post'}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isEditing
              ? 'Update your study notes, reflections, or campus routines.'
              : 'Share your study methods, reflections, or campus routines.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void handleSubmit('draft')}
            disabled={isCheckingAuth || isLoadingPost || isSaving || isUploading || !currentUser}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Bookmark className="size-4" />
            {isUploading ? 'Uploading…' : isSaving ? 'Saving…' : 'Save Draft'}
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50">
            <Eye className="size-4" />
            Preview
          </button>
          <button
            type="button"
            onClick={() => void handleSubmit('published')}
            disabled={isCheckingAuth || isLoadingPost || isSaving || isUploading || !currentUser}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="size-4" />
            {isUploading ? 'Uploading…' : isSaving ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </div>

      {(isCheckingAuth || isLoadingPost || isUploading || errorMessage || successMessage) && (
        <p
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            errorMessage
              ? 'border-destructive/30 bg-destructive/10 text-destructive'
              : successMessage
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground'
          }`}
          aria-live="polite"
        >
          {isCheckingAuth
            ? 'Checking your session…'
            : isLoadingPost
              ? 'Loading your post…'
              : isUploading
                ? 'Uploading cover image…'
                : errorMessage
                  ? errorMessage
                  : successMessage}
        </p>
      )}

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

        {coverPreviewUrl ? (
          <div className="relative mt-3 aspect-[21/9] overflow-hidden rounded-2xl border border-border">
            <Image src={coverPreviewUrl} alt="Cover preview" fill className="object-cover" />
            <button
              onClick={() => void handleRemoveCover()}
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
