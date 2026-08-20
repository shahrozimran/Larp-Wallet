"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet, ChevronRight, Layers } from "lucide-react";

interface NavbarProps {
  onOpenLogin: () => void;
}

export default function Navbar({ onOpenLogin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Reviews", href: "/reviews" },
  ];

  return (
    <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] max-w-6xl px-3 sm:px-6 py-2 sm:py-2.5 nav-floating-capsule flex items-center justify-between">
      
      {/* Brand Logo */}
      <Link href="/" className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group shrink-0">
        <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#8a9a5b] to-[#3a4722] p-[1.5px] shadow-[0_0_18px_rgba(138,154,91,0.35)] group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#0a0f0b] rounded-full flex items-center justify-center">
            <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c2d6a3]" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#8a9a5b] rounded-full ring-2 ring-[#060907] animate-pulse" />
        </div>
        <div>
          <div className="flex items-center space-x-1 sm:space-x-1.5">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
              LARP
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-[#a5b67d]">WALLET</span>
          </div>
          <div className="flex items-center space-x-1 text-[8px] sm:text-[9px] font-mono text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="truncate">SIMULATOR LIVE</span>
          </div>
        </div>
      </Link>

      {/* Center Nav Links (Capsule Menu - Exact 5 Sequence) */}
      <nav className="hidden md:flex items-center space-x-1 bg-white/5 p-1 rounded-full border border-white/5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link-item ${
                isActive
                  ? "bg-[#8a9a5b]/20 text-white border border-[#8a9a5b]/40"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right Section: Login Action */}
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        <button
          onClick={onOpenLogin}
          className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full btn-nav-login text-xs font-bold tracking-wide flex items-center space-x-1.5 cursor-pointer"
        >
          <span>Login</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-full bg-white/5 text-gray-300 hover:text-white transition-colors"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 p-4 rounded-3xl glass-card-dark border border-[#8a9a5b]/30 shadow-2xl flex flex-col space-y-2 md:hidden max-h-[75vh] overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  isActive
                    ? "bg-[#8a9a5b]/20 text-[#c2d6a3] border border-[#8a9a5b]/40"
                    : "hover:bg-white/10 text-white"
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#8a9a5b]" />}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
