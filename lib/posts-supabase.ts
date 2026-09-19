import { supabase } from '@/lib/supabase'
import {
  CATEGORIES,
  POSTS,
  getPostBySlug,
  type ArticleSection,
  type Category,
  type Post,
} from '@/lib/posts'

export type PostStatus = 'draft' | 'published'

export type SupabasePostRow = {
  id: string
  title: string
  slug: string
  content: string
  cover_image: string | null
  category: string
  author_id: string | null
  status: string
  created_at: string
  updated_at: string
}

type StoredPostContent = Pick<
  Post,
  'excerpt' | 'date' | 'publishedAt' | 'readingTime' | 'sections'
>

const postSelect =
  'id,title,slug,content,cover_image,category,author_id,status,created_at,updated_at'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isArticleSection(value: unknown): value is ArticleSection {
  if (
    !isRecord(value) ||
    typeof value.heading !== 'string' ||
    !Array.isArray(value.paragraphs) ||
    !value.paragraphs.every((paragraph) => typeof paragraph === 'string')
  ) {
    return false
  }

  if (
    value.list !== undefined &&
    (!Array.isArray(value.list) || !value.list.every((item) => typeof item === 'string'))
  ) {
    return false
  }

  return value.quote === undefined || typeof value.quote === 'string'
}

function parsePostContent(content: string | null): StoredPostContent | null {
  if (!content) {
    return null
  }

  try {
    const value: unknown = JSON.parse(content)

    if (
      !isRecord(value) ||
      !Array.isArray(value.sections) ||
      !value.sections.every(isArticleSection) ||
      typeof value.excerpt !== 'string' ||
      typeof value.date !== 'string' ||
      typeof value.publishedAt !== 'string' ||
      typeof value.readingTime !== 'string'
    ) {
      return null
    }

    return {
      excerpt: value.excerpt,
      date: value.date,
      publishedAt: value.publishedAt,
      readingTime: value.readingTime,
      sections: value.sections,
    }
  } catch {
    return null
  }
}

function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value)
}

export function serializePostContent(post: Post): string {
  return JSON.stringify({
    excerpt: post.excerpt,
    date: post.date,
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    sections: post.sections,
  })
}

export function mapSupabasePostToPost(row: SupabasePostRow): Post | null {
  const content = parsePostContent(row.content)

  if (!content || !isCategory(row.category)) {
    return null
  }

  return {
    slug: row.slug,
    title: row.title,
    excerpt: content.excerpt,
    date: content.date,
    publishedAt: content.publishedAt,
    category: row.category,
    image: row.cover_image || '/placeholder.svg',
    readingTime: content.readingTime,
    sections: content.sections,
  }
}

async function fetchPublishedPostsFromSupabase() {
  const { data, error } = await supabase
    .from('posts')
    .select(postSelect)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return error ? null : data
}

export type OwnedPost = {
  id: string
  slug: string
  title: string
  category: Category
  body: string
  cover_image: string | null
  status: PostStatus
  author_id: string
  updated_at: string
}

function contentToBody(content: string | null): string {
  const storedContent = parsePostContent(content)
  if (!storedContent) return ''

  return storedContent.sections
    .map((section) => {
      const lines = section.heading === 'Article Body' ? [] : [section.heading]
      return [
        ...lines,
        ...section.paragraphs,
        ...(section.list || []).map((item) => `- ${item}`),
        ...(section.quote ? [`> ${section.quote}`] : []),
      ].join('\n')
    })
    .filter(Boolean)
    .join('\n\n')
}

export async function getOwnedPostBySlug(
  slug: string,
  authorId: string,
): Promise<OwnedPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(postSelect)
    .eq('slug', slug)
    .eq('author_id', authorId)
    .maybeSingle()

  if (error || !data || (data.status !== 'draft' && data.status !== 'published')) {
    return null
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    category: data.category as Category,
    body: contentToBody(data.content),
    cover_image: data.cover_image,
    status: data.status,
    author_id: data.author_id,
    updated_at: data.updated_at,
  }
}

export async function getOwnedPosts(authorId: string): Promise<OwnedPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(postSelect)
    .eq('author_id', authorId)
    .in('status', ['draft', 'published'])
    .order('updated_at', { ascending: false })

  if (error) return []

  return (data || [])
    .filter((row) => row.status === 'draft' || row.status === 'published')
    .map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      category: row.category as Category,
      body: contentToBody(row.content),
      cover_image: row.cover_image,
      status: row.status,
      author_id: row.author_id,
      updated_at: row.updated_at,
    }))
}

export async function deleteOwnedPost(
  id: string,
  authorId: string,
): Promise<{ error: string | null; deletedId: string | null }> {
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .eq('author_id', authorId)
    .select('id')

  if (error) {
    return { error: error.message, deletedId: null }
  }

  const deletedId = data?.length === 1 && data[0].id === id ? id : null

  return {
    error: deletedId ? null : 'The post could not be deleted because no matching owned row was found.',
    deletedId,
  }
}

export async function getPublishedPosts(): Promise<Post[]> {
  const rows = await fetchPublishedPostsFromSupabase()

  if (!rows) {
    return POSTS
  }

  const databasePosts = rows
    .map((row) => mapSupabasePostToPost(row))
    .filter((post): post is Post => post !== null)

  const databaseSlugs = new Set(databasePosts.map((post) => post.slug))
  const fallbackPosts = POSTS.filter((post) => !databaseSlugs.has(post.slug))

  return [...databasePosts, ...fallbackPosts]
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(postSelect)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  if (!error && data) {
    return mapSupabasePostToPost(data) ?? getPostBySlug(slug) ?? null
  }

  return getPostBySlug(slug) ?? null
}
