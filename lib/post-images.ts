import { supabaseServer } from '@/lib/supabase-server'
import type { Post } from '@/lib/posts'

export async function getPublicPostImageUrl(image: string | null): Promise<string> {
  if (!image) {
    return '/placeholder.svg'
  }

  if (image.startsWith('/') || image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }

  if (!supabaseServer) {
    return '/placeholder.svg'
  }

  const { data, error } = await supabaseServer
    .storage
    .from('blog-images')
    .createSignedUrl(image, 60 * 60)

  return error || !data ? '/placeholder.svg' : data.signedUrl
}

export async function withPublicPostImages(posts: Post[]): Promise<Post[]> {
  return Promise.all(
    posts.map(async (post) => ({
      ...post,
      image: await getPublicPostImageUrl(post.image),
    })),
  )
}
