"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-white border-b">
      {/* Top bar */}
      <div className="hidden lg:block border-b">
        <div className="container-custom py-2 flex justify-between items-center">
          <div className="flex gap-4">
            <Link href="/health-checkup-and-insurances" className="text-sm font-medium text-gray-600 hover:text-secondary transition-colors">
              Health Checkup & Insurance
            </Link>
            <Link href="/domiciliary-services" className="text-sm font-medium text-gray-600 hover:text-secondary transition-colors">
              Domiciliary Services
            </Link>
            <Link href="/diagnostic-home-services" className="text-sm font-medium text-gray-600 hover:text-secondary transition-colors">
              Diagnostic Home Services
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="https://sasthyaseba.app" className="text-sm font-medium text-gray-600 hover:text-secondary transition-colors">
              Get the app
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-secondary transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container-custom py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-32">
              {/* Replace with actual logo or use a placeholder */}
              <Image
                src="https://ext.same-assets.com/174619264/3871148761.webp"
                alt="Sasthya Seba"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/search?type=doctor" className="text-primary hover:text-secondary font-medium">
              Find Doctor
            </Link>
            <Link href="/search?type=hospital" className="text-primary hover:text-secondary font-medium">
              Find Hospital
            </Link>
            <Link href="/ambulance" className="text-primary hover:text-secondary font-medium">
              Find Ambulance
            </Link>
          </div>

          {/* Search (shown on desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search doctors, hospitals, services..."
                className="w-64 pr-8"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Link href="/login">
              <Button variant="outline" className="border-secondary text-primary hover:text-secondary">
                Login/Register
              </Button>
            </Link>
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
              href="/search?type=doctor"
              className="text-primary hover:text-secondary py-2 border-b"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Find Doctor
            </Link>
            <Link
              href="/search?type=hospital"
              className="text-primary hover:text-secondary py-2 border-b"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Find Hospital
            </Link>
            <Link
              href="/ambulance"
              className="text-primary hover:text-secondary py-2 border-b"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Find Ambulance
            </Link>
            <Link
              href="/login"
              className="text-primary hover:text-secondary py-2 border-b"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login/Register
            </Link>
            <div className="pt-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search doctors, hospitals, services..."
                  className="w-full pr-8"
                />
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            {/* Secondary links */}
            <div className="pt-4 flex flex-col space-y-2">
              <Link
                href="/health-checkup-and-insurances"
                className="text-sm text-gray-600 hover:text-secondary py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Health Checkup & Insurance
              </Link>
              <Link
                href="/domiciliary-services"
                className="text-sm text-gray-600 hover:text-secondary py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Domiciliary Services
              </Link>
              <Link
                href="/diagnostic-home-services"
                className="text-sm text-gray-600 hover:text-secondary py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Diagnostic Home Services
              </Link>
              <Link
                href="https://sasthyaseba.app"
                className="text-sm text-gray-600 hover:text-secondary py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get the app
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-600 hover:text-secondary py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
