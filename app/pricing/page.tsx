"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Wallet,
  Check,
  X,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Flame,
  ShieldCheck,
  Lock,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import LoginModal from "@/components/LoginModal";
import CryptoPaymentModal, { SelectedPlan } from "@/components/CryptoPaymentModal";
import { getAuthSession, loginUser } from "@/lib/auth";

export default function PricingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [pendingPlan, setPendingPlan] = useState<SelectedPlan | null>(null);
  const router = useRouter();

  const handleBuyClick = (plan: SelectedPlan) => {
    const session = getAuthSession();
    if (!session.isLoggedIn) {
      setIsLoginOpen(true);
    } else {
      router.push("/plans");
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    router.push("/plans");
  };

  return (
    <div className="min-h-screen bg-[#08061a] text-white flex flex-col font-sans relative selection:bg-[#7c5ce8] selection:text-white pt-14">
      
      {/* Background Ambient Spotlights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#7c5ce8]/14 rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#5b3fc4]/06 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#4a2db8]/06 rounded-full blur-[200px] pointer-events-none" />

      {/* NAVBAR */}
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />

      {/* ── HEADER ── */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#7c5ce8]/15 border border-[#7c5ce8]/30 text-xs font-mono font-semibold text-[#a78bfa] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#a78bfa]" />
          <span>PRICING</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.15]">
          <span className="hero-title-white block">Larp Wallet Pricing</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-normal">
          Choose the plan that works best for you. No hidden fees, instant activation.
        </p>

      </section>

      {/* 3 PRICING TIERS GRID MATCHING REFERENCE IMAGE */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* TIER 1: STARTER */}
          <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#7c5ce8]/40 transition-all flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Header Badge */}
              <div className="text-center">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  STARTER
                </span>
                <div className="mt-6 flex items-baseline justify-center space-x-2">
                  <span className="text-gray-500 font-mono text-xl line-through">$30</span>
                  <span className="text-4xl font-extrabold text-white font-mono">$15</span>
                </div>
                <div className="text-xs text-[#a78bfa] font-mono font-bold mt-1">7 days access</div>
              </div>

              {/* Features Checklist */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-gray-200">Full app access on iOS & Android</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-gray-200">All signature wallet views & skins</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-gray-200">Free PDF money guide</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-gray-200">Unlimited custom balances & tokens</span>
                </div>
                <div className="flex items-start space-x-3 opacity-40">
                  <X className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                  <span className="text-gray-400">Priority Telegram support</span>
                </div>
                <div className="flex items-start space-x-3 opacity-40">
                  <X className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                  <span className="text-gray-400">Early access to new features</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleBuyClick({ name: "Starter Plan", price: "$15", duration: "7 days access" })}
              className="w-full py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs tracking-wide flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>Buy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* TIER 2: MOST POPULAR (HIGHLIGHTED CARD) */}
          <div className="p-8 rounded-3xl bg-[#0e0926] border-2 border-[#7c5ce8] shadow-[0_0_40px_rgba(124,92,232,0.35)] flex flex-col justify-between space-y-8 relative md:scale-105 z-10">
            
            {/* Highlighted Ribbon Glow */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7c5ce8] to-[#9b7af5] text-white text-[10px] font-mono font-extrabold uppercase tracking-widest shadow-lg">
              MOST POPULAR
            </div>

            <div className="space-y-6 pt-2">
              {/* Header Badge */}
              <div className="text-center">
                <div className="mt-4 flex items-baseline justify-center space-x-2">
                  <span className="text-gray-500 font-mono text-xl line-through">$100</span>
                  <span className="text-5xl font-extrabold text-white font-mono">$45</span>
                </div>
                <div className="text-xs text-[#a78bfa] font-mono font-bold mt-1">1 month access</div>
              </div>

              {/* Features Checklist */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Full app access on iOS & Android</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">All signature wallet views & skins</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Free PDF money guide</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Unlimited custom balances & tokens</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Priority Telegram support</span>
                </div>
                <div className="flex items-start space-x-3 opacity-40">
                  <X className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                  <span className="text-gray-400">Early access to new features</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleBuyClick({ name: "Pro Creator Plan", price: "$45", duration: "1 month access" })}
              className="w-full py-4 px-4 rounded-xl btn-hero-primary font-bold text-xs tracking-wide flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg"
            >
              <span>Buy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* TIER 3: BEST VALUE */}
          <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#7c5ce8]/40 transition-all flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Header Badge */}
              <div className="text-center">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  BEST VALUE
                </span>
                <div className="mt-6 flex items-baseline justify-center space-x-2">
                  <span className="text-gray-500 font-mono text-xl line-through">$300</span>
                  <span className="text-4xl font-extrabold text-white font-mono">$200</span>
                </div>
                <div className="text-xs text-[#a78bfa] font-mono font-bold mt-1">Lifetime access</div>
              </div>

              {/* Features Checklist */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-gray-200">Full app access on iOS & Android</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-gray-200">All signature wallet views & skins</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-gray-200">Free PDF money guide</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-gray-200">Unlimited custom balances & tokens</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-gray-200">Priority Telegram support</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                  <span className="text-[#c4b5fd] font-semibold">Early access to new features</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleBuyClick({ name: "Lifetime Access Plan", price: "$200", duration: "Lifetime access" })}
              className="w-full py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs tracking-wide flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>Buy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/8 bg-[#05040f]/80 py-10 text-xs text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
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
            <Link href="/features" className="hover:text-[#a78bfa] transition-colors">Features</Link>
            <Link href="/how-it-works" className="hover:text-[#a78bfa] transition-colors">How It Works</Link>
            <Link href="/pricing" className="text-[#a78bfa] font-bold">Pricing</Link>
            <Link href="/reviews" className="hover:text-[#a78bfa] transition-colors">Reviews</Link>
          </div>

          <div className="text-gray-500 font-mono text-[11px]">
            © {new Date().getFullYear()} Larp Wallet. Built 100% for fun and pranks.
          </div>
        </div>
      </footer>

      {/* LOGIN & AUTHENTICATION MODAL */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* CRYPTO PAYMENT CHECKOUT MODAL */}
      <CryptoPaymentModal
        plan={selectedPlan}
        onClose={() => setSelectedPlan(null)}
      />

    </div>
  );
}
