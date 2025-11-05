"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/subsidiaries", label: "Subsidiaries" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-[#0D0D0D]/95 border-b border-[#D4AF37]/20">
      <div className="container mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link 
          href="/" 
          className="flex items-center hover:opacity-80 transition"
          data-nav="home"
        >
          <Image 
            src="/logo.png" 
            alt="Acker Group" 
            width={1920} 
            height={1080}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-8 text-sm">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className={`transition font-medium uppercase tracking-wide ${isActive ? 'text-[#D4AF37]' : 'text-[#E0E0E0] hover:text-[#D4AF37]'}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
        </nav>

        {/* Mobile: Hamburger */}
        <div className="sm:hidden">
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="relative z-40 flex h-10 w-10 items-center justify-center"
          >
            {/* Two-line hamburger that animates into an X */}
            <span
              className={
                `block absolute h-0.5 w-6 bg-[#E0E0E0] transform transition-all duration-300 ` +
                (open ? 'rotate-45' : '-translate-y-2')
              }
            />
            <span
              className={
                `block absolute h-0.5 w-6 bg-[#E0E0E0] transform transition-all duration-300 ` +
                (open ? '-rotate-45' : 'translate-y-2')
              }
            />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="border-t border-[#D4AF37]/10 bg-[#0D0D0D]/95 px-4 pb-4 pt-3">
          <nav className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`transition font-medium uppercase tracking-wide ${isActive ? 'text-[#D4AF37]' : 'text-[#E0E0E0]'}`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
          </nav>
        </div>
      </div>
    </header>
  )
}
