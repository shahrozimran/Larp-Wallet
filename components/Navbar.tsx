"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet, ChevronRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenLogin: () => void;
}

export default function Navbar({ onOpenLogin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Features",     href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing",      href: "/pricing"  },
    { label: "Reviews",      href: "/reviews"  },
  ];

  return (
    <>
      {/* ── FLAT TOP NAVBAR (reference style) ── */}
      <header className="fixed top-0 left-0 right-0 z-50 nav-flat-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

          {/* Brand Logo — left */}
          <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
            {/* Purple mascot logo image */}
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-[#7c5ce8]/50 shadow-[0_0_16px_rgba(124,92,232,0.5)] group-hover:shadow-[0_0_24px_rgba(124,92,232,0.8)] transition-all">
              <img
                src="/img.jpeg"
                alt="Larp Wallet Logo"
                className="w-full h-full object-cover"
              />
              {/* tiny live dot */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#7c5ce8] rounded-full border-2 border-[#08061a] animate-pulse" />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-white group-hover:text-[#c4b5fd] transition-colors">
              Larp <span className="text-[#a78bfa]">Wallet</span>
            </span>
          </Link>

          {/* Desktop Nav Links — right-of-center */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link-item ${
                    isActive
                      ? "text-white bg-[#7c5ce8]/15 !text-white"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Login CTA + Mobile Toggle */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenLogin}
              className="px-5 py-1.5 rounded-full btn-nav-login text-xs font-bold tracking-wide flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Login</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#7c5ce8]/15 bg-[#08061a]/98 backdrop-blur-xl">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col space-y-1">
              {/* Home link for mobile */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  pathname === "/"
                    ? "bg-[#7c5ce8]/15 text-[#a78bfa] border border-[#7c5ce8]/25"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>Home</span>
                {pathname === "/" && <span className="w-2 h-2 rounded-full bg-[#7c5ce8]" />}
              </Link>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-[#7c5ce8]/15 text-[#a78bfa] border border-[#7c5ce8]/25"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#7c5ce8]" />}
                  </Link>
                );
              })}
              <div className="pt-2 pb-1">
                <button
                  onClick={() => { onOpenLogin(); setMobileMenuOpen(false); }}
                  className="w-full py-3 rounded-xl btn-nav-login text-sm font-bold cursor-pointer"
                >
                  Login
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
