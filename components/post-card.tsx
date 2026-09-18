import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { CategoryTag } from '@/components/category-tag'

export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_30px_-18px_rgba(60,55,40,0.4)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={post.image || '/placeholder.svg'}
          alt={post.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-wide text-muted-foreground">
          <span>{post.date}</span>
          <span className="text-border">•</span>
          <CategoryTag category={post.category} />
        </div>

        <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        <p className="text-[15px] leading-relaxed text-muted-foreground">{post.excerpt}</p>

        <span className="mt-auto pt-1 text-sm text-muted-foreground/80">{post.readingTime}</span>
      </div>
    </Link>
  )
}
