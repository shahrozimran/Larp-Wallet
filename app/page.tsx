"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  Download,
  Check,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  Star,
  Lock,
  Layers,
  TrendingUp,
  X,
  Copy,
  Wifi,
  Battery,
  Signal,
  Eye,
  Send,
  DownloadCloud,
  RefreshCw,
  ChevronRight,
  Activity,
  Flame,
  PieChart,
} from "lucide-react";

import Navbar from "@/components/Navbar";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060907] text-white flex flex-col font-sans relative selection:bg-[#8a9a5b] selection:text-white pt-24 sm:pt-28">
      
      {/* Background Ambient Spotlights matching reference light effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#8a9a5b]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#54662d]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* CENTRALIZED NAVBAR */}
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Release Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full badge-pitch-olive text-xs font-bold tracking-wide mb-8">
          <Flame className="w-3.5 h-3.5 text-[#a5b67d]" />
          <span>Now available on iOS & Android</span>
        </div>

        {/* Dual-Tone Pitching Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]">
          <span className="hero-title-white block">Simulate Success.</span>
          <span className="hero-olive-text block mt-2">Flex The Bag.</span>
        </h1>

        {/* Hero Paragraph Subtitle */}
        <p className="mt-7 text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-normal">
          The <span className="text-white font-semibold">#1 Fake Crypto Portfolio App</span>. Fake your crypto bag with the 1:1 signature Larp Wallet interface. Add custom tokens, watch live prices, and trigger mock notifications. Built 100% for fun and pranks.
        </p>

        {/* Single Primary High-Impact CTA Button */}
        <div className="mt-10 flex items-center justify-center w-full max-w-xs">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="w-full py-4 px-8 rounded-full btn-hero-primary flex items-center justify-center space-x-3 text-base font-bold tracking-wide cursor-pointer"
          >
            <Download className="w-5 h-5 text-white" />
            <span>Get Larp Wallet</span>
          </button>
        </div>

      </section>

      {/* APP SHOWCASE / REALISTIC IPHONE 16 PRO MOCKUP GRID */}
      <section id="showcase" className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#a5b67d] uppercase">
            SIGNATURE LARP INTERFACE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Experience The Full Larp Wallet Ecosystem.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch">
          
          {/* MOCKUP 1: LARP WALLET MAIN VIEW */}
          <div className="iphone-frame-pro p-4 flex flex-col justify-between min-h-[500px] overflow-hidden select-none w-full max-w-[320px] sm:max-w-none mx-auto">
            <div className="iphone-screen-glass absolute inset-0 pointer-events-none" />

            {/* Status Bar */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-300 px-3 pt-1">
              <span>9:41</span>
              
              {/* Dynamic Island Notch */}
              <div className="w-24 h-4 bg-black rounded-full border border-white/10 flex items-center justify-end px-2 space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#8a9a5b]" />
              </div>

              <div className="flex items-center space-x-1.5 text-gray-300">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="space-y-4 pt-4 px-1 z-10">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#8a9a5b]/20 flex items-center justify-center text-[#c2d6a3]">
                    <Wallet className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-white text-xs">Larp Wallet Main</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">USD</span>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">$1,361,148.44</div>
                <div className="text-[11px] text-emerald-400 font-bold mt-0.5 flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+$68,794.12 (+5.3%) 24h</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-bold text-center">
                <div className="py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300">Deposit</div>
                <div className="py-2 rounded-xl bg-[#8a9a5b] text-white shadow-md">Send</div>
                <div className="py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300">Swap</div>
              </div>

              {/* Holdings List */}
              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                      Ξ
                    </div>
                    <div>
                      <div className="font-bold text-white">Ethereum</div>
                      <div className="text-[10px] font-mono text-gray-400">454.02 ETH</div>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-xs">$712,450.21</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center font-bold text-white text-xs">
                      ₿
                    </div>
                    <div>
                      <div className="font-bold text-white">Bitcoin</div>
                      <div className="text-[10px] font-mono text-gray-400">8.92 BTC</div>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-xs">$573,210.00</div>
                </div>
              </div>
            </div>

            {/* Bottom iOS Home Indicator */}
            <div className="pt-6 pb-1 z-10">
              <div className="w-32 h-1 bg-white/30 rounded-full mx-auto" />
            </div>
          </div>

          {/* MOCKUP 2: LARP WALLET PRO HOLDINGS & PNL */}
          <div className="iphone-frame-pro p-4 flex flex-col justify-between min-h-[500px] overflow-hidden select-none w-full max-w-[320px] sm:max-w-none mx-auto">
            <div className="iphone-screen-glass absolute inset-0 pointer-events-none" />

            {/* Status Bar */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-300 px-3 pt-1">
              <span>9:41</span>
              
              {/* Dynamic Island Notch */}
              <div className="w-24 h-4 bg-black rounded-full border border-white/10 flex items-center justify-end px-2 space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#8a9a5b]" />
              </div>

              <div className="flex items-center space-x-1.5 text-gray-300">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="space-y-4 pt-4 px-1 z-10">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8a9a5b]" />
                  <span className="font-bold text-white text-xs">Larp Wallet Pro</span>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#8a9a5b]/20 text-[#c2d6a3]">
                  MULTI-ASSET
                </span>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">$19,847,109.65</div>
                <div className="text-[11px] text-[#c2d6a3] font-bold mt-0.5">+$412,900.00 24h PnL</div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-1.5 pt-1 text-[10px] font-bold text-center">
                <div className="py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300">Transfer</div>
                <div className="py-2 rounded-xl bg-[#8a9a5b] text-white shadow-md">Receive</div>
                <div className="py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300">Buy</div>
                <div className="py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300">Swap</div>
              </div>

              {/* Holdings List */}
              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs">
                      ₮
                    </div>
                    <div>
                      <div className="font-bold text-white">Tether USD</div>
                      <div className="text-[10px] font-mono text-gray-400">12,247,705 USDT</div>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-xs">$12,247,705.00</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center font-bold text-xs">
                      ◎
                    </div>
                    <div>
                      <div className="font-bold text-white">Solana</div>
                      <div className="text-[10px] font-mono text-gray-400">51,080 SOL</div>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-xs">$7,598,400.00</div>
                </div>
              </div>
            </div>

            {/* Bottom iOS Home Indicator */}
            <div className="pt-6 pb-1 z-10">
              <div className="w-32 h-1 bg-white/30 rounded-full mx-auto" />
            </div>
          </div>

          {/* MOCKUP 3: LARP WALLET SAFE DEPOSITS */}
          <div className="iphone-frame-pro p-4 flex flex-col justify-between min-h-[500px] overflow-hidden select-none w-full max-w-[320px] sm:max-w-none mx-auto">
            <div className="iphone-screen-glass absolute inset-0 pointer-events-none" />

            {/* Status Bar */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-300 px-3 pt-1">
              <span>9:41</span>
              
              {/* Dynamic Island Notch */}
              <div className="w-24 h-4 bg-black rounded-full border border-white/10 flex items-center justify-end px-2 space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#8a9a5b]" />
              </div>

              <div className="flex items-center space-x-1.5 text-gray-300">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="space-y-4 pt-4 px-1 z-10">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-1.5">
                  <Lock className="w-4 h-4 text-[#8a9a5b]" />
                  <span className="font-bold text-white text-xs">Larp Wallet Safe</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">$23,917,471.67</div>
                <div className="text-[11px] text-emerald-400 font-bold mt-0.5">+$470,544.52 (+2.01%)</div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-1.5 pt-1 text-[10px] font-bold text-center">
                <div className="py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300">Send</div>
                <div className="py-2 rounded-xl bg-[#8a9a5b] text-white shadow-md">Receive</div>
                <div className="py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300">Swap</div>
                <div className="py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300">Buy</div>
              </div>

              {/* Holdings List */}
              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#8a9a5b] flex items-center justify-center font-bold text-white text-xs">
                      ₿
                    </div>
                    <div>
                      <div className="font-bold text-white">Bitcoin</div>
                      <div className="text-[10px] font-mono text-gray-400">257.4 BTC</div>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-xs">$16,525,620.00</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-xs">
                      Ξ
                    </div>
                    <div>
                      <div className="font-bold text-white">Ethereum</div>
                      <div className="text-[10px] font-mono text-gray-400">1,932.4 ETH</div>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-xs">$6,676,471.67</div>
                </div>
              </div>
            </div>

            {/* Bottom iOS Home Indicator */}
            <div className="pt-6 pb-1 z-10">
              <div className="w-32 h-1 bg-white/30 rounded-full mx-auto" />
            </div>
          </div>

          {/* MOCKUP 4: LARP WALLET PORTFOLIO ANALYTICS DIAL */}
          <div className="iphone-frame-pro p-4 flex flex-col justify-between min-h-[500px] overflow-hidden select-none w-full max-w-[320px] sm:max-w-none mx-auto">
            <div className="iphone-screen-glass absolute inset-0 pointer-events-none" />

            {/* Status Bar */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-300 px-3 pt-1">
              <span>9:41</span>
              
              {/* Dynamic Island Notch */}
              <div className="w-24 h-4 bg-black rounded-full border border-white/10 flex items-center justify-end px-2 space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#8a9a5b]" />
              </div>

              <div className="flex items-center space-x-1.5 text-gray-300">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="space-y-4 pt-4 px-1 z-10">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-1.5">
                  <PieChart className="w-4 h-4 text-[#8a9a5b]" />
                  <span className="font-bold text-white text-xs">Larp Wallet Dial</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">ANALYTICS</span>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">$10,226,180</div>
                <div className="text-[11px] text-[#c2d6a3] font-bold mt-0.5">Asset Allocation Dial</div>
              </div>

              {/* Simulated Allocation Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="h-2 rounded-full bg-white/10 overflow-hidden flex">
                  <div className="w-[60%] bg-[#8a9a5b]" />
                  <div className="w-[25%] bg-indigo-500" />
                  <div className="w-[15%] bg-amber-500" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-gray-400 pt-0.5">
                  <span className="text-[#c2d6a3]">60% SOL</span>
                  <span className="text-indigo-400">25% ETH</span>
                  <span className="text-amber-400">15% BTC</span>
                </div>
              </div>

              {/* Holdings List */}
              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#8a9a5b]/20 text-[#c2d6a3] flex items-center justify-center font-bold text-xs">
                      ◎
                    </div>
                    <div>
                      <div className="font-bold text-white">Solana Vault</div>
                      <div className="text-[10px] font-mono text-gray-400">41,200 SOL</div>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-xs">$6,135,708</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-xs">
                      Ξ
                    </div>
                    <div>
                      <div className="font-bold text-white">Ethereum Vault</div>
                      <div className="text-[10px] font-mono text-gray-400">1,180 ETH</div>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-xs">$4,090,472</div>
                </div>
              </div>
            </div>

            {/* Bottom iOS Home Indicator */}
            <div className="pt-6 pb-1 z-10">
              <div className="w-32 h-1 bg-white/30 rounded-full mx-auto" />
            </div>
          </div>

        </div>
      </section>

      {/* OVERVIEW / BENTO FEATURES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-[#a5b67d] uppercase">
            Designed For Content Creators
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Built 100% For Fun & Pranks
          </h2>
          <p className="text-base text-gray-300 font-normal">
            Override balances instantly, trigger deposit push alerts on cue, and simulate peer-to-peer transfers with zero risk and 100% client-side privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#8a9a5b]/50 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 flex items-center justify-center text-[#c2d6a3]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Pixel-Perfect Signature UI</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              Built with sub-pixel precision mirroring authentic wallet layouts for high-resolution screenshots & video creation.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#8a9a5b]/50 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 flex items-center justify-center text-[#c2d6a3]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Trigger Mock Deposit Alerts</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              Send real-time simulated incoming crypto notifications directly to your phone screen on cue for pristine video production.
            </p>
          </div>

          <div id="security" className="p-8 rounded-3xl glass-card-dark border border-white/10 hover:border-[#8a9a5b]/50 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 flex items-center justify-center text-[#c2d6a3]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Zero Data & 100% Safe</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              No seed phrases or private keys required. Completely risk-free simulator operating 100% locally in your browser.
            </p>
          </div>

        </div>

        <div className="mt-12 text-center">
          <Link
            href="/features"
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#c2d6a3] hover:text-white underline underline-offset-4"
          >
            <span>Explore All Interactive Features</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-[#a5b67d] uppercase">
            Verified Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Loved By Content Creators & Streamers
          </h2>
          <div className="flex items-center justify-center space-x-1 text-amber-400 pt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-xs text-gray-300 font-bold ml-2">5.0 / 5.0 Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Alex Vance",
              role: "Content Creator",
              comment: "The signature Larp Wallet UI fidelity is perfection. Best fake wallet app for videos and screenshots!",
            },
            {
              name: "Elena Rostova",
              role: "Streamer",
              comment: "Custom token creation and instant balance configuration takes under 10 seconds. Ultra-smooth design.",
            },
            {
              name: "Marcus Chen",
              role: "Meme Page Admin",
              comment: "Mock deposit alerts work flawlessly on cue. Hilarious pranks with friends!",
            },
          ].map((rev, idx) => (
            <div key={idx} className="p-6 rounded-3xl glass-card-dark border border-white/10 space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">"{rev.comment}"</p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="font-bold text-white">{rev.name}</span>
                <span className="text-gray-500">{rev.role}</span>
              </div>
            </div>
          ))}
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
            <Link href="/how-it-works" className="hover:text-[#c2d6a3] transition-colors">How It Works</Link>
            <Link href="/pricing" className="hover:text-[#c2d6a3] transition-colors">Pricing</Link>
            <Link href="/reviews" className="hover:text-[#c2d6a3] transition-colors">Reviews</Link>
          </div>

          <div className="text-gray-500 font-mono text-[11px]">
            © {new Date().getFullYear()} Larp Wallet. Built 100% for fun and pranks.
          </div>
        </div>
      </footer>

      {/* LOGIN & AUTHENTICATION MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md rounded-3xl glass-card-dark p-6 sm:p-8 border border-[#8a9a5b]/40 shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto">
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
                <p className="text-xs text-gray-400">Enter access key or account email</p>
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
