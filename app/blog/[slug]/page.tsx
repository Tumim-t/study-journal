import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPost } from '@/components/blog-post'
import { getPublishedPostBySlug } from '@/lib/posts-supabase'
import { getPublicPostImageUrl } from '@/lib/post-images'

export const dynamic = 'force-dynamic'

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found — Study Journal',
    }
  }

  return {
    title: `${post.title} — Study Journal`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const publicPost = {
    ...post,
    image: await getPublicPostImageUrl(post.image),
  }

  return <BlogPost post={publicPost} />
}
