"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  CheckCircle2,
  ChevronRight,
  Activity,
  ArrowUpRight,
  Flame,
  Key,
  ShieldCheck,
  Lock,
  Layers,
  X,
  Sparkles,
  Check,
  Smartphone,
} from "lucide-react";

import Navbar from "@/components/Navbar";

export default function HowItWorksPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060907] text-white flex flex-col font-sans relative selection:bg-[#8a9a5b] selection:text-white pt-24 sm:pt-28">
      
      {/* Background Ambient Spotlights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#8a9a5b]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#54662d]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* CENTRALIZED NAVBAR */}
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />

      {/* HERO HEADER */}
      <section className="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full badge-pitch-olive text-xs font-mono font-bold tracking-widest uppercase mb-6">
          <Flame className="w-3.5 h-3.5 text-[#a5b67d]" />
          <span>HOW IT WORKS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.15]">
          <span className="hero-title-white block">How Larp Wallet Works</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-normal">
          Three simple steps to unlock your 1:1 fake crypto portfolio simulator, customize token balances, and trigger live deposit push alerts.
        </p>

      </section>

      {/* VERTICAL TIMELINE STEPPER SECTION (1 -> 2 -> 3) MATCHING REFERENCE IMAGE LAYOUT */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="relative border-l-2 border-gradient-to-b border-[#8a9a5b]/40 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-14">
          
          {/* STEP 1 */}
          <div className="relative group">
            {/* Number Circle Badge 1 */}
            <div className="absolute -left-[57px] sm:-left-[73px] top-0 w-12 h-12 rounded-full border-2 border-[#8a9a5b] bg-[#0c120d] text-[#c2d6a3] font-bold text-lg flex items-center justify-center shadow-[0_0_20px_rgba(138,154,91,0.4)] group-hover:scale-110 group-hover:bg-[#8a9a5b] group-hover:text-white transition-all">
              1
            </div>

            <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#8a9a5b]/50 transition-all space-y-3">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Purchase a License
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                Grab Larp Wallet in the "Buy" page. Choose the plan that works for you, no hidden fees.
              </p>
              <div className="pt-2 flex items-center space-x-2 text-xs text-[#a5b67d] font-mono font-semibold">
                <Check className="w-4 h-4 text-[#8a9a5b]" />
                <span>One-Time Payment • Instant Access</span>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="relative group">
            {/* Number Circle Badge 2 */}
            <div className="absolute -left-[57px] sm:-left-[73px] top-0 w-12 h-12 rounded-full border-2 border-[#8a9a5b] bg-[#0c120d] text-[#c2d6a3] font-bold text-lg flex items-center justify-center shadow-[0_0_20px_rgba(138,154,91,0.4)] group-hover:scale-110 group-hover:bg-[#8a9a5b] group-hover:text-white transition-all">
              2
            </div>

            <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#8a9a5b]/50 transition-all space-y-3">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Receive Your Key
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                After payment, you'll receive a unique license key via Telegram or email. Keep it safe.
              </p>
              <div className="pt-2 flex items-center space-x-2 text-xs text-[#a5b67d] font-mono font-semibold">
                <Key className="w-4 h-4 text-[#8a9a5b]" />
                <span>Unique Cryptographic License Token</span>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="relative group">
            {/* Number Circle Badge 3 */}
            <div className="absolute -left-[57px] sm:-left-[73px] top-0 w-12 h-12 rounded-full border-2 border-[#8a9a5b] bg-[#0c120d] text-[#c2d6a3] font-bold text-lg flex items-center justify-center shadow-[0_0_20px_rgba(138,154,91,0.4)] group-hover:scale-110 group-hover:bg-[#8a9a5b] group-hover:text-white transition-all">
              3
            </div>

            <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#8a9a5b]/50 transition-all space-y-3">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Activate & Flex
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                Enter your license key, download the app, and start customizing your dream portfolio. Time to larp.
              </p>
              <div className="pt-2 flex items-center space-x-2 text-xs text-[#a5b67d] font-mono font-semibold">
                <Sparkles className="w-4 h-4 text-[#8a9a5b]" />
                <span>1:1 Signature Interface • Unlimited Custom Balances</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BOTTOM CALL TO ACTION BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="rounded-3xl glass-card-dark border border-[#8a9a5b]/40 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-[0_0_40px_rgba(138,154,91,0.2)]">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#8a9a5b]/15 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to Take Authority Over Your Portfolio?
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Experience uncompromised elegance and pixel-perfect wallet simulation across all your mobile devices.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="py-4 px-8 rounded-full btn-hero-primary font-bold text-sm tracking-wide cursor-pointer flex items-center space-x-2"
            >
              <span>Get Larp Wallet</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 glass-card-dark py-10 text-xs text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 flex items-center justify-center text-[#c2d6a3]">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base">LARP WALLET</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-gray-400 font-semibold">
            <Link href="/" className="hover:text-[#c2d6a3] transition-colors">Home</Link>
            <Link href="/features" className="hover:text-[#c2d6a3] transition-colors">Features</Link>
            <Link href="/how-it-works" className="text-[#c2d6a3] font-bold">How It Works</Link>
            <Link href="/#reviews" className="hover:text-[#c2d6a3] transition-colors">Reviews</Link>
          </div>

          <div className="text-gray-500 font-mono text-[11px]">
            © {new Date().getFullYear()} Larp Wallet. Built 100% for fun and pranks.
          </div>
        </div>
      </footer>

      {/* LOGIN & AUTHENTICATION MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl glass-card-dark p-6 sm:p-8 border border-[#8a9a5b]/40 shadow-2xl space-y-6">
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 text-[#c2d6a3]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Access Larp Wallet</h3>
                <p className="text-xs text-gray-400">Enter access key to unlock features</p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsLoginOpen(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Access Key / Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="LRP-9814-XXXX-XXXX"
                  className="w-full px-4 py-3 rounded-xl bg-[#121814] border border-white/10 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#8a9a5b]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Password / PIN
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[#121814] border border-white/10 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#8a9a5b]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl btn-hero-primary font-bold text-sm tracking-wide cursor-pointer"
              >
                Launch Larp Wallet
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
