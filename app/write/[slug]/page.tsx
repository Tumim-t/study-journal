import { PageShell } from '@/components/page-shell'
import { PostEditor } from '@/components/post-editor'

type EditPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params

  return (
    <PageShell>
      <PostEditor postSlug={slug} />
    </PageShell>
  )
}
