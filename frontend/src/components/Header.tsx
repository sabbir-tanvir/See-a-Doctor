"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, X, LogOut, User, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isDoctor } = useAuth();
  const [headerSearchQuery, setHeaderSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(headerSearchQuery.trim())}`);
    }
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
  };

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      {/* Top bar */}


      {/* Main navigation */}
      <div className="container-custom py-3">
        <div className="flex justify-between  items-center">
          {/* Logo */}
          <Link href="/" className="flex rounded-sm items-center">
            <div className="relative rounded-full h-10 w-10">
              {/* Replace with actual logo or use a placeholder */}
              <Image
                src="https://ext.same-assets.com/174619264/3871148761.webp"
                alt="Sasthya Seba"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/find-doctor" className="text-primary hover:text-secondary font-medium">
              Find Doctor
            </Link>
            <Link href="/find-hospital" className="text-primary hover:text-secondary font-medium">
              Find Hospital
            </Link>

          </div>

          {/* Search and Account (shown on desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* <form onSubmit={handleHeaderSearch} className="relative">
              <Input
                type="text"
                placeholder="Search doctors, hospitals, services..."
                className="w-64 pr-8"
                value={headerSearchQuery}
                onChange={(e) => setHeaderSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form> */}
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-10 w-10 rounded-full">
                    <Avatar>
                      {user.photo ? (
                        <AvatarImage src={user.photo} alt={user.name || 'User'} />
                      ) : (
                        <AvatarImage src="/api/default-avatar" alt={user.name || 'User'} />
                      )}
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.name || user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  {isDoctor && (
                    <>
                      <Link href="/doctor/dashboard">
                        <DropdownMenuItem>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Doctor Dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/doctor/appointments">
                        <DropdownMenuItem>
                          <div className="mr-2 h-4 w-4 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
                          </div>
                          <span>My Appointments</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/doctor/availability">
                        <DropdownMenuItem>
                          <div className="mr-2 h-4 w-4 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.5"></path><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path><path d="M17 14h-6"></path><path d="M13 18h-2"></path><path d="M19 10v12"></path><path d="M15 14v1"></path></svg>
                          </div>
                          <span>Manage Availability</span>
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="border-secondary text-primary hover:text-secondary">
                  Login/Sign up
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-primary"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link
              href="/find-doctor"
              className="text-primary hover:text-secondary py-2 border-b"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Find Doctor
            </Link>
            <Link
              href="/find-hospital"
              className="text-primary hover:text-secondary py-2 border-b"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Find Hospital
            </Link>

            
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-primary hover:text-secondary py-2 border-b"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                {isDoctor && (
                  <>
                    <Link
                      href="/doctor/dashboard"
                      className="text-primary hover:text-secondary py-2 border-b"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Doctor Dashboard
                    </Link>
                    <Link
                      href="/doctor/appointments"
                      className="text-primary hover:text-secondary py-2 border-b"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Appointments
                    </Link>
                    <Link
                      href="/doctor/availability"
                      className="text-primary hover:text-secondary py-2 border-b"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Manage Availability
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-primary hover:text-secondary py-2 border-b"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-primary hover:text-secondary py-2 border-b"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login/Sign up
              </Link>
            )}
            
            {/* <div className="pt-2">
              <form onSubmit={handleMobileSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search doctors, hospitals, services..."
                  className="w-full pr-8"
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div> */}
            {/* Secondary links */}

          </div>
        </div>
      )}
    </header>
  );
}
