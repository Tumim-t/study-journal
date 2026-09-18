import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPost } from '@/components/blog-post'
import { getPostBySlug, POSTS } from '@/lib/posts'

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

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
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <BlogPost post={post} />
}
