"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  TrendingUp,
  Send,
  Download,
  Repeat,
  PlusCircle,
  Zap,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

interface PortfolioCardProps {
  onOpenSend: () => void;
  onOpenReceive: () => void;
}

export default function PortfolioCard({
  onOpenSend,
  onOpenReceive,
}: PortfolioCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-3xl glass-card-olive p-6 sm:p-8">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#8a9a5b]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#4a5a2b]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between space-y-6">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#a5b67d]">
              Total Net Portfolio Value
            </span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title={showBalance ? "Hide Balance" : "Show Balance"}
            >
              {showBalance ? (
                <Eye className="w-4 h-4 text-[#8a9a5b]" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#8a9a5b]/15 border border-[#8a9a5b]/30 text-xs font-semibold text-[#c0d4a0]">
              <TrendingUp className="w-3.5 h-3.5 text-[#8a9a5b]" />
              <span>+$1,420.50 (3.03%) 24h</span>
            </div>
          </div>
        </div>

        {/* Balance Display */}
        <div>
          <div className="flex items-baseline space-x-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight olive-text-gradient">
              {showBalance ? "$48,294.65" : "••••••••••"}
            </h1>
            <span className="text-sm font-medium text-gray-400">USD</span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8a9a5b]" />
              <span>1.42 BTC</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>12.8 ETH</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>85.4 SOL</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span>3,450 USDT</span>
            </div>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          
          {/* Send */}
          <button
            onClick={onOpenSend}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl olive-btn-primary group"
          >
            <Send className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span>Send</span>
          </button>

          {/* Receive */}
          <button
            onClick={onOpenReceive}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-[#1a231c] border border-white/10 hover:border-[#8a9a5b]/50 text-white font-semibold hover:bg-[#222d25] transition-all group"
          >
            <Download className="w-4 h-4 text-[#8a9a5b] transition-transform group-hover:translate-y-0.5" />
            <span>Receive</span>
          </button>

          {/* Swap */}
          <button
            onClick={() => {
              const swapElem = document.getElementById("quick-swap-section");
              swapElem?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-[#1a231c] border border-white/10 hover:border-[#8a9a5b]/50 text-white font-semibold hover:bg-[#222d25] transition-all group"
          >
            <Repeat className="w-4 h-4 text-[#8a9a5b] transition-transform group-hover:rotate-180 duration-500" />
            <span>Swap</span>
          </button>

          {/* Buy */}
          <button className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-gray-200 hover:text-white font-semibold transition-all">
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Buy / Fiat</span>
          </button>

        </div>

        {/* Bottom Highlights & Gas Status */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-white/5 text-[#8a9a5b]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-gray-400 text-[11px]">Gas Price</div>
              <div className="font-semibold text-gray-200">14 Gwei <span className="text-emerald-400 text-[10px] font-normal">(Low)</span></div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-white/5 text-[#8a9a5b]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-gray-400 text-[11px]">Active Staking Yield</div>
              <div className="font-semibold text-[#c0d4a0]">$12,450 (4.8% APY)</div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-white/5 text-[#8a9a5b]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <div className="text-gray-400 text-[11px]">30-Day High</div>
              <div className="font-semibold text-gray-200">$51,400.00</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
