"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { useSession } from "next-auth/react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const session = useSession()
  const isLoggedIn = !!session.data?.accessToken
 

  const isActive = (href: string) => pathname === href

  return (
    <header className="bg-secondary/95 border-b border-primary/20 text-white backdrop-blur sticky">
      <div className="container mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/lhasis-logo.png" alt="Security lock and chain" width={32} height={32} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm hover:text-primary transition-colors ${isActive(href) ? "text-primary" : "text-white"
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-secondary text-white w-64">
              <div className="flex items-center justify-between mb-4">
                <Image src="/assets/lhasis-logo.png" alt="Logo" width={32} height={32} />
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6 text-white" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-4">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`text-sm hover:text-primary transition-colors ${isActive(href) ? "text-primary" : "text-white"
                      }`}
                  >
                    {label}
                  </Link>
                ))}

                {/* Mobile Auth Button */}
                {isLoggedIn ? (
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="mt-4">
                    <Button className="bg-primary hover:bg-primary/85 text-primary-foreground font-medium text-sm w-full">Dashboard</Button>
                  </Link>
                ) : (
                  <Link href="/login" onClick={() => setOpen(false)} className="mt-4">
                    <Button className="bg-primary hover:bg-primary/85 text-primary-foreground font-medium text-sm w-full">Login</Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Auth Button */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button className="bg-primary hover:bg-primary/85 text-primary-foreground font-medium text-sm">Dashboard</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary/85 text-primary-foreground font-medium text-sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
