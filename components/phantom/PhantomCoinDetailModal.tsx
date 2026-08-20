"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  Plus,
  Send,
  ExternalLink,
} from "lucide-react";

interface CoinToken {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  marketCap: number;
  change24h: number;
}

interface PhantomCoinDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  coin: CoinToken | null;
  onSwap: (coin: CoinToken) => void;
  onBuy: (coin: CoinToken) => void;
}

function formatPrice(price: number): string {
  if (price >= 1000)
    return `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(4)}`;
  if (price >= 0.01) return `$${price.toFixed(5)}`;
  return `$${price.toFixed(8)}`;
}

function formatLargeNum(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

// Generate smooth SVG path points for trend chart
function generateChartPath(isPositive: boolean): string {
  if (isPositive) {
    return "M 0,80 C 40,75 70,85 100,60 C 130,35 160,50 190,30 C 220,10 250,25 280,15 C 310,5 340,15 360,5";
  }
  return "M 0,10 C 40,15 70,25 100,35 C 130,55 160,40 190,65 C 220,75 250,60 280,80 C 310,85 340,75 360,95";
}

export default function PhantomCoinDetailModal({
  isOpen,
  onClose,
  coin,
  onSwap,
  onBuy,
}: PhantomCoinDetailModalProps) {
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "1Y" | "ALL">("1D");

  if (!isOpen || !coin) return null;

  const isPositive = coin.change24h >= 0;
  const strokeColor = isPositive ? "#34d399" : "#f87171";
  const fillColor = isPositive ? "rgba(52, 211, 153, 0.1)" : "rgba(248, 113, 113, 0.1)";

  const volume24h = coin.marketCap * 0.085;
  const ath = coin.price * (isPositive ? 1.45 : 2.1);

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-[#000000] text-white font-sans animate-slideUp overflow-hidden">
      {/* ── HEADER ── */}
      <div className="sticky top-0 z-10 bg-[#000000] px-4 pt-12 pb-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1c1c1e] flex items-center justify-center hover:bg-[#2c2c2e] transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-[#1c1c1e] shrink-0">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/img.jpeg";
                }}
              />
            </div>
            <span className="font-extrabold text-base text-white">{coin.name}</span>
            <CheckCircle2 className="w-4 h-4 text-[#a594fd] fill-[#a594fd]/20" />
          </div>
        </div>

        <button
          type="button"
          className="w-9 h-9 rounded-full bg-[#1c1c1e] flex items-center justify-center hover:bg-[#2c2c2e] text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* ── BODY ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-lg mx-auto w-full">
        {/* PRICE HERO */}
        <div className="space-y-1">
          <div className="text-4xl font-extrabold text-white font-mono tracking-tight">
            {formatPrice(coin.price)}
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`flex items-center space-x-1 text-sm font-bold px-2.5 py-0.5 rounded-full ${
                isPositive ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span>
                {isPositive ? "+" : ""}
                {coin.change24h.toFixed(2)}%
              </span>
            </span>
            <span className="text-xs font-semibold text-gray-500">24h Change</span>
          </div>
        </div>

        {/* PRICE CHART */}
        <div className="bg-[#111113] rounded-3xl p-4 border border-white/5 space-y-4">
          <div className="h-44 w-full relative pt-2">
            <svg viewBox="0 0 360 100" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id={`grad-${coin.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path
                d={`${generateChartPath(isPositive)} L 360,100 L 0,100 Z`}
                fill={`url(#grad-${coin.id})`}
              />
              {/* Stroke path */}
              <path
                d={generateChartPath(isPositive)}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Timeframe Selector Pills */}
          <div className="flex items-center justify-between px-2 pt-2 border-t border-white/5">
            {(["1D", "1W", "1M", "1Y", "ALL"] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  timeframe === tf
                    ? "bg-[#a594fd] text-black"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwap(coin);
            }}
            className="py-3.5 px-4 rounded-2xl bg-[#a594fd] hover:bg-[#b6a7ff] text-black font-extrabold text-sm flex items-center justify-center space-x-2 transition-all shadow-[0_4px_16px_rgba(165,148,253,0.3)] active:scale-[0.98] cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4 stroke-[2.5]" />
            <span>Swap</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onBuy(coin);
            }}
            className="py-3.5 px-4 rounded-2xl bg-[#1c1c1e] hover:bg-[#2c2c2e] border border-white/5 text-white font-extrabold text-sm flex items-center justify-center space-x-2 transition-colors active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#a594fd]" />
            <span>Buy</span>
          </button>

          <button
            type="button"
            className="py-3.5 px-4 rounded-2xl bg-[#1c1c1e] hover:bg-[#2c2c2e] border border-white/5 text-white font-extrabold text-sm flex items-center justify-center space-x-2 transition-colors active:scale-[0.98] cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#a594fd]" />
            <span>Send</span>
          </button>
        </div>

        {/* KEY STATISTICS */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
            Key Statistics
          </span>
          <div className="bg-[#111113] rounded-2xl border border-white/5 divide-y divide-white/5">
            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="text-sm font-semibold text-gray-400">Market Cap</span>
              <span className="text-sm font-extrabold text-white font-mono">
                {formatLargeNum(coin.marketCap)}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="text-sm font-semibold text-gray-400">24h Volume</span>
              <span className="text-sm font-extrabold text-white font-mono">
                {formatLargeNum(volume24h)}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="text-sm font-semibold text-gray-400">All-Time High</span>
              <span className="text-sm font-extrabold text-white font-mono">
                {formatPrice(ath)}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="text-sm font-semibold text-gray-400">Popularity Rank</span>
              <span className="text-sm font-extrabold text-[#a594fd]">#1</span>
            </div>

            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="text-sm font-semibold text-gray-400">Network</span>
              <span className="text-sm font-extrabold text-white">Solana</span>
            </div>
          </div>
        </div>

        {/* TOKEN DESCRIPTION */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
            About {coin.name}
          </span>
          <div className="bg-[#111113] rounded-2xl p-4 border border-white/5 text-xs text-gray-400 leading-relaxed font-medium">
            {coin.name} ({coin.symbol}) is a decentralized digital token operating on high-performance blockchain infrastructure. It provides instant settlement, zero-friction trading, and seamless compatibility with the Phantom Wallet ecosystem.
          </div>
        </div>
      </div>
    </div>
  );
}
