import { PageShell } from '@/components/page-shell'
import { HomeHero } from '@/components/home-hero'
import { PostCard } from '@/components/post-card'
import { CATEGORIES } from '@/lib/posts'
import { getPublishedPosts } from '@/lib/posts-supabase'
import { withPublicPostImages } from '@/lib/post-images'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const posts = await withPublicPostImages(await getPublishedPosts())

  return (
    <PageShell>
      <HomeHero />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
              Recent posts
            </h2>
            <p className="mt-2 text-muted-foreground">
              Fresh reflections from the desk, the library, and everywhere in between.
            </p>
          </div>
        </div>

        {/* Category filter row */}
        <div className="mb-10 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            All
          </span>
          {CATEGORIES.map((category) => (
            <span
              key={category}
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} priority={i < 3} />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
