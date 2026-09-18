'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PenLine, Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative text-[15px] text-muted-foreground transition-colors hover:text-foreground',
                isActive(item.href) && 'text-foreground',
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-primary" />
              )}
            </Link>
          ))}
          <Link
            href="/write"
            className={cn(
              'inline-flex items-center gap-1.5 text-[15px] text-muted-foreground transition-colors hover:text-foreground',
              isActive('/write') && 'text-foreground',
            )}
          >
            <PenLine className="size-4" />
            Write a Post
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2 text-[15px] font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            Log In
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border/70 bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-lg px-3 py-2.5 text-[15px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                  isActive(item.href) && 'bg-muted text-foreground',
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/write"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[15px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <PenLine className="size-4" />
              Write a Post
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2.5 text-[15px] font-medium text-foreground"
            >
              Log In
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
