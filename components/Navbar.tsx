"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Wallet, Menu, X, LogOut, Sparkles, User, Key } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  onOpenLogin: () => void;
}

export default function Navbar({ onOpenLogin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, isLoggedIn, isLicenseActive, signOut } = useAuth();

  const handleDashboardClick = () => {
    if (!isLoggedIn) {
      onOpenLogin();
    } else if (!isLicenseActive) {
      router.push("/plans");
    } else {
      router.push("/dashboard");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const navItems = [
    { label: "Features",     href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing",      href: "/pricing"  },
    { label: "Reviews",      href: "/reviews"  },
  ];

  return (
    <>
      {/* ── FLAT TOP NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 nav-flat-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

          {/* Brand Logo — left */}
          <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-[#7c5ce8]/50 shadow-[0_0_16px_rgba(124,92,232,0.5)] group-hover:shadow-[0_0_24px_rgba(124,92,232,0.8)] transition-all">
              <img
                src="/img.jpeg"
                alt="Larp Wallet Logo"
                className="w-full h-full object-cover"
              />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#7c5ce8] rounded-full border-2 border-[#08061a] animate-pulse" />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-white group-hover:text-[#c4b5fd] transition-colors">
              Larp <span className="text-[#a78bfa]">Wallet</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
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

          {/* Right: Login / Dashboard / User Actions */}
          <div className="flex items-center space-x-2.5 shrink-0">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                {isLicenseActive ? (
                  <button
                    onClick={handleDashboardClick}
                    className="px-4 py-1.5 rounded-full btn-hero-primary text-xs font-bold tracking-wide flex items-center space-x-1.5 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </button>
                ) : (
                  <Link
                    href="/plans"
                    className="px-4 py-1.5 rounded-full bg-[#7c5ce8]/20 border border-[#7c5ce8]/50 text-[#c4b5fd] hover:bg-[#7c5ce8]/30 text-xs font-bold tracking-wide flex items-center space-x-1.5 transition-all"
                  >
                    <Key className="w-3.5 h-3.5 text-[#a78bfa]" />
                    <span>Unlock Plans</span>
                  </Link>
                )}

                {/* User email & Sign Out */}
                <div className="hidden sm:flex items-center space-x-1.5 pl-2 border-l border-white/10">
                  <span className="text-xs text-gray-400 font-mono max-w-[130px] truncate" title={user?.email || ""}>
                    {user?.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    title="Sign Out"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenLogin}
                  className="px-4 py-1.5 rounded-full btn-nav-login text-xs font-bold tracking-wide flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Sign In</span>
                </button>
                <Link
                  href="/signup"
                  className="hidden sm:inline-flex px-4 py-1.5 rounded-full btn-hero-primary text-xs font-bold tracking-wide items-center space-x-1.5 cursor-pointer"
                >
                  <span>Sign Up</span>
                </Link>
              </div>
            )}

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
          <div className="md:hidden border-t border-[#7c5ce8]/15 bg-[#08061a]/98 backdrop-blur-xl animate-fadeIn">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col space-y-1">
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

              <div className="pt-3 pb-1 space-y-2 border-t border-white/8 mt-2">
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-1 text-xs text-gray-400 font-mono truncate">
                      Signed in as {user?.email}
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleDashboardClick();
                      }}
                      className="w-full py-3 rounded-xl btn-hero-primary text-sm font-bold cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <span>{isLicenseActive ? "Launch Dashboard" : "View Plans & Activate"}</span>
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleSignOut();
                      }}
                      className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full py-3 rounded-xl btn-hero-primary text-sm font-bold cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <span>Sign In / Register</span>
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
