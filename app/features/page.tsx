"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Wallet,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
  Layers,
  TrendingUp,
  X,
  Bell,
  Send,
  Smartphone,
  Coins,
  CheckCircle2,
  ChevronRight,
  Activity,
  ArrowUpRight,
  Sliders,
  BellRing,
  Globe,
  Flame,
  Camera,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import LoginModal from "@/components/LoginModal";
import { loginUser } from "@/lib/auth";

export default function FeaturesPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const router = useRouter();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser("demo@larpzwallet.app");
    setIsLoginOpen(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#08061a] text-white flex flex-col font-sans relative selection:bg-[#7c5ce8] selection:text-white pt-14">
      
      {/* Background Ambient Spotlights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#8a9a5b]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#54662d]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* CENTRALIZED NAVBAR */}
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />

      {/* HERO HEADER */}
      <section className="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full badge-pitch-olive text-xs font-bold tracking-wide mb-6">
          <Flame className="w-3.5 h-3.5 text-[#a5b67d]" />
          <span>FEATURES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.15]">
          <span className="hero-title-white block">Everything you need to</span>
          <span className="hero-olive-text block mt-2">flex responsibly with a fake wallet.</span>
        </h1>

      </section>

      {/* CLEAN SIMPLE 6-CARD FEATURES GRID */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          
          {/* FEATURE CARD 1: Custom Balances */}
          <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#8a9a5b]/50 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 flex items-center justify-center text-[#c2d6a3] group-hover:scale-110 transition-transform">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Custom Balances</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Set any balance for any token. Show off millions or keep it subtle — it's your call.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center space-x-2 text-[11px] text-[#c2d6a3] font-mono font-semibold">
              <span>● Custom Token Overrides</span>
            </div>
          </div>

          {/* FEATURE CARD 2: Pixel-Perfect UI */}
          <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#8a9a5b]/50 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 flex items-center justify-center text-[#c2d6a3] group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Pixel-Perfect UI</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Designed to look identical to popular wallets. Perfect for screenshots, videos, or flexing on your group chat.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center space-x-2 text-[11px] text-[#c2d6a3] font-mono font-semibold">
              <span>● Sub-Pixel Accuracy</span>
            </div>
          </div>

          {/* FEATURE CARD 3: No Data Collected */}
          <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#8a9a5b]/50 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 flex items-center justify-center text-[#c2d6a3] group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">No Data Collected</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                We don't ask for seed phrases, private keys, or personal information. Completely safe to use.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center space-x-2 text-[11px] text-emerald-400 font-mono font-semibold">
              <span>✓ 100% Risk-Free & Private</span>
            </div>
          </div>

          {/* FEATURE CARD 4: Send Between Users */}
          <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#8a9a5b]/50 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 flex items-center justify-center text-[#c2d6a3] group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Send Between Users</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Send crypto to other Larp Wallet users and have it appear live in their wallet — instantly.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center space-x-2 text-[11px] text-[#c2d6a3] font-mono font-semibold">
              <span>● Live Peer Transfers</span>
            </div>
          </div>

          {/* FEATURE CARD 5: Custom Receive Alerts */}
          <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#8a9a5b]/50 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 flex items-center justify-center text-[#c2d6a3] group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Custom Receive Alerts</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Trigger real push notifications that show you receiving crypto — on cue, from any device.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center space-x-2 text-[11px] text-[#c2d6a3] font-mono font-semibold">
              <span>● On-Cue Notifications</span>
            </div>
          </div>

          {/* FEATURE CARD 6: iOS & Android */}
          <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#8a9a5b]/50 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 flex items-center justify-center text-[#c2d6a3] group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">iOS & Android</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Installs as a PWA on any modern smartphone. No app store required.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center space-x-2 text-[11px] text-gray-400 font-mono">
              <span>● Web PWA App</span>
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
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-[#7c5ce8]/50 shadow-[0_0_12px_rgba(124,92,232,0.4)] group-hover:shadow-[0_0_20px_rgba(124,92,232,0.7)] transition-all">
              <img
                src="/img.jpeg"
                alt="Larp Wallet Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-white text-base group-hover:text-[#c4b5fd] transition-colors">LARP WALLET</span>
          </Link>

          <div className="flex flex-wrap justify-center gap-6 text-gray-400 font-semibold">
            <Link href="/" className="hover:text-[#a78bfa] transition-colors">Home</Link>
            <Link href="/features" className="text-[#a78bfa] font-bold">Features</Link>
            <Link href="/how-it-works" className="hover:text-[#a78bfa] transition-colors">How It Works</Link>
            <Link href="/pricing" className="hover:text-[#a78bfa] transition-colors">Pricing</Link>
            <Link href="/reviews" className="hover:text-[#a78bfa] transition-colors">Reviews</Link>
          </div>

          <div className="text-gray-500 font-mono text-[11px]">
            © {new Date().getFullYear()} Larp Wallet. Built 100% for fun and pranks.
          </div>
        </div>
      </footer>

      {/* LOGIN & AUTHENTICATION MODAL */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

    </div>
  );
}
