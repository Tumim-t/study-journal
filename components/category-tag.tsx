import { categoryColor, type Category } from '@/lib/posts'
import { cn } from '@/lib/utils'

export function CategoryTag({
  category,
  className,
}: {
  category: Category
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide',
        categoryColor[category],
        className,
      )}
    >
      {category}
    </span>
  )
}
