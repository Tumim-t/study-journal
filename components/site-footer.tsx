import Link from 'next/link'
import { BookOpen, Camera, Pin, PenLine } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <BookOpen className="size-6 text-primary" strokeWidth={1.75} />
          <span className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Study Journal
          </span>
        </div>

        <p className="max-w-sm text-balance text-muted-foreground">
          Simple ideas for studying, growing, and navigating student life.
        </p>

        <nav className="flex items-center gap-4 text-[15px]">
          <Link href="/" className="font-semibold text-foreground hover:text-primary">
            Home
          </Link>
          <span className="text-border">|</span>
          <Link href="/about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <span className="text-border">|</span>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-5 text-muted-foreground">
          <Link href="/" aria-label="Gallery" className="hover:text-foreground">
            <Camera className="size-5" strokeWidth={1.75} />
          </Link>
          <Link href="/" aria-label="Saved posts" className="hover:text-foreground">
            <Pin className="size-5" strokeWidth={1.75} />
          </Link>
          <Link href="/write" aria-label="Write a post" className="hover:text-foreground">
            <PenLine className="size-5" strokeWidth={1.75} />
          </Link>
        </div>

        <p className="text-sm text-muted-foreground/80">© 2026 Study Journal</p>
      </div>
    </footer>
  )
}
