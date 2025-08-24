"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const { itemCount } = useCart()
  const { user, profile, signOut, loading } = useAuth()

  const getInitials = (firstName: string | null, lastName: string | null) => {
    if (!firstName && !lastName) return "U"
    const initials = []
    if (firstName) initials.push(firstName[0])
    if (lastName) initials.push(lastName[0])
    return initials.join("").toUpperCase()
  }

  const getFullName = (firstName: string | null, lastName: string | null) => {
    const parts = []
    if (firstName) parts.push(firstName)
    if (lastName) parts.push(lastName)
    return parts.join(" ") || "User"
  }

  const isActiveLink = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AE</span>
            </div>
            <span className="font-sans font-bold text-xl text-foreground">Awah Electronics</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`transition-colors ${
                isActiveLink("/") 
                  ? "text-primary font-semibold" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`transition-colors ${
                isActiveLink("/products") 
                  ? "text-primary font-semibold" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              Products
            </Link>
            <Link 
              href="/categories" 
              className={`transition-colors ${
                isActiveLink("/categories") 
                  ? "text-primary font-semibold" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              Categories
            </Link>
            <Link 
              href="/deals" 
              className={`transition-colors ${
                isActiveLink("/deals") 
                  ? "text-primary font-semibold" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              Deals
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors ${
                isActiveLink("/about") 
                  ? "text-primary font-semibold" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              About
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search electronics..." 
                className="pl-10 bg-muted border-border" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
                  }
                }}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* User Account */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || ""} alt={getFullName(profile?.first_name ?? null, profile?.last_name ?? null)} />
                      <AvatarFallback>{getInitials(profile?.first_name ?? null, profile?.last_name ?? null)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{getFullName(profile?.first_name ?? null, profile?.last_name ?? null)}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  {profile?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/auth/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}

            {/* Shopping Cart */}
            <CartDrawer>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </CartDrawer>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search electronics..." 
                  className="pl-10 bg-muted border-border" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
                    }
                  }}
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className={`transition-colors py-2 ${
                    isActiveLink("/") 
                      ? "text-primary font-semibold" 
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className={`transition-colors py-2 ${
                    isActiveLink("/products") 
                      ? "text-primary font-semibold" 
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/categories"
                  className={`transition-colors py-2 ${
                    isActiveLink("/categories") 
                      ? "text-primary font-semibold" 
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  href="/deals"
                  className={`transition-colors py-2 ${
                    isActiveLink("/deals") 
                      ? "text-primary font-semibold" 
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Deals
                </Link>
                <Link
                  href="/about"
                  className={`transition-colors py-2 ${
                    isActiveLink("/about") 
                      ? "text-primary font-semibold" 
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>

                {/* Mobile Auth Links */}
                {!user && (
                  <>
                    <Link
                      href="/auth/login"
                      className="text-foreground hover:text-primary transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="text-foreground hover:text-primary transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
