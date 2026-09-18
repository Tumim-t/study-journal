import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const text = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size]
  const icon = {
    sm: 'size-5',
    md: 'size-6',
    lg: 'size-7',
  }[size]

  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2 font-heading font-semibold text-foreground', className)}
    >
      <BookOpen className={cn(icon, 'text-primary')} strokeWidth={1.75} />
      <span className={cn('tracking-tight', text)}>Study Journal</span>
    </Link>
  )
}
