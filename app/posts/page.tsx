'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PageShell } from '@/components/page-shell'
import { CategoryTag } from '@/components/category-tag'
import { supabase } from '@/lib/supabase'
import {
  deleteOwnedPost,
  getOwnedPosts,
  type OwnedPost,
} from '@/lib/posts-supabase'

function isOwnerImagePath(path: string, userId: string) {
  return path.startsWith(`${userId}/`)
}

export default function OwnedPostsPage() {
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null)
  const [posts, setPosts] = useState<OwnedPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
        setIsLoading(false)
        return
      }

      setCurrentUser({ id: user.id })
      const ownedPosts = await getOwnedPosts(user.id)
      if (isActive) {
        setPosts(ownedPosts)
        setIsLoading(false)
      }
    }

    void load()

    return () => {
      isActive = false
    }
  }, [])

  async function handleDelete(post: OwnedPost) {
    if (!currentUser || isDeleting) return
    if (post.author_id !== currentUser.id) {
      setErrorMessage('This post does not belong to your account.')
      return
    }
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return

    setErrorMessage('')
    setIsDeleting(true)

    const result = await deleteOwnedPost(post.id, currentUser.id)
    if (result.error || result.deletedId !== post.id) {
      setErrorMessage(result.error || 'The post could not be deleted.')
      setIsDeleting(false)
      return
    }

    if (post.cover_image && isOwnerImagePath(post.cover_image, currentUser.id)) {
      await supabase.storage.from('blog-images').remove([post.cover_image]).catch(() => undefined)
    }

    setPosts((currentPosts) => currentPosts.filter((item) => item.id !== post.id))
    setIsDeleting(false)
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
              Your Posts
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your drafts and published study notes.
            </p>
          </div>
          <Link
            href="/write"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Write a Post
          </Link>
        </div>

        {errorMessage && (
          <p className="mt-8 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        )}

        {isLoading ? (
          <p className="mt-10 text-muted-foreground">Loading your posts…</p>
        ) : !currentUser ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">Log in to view and manage your posts.</p>
            <Link href="/login" className="mt-4 inline-block font-semibold text-primary hover:underline">
              Log In
            </Link>
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-heading text-xl font-semibold text-foreground">No posts yet</p>
            <p className="mt-2 text-muted-foreground">Your drafts and published posts will appear here.</p>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-primary/30 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium uppercase tracking-wide text-muted-foreground">
                      <span
                        className={
                          post.status === 'published'
                            ? 'rounded-full bg-primary/10 px-2.5 py-1 text-primary'
                            : 'rounded-full bg-muted px-2.5 py-1 text-muted-foreground'
                        }
                      >
                        {post.status}
                      </span>
                      <span className="text-border" aria-hidden="true">
                        •
                      </span>
                      <CategoryTag category={post.category} />
                      <span className="text-border" aria-hidden="true">
                        •
                      </span>
                      <time dateTime={post.updated_at}>
                        {new Date(post.updated_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                    <h2 className="mt-3 font-heading text-2xl font-semibold leading-snug tracking-tight text-foreground">
                      <Link
                        href={
                          post.status === 'published'
                            ? `/blog/${post.slug}`
                            : `/write/${post.slug}`
                        }
                        className="hover:text-primary"
                      >
                        {post.title}
                      </Link>
                    </h2>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Link
                      href={`/write/${post.slug}`}
                      className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => void handleDelete(post)}
                      disabled={isDeleting}
                      className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-destructive transition-colors hover:border-destructive/50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  )
}
