"use client";

import React, { useState } from "react";
import {
  X,
  Heart,
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Flame,
} from "lucide-react";
import { CoinToken } from "./PhantomPortfolioView";

interface PhantomCoinDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  coin: CoinToken | null;
  onTrade?: (coin: CoinToken) => void;
  onSwap?: (coin: CoinToken) => void;
  onBuy?: (coin: CoinToken) => void;
}

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(8)}`;
}

function formatLargeNum(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
  return `$${num.toFixed(2)}`;
}

export default function PhantomCoinDetailModal({
  isOpen,
  onClose,
  coin,
  onTrade,
}: PhantomCoinDetailModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!isOpen || !coin) return null;

  const isPositive = coin.change24h >= 0;
  const marketCap = coin.marketCap || (coin.price * 580000000);
  const volume24h = marketCap * 0.13;
  const fundingRate = "0.00125%";
  const openInterest = formatLargeNum(marketCap * 0.008);

  return (
    <div className="fixed inset-0 z-[70] flex flex-col justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Click backdrop to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Sheet Container */}
      <div className="relative z-10 w-full max-w-[430px] mx-auto bg-[#000000] text-white rounded-t-[32px] border-t border-white/10 max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-slideUp">
        
        {/* Handle Bar Drag Indicator */}
        <div className="pt-3 pb-1 flex justify-center cursor-pointer" onClick={onClose}>
          <div className="w-10 h-1 bg-[#3f3f46] rounded-full" />
        </div>

        {/* ── TOP HEADER BAR ── */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-white/5 shrink-0">
          <div className="flex items-center space-x-3">
            {/* Token Icon */}
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#27272a] border border-white/10 flex items-center justify-center shrink-0">
              {coin.image ? (
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <span className="font-black text-xs text-white">{coin.symbol.slice(0, 3)}</span>
              )}
            </div>

            {/* Token Title & Price Subtitle */}
            <div>
              <div className="font-extrabold text-base text-white leading-tight">{coin.name}</div>
              <div className="text-xs font-bold text-gray-400 font-mono">{formatPrice(coin.price)}</div>
            </div>
          </div>

          {/* Right Action Icons (♡, ···, X) */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-9 h-9 rounded-full bg-[#18181b] hover:bg-[#27272a] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-300"}`} />
            </button>
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-[#18181b] hover:bg-[#27272a] flex items-center justify-center transition-colors cursor-pointer text-gray-300"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#18181b] hover:bg-[#27272a] flex items-center justify-center transition-colors cursor-pointer text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── SCROLLABLE BODY CONTENT ── */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 no-scrollbar">

          {/* 1. Market Sentiment Banner Card */}
          <div className="flex items-center space-x-3.5 p-4 bg-[#18181b] rounded-2xl border border-white/5">
            <div className="w-9 h-9 rounded-full bg-[#f97316]/20 flex items-center justify-center text-[#f97316] shrink-0">
              <Flame className="w-5 h-5 fill-[#f97316]" />
            </div>
            <span className="font-extrabold text-base text-white">Don&apos;t chase</span>
          </div>

          {/* 2. AI Market Insight Summary */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-200 leading-relaxed">
              {coin.name} has seen increased institutional interest and network activity, with tokenized equities on the platform reaching $465 million and a dormant whale resuming accumulation...
            </p>
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#beacff]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1m ago · Generated from market insights</span>
            </div>
          </div>

          {/* 3. About [Token] > Section & Key Stats */}
          <div className="space-y-3">
            <button type="button" className="flex items-center space-x-1 text-xl font-extrabold text-white hover:text-[#beacff] transition-colors cursor-pointer">
              <span>About {coin.name}</span>
              <ChevronRight className="w-5 h-5 text-gray-300 stroke-[2.5]" />
            </button>

            <p className="text-sm font-medium text-gray-300 leading-relaxed">
              {coin.name} is a high-performance blockchain infrastructure token powering smart contracts, decentralized finance, and web3 applications with maximum scalability.
            </p>

            {/* Statistics Grid Table */}
            <div className="bg-[#18181b] rounded-2xl border border-white/5 divide-y divide-white/5">
              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-sm font-semibold text-gray-400">Security</span>
                <span className="text-sm font-extrabold text-[#beacff] flex items-center space-x-1">
                  <span>Verified</span>
                  <CheckCircle2 className="w-4 h-4 text-[#beacff] fill-[#beacff]/20" />
                </span>
              </div>

              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-sm font-semibold text-gray-400">24h Volume</span>
                <span className="text-sm font-extrabold text-white font-mono">{formatLargeNum(volume24h)}</span>
              </div>

              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-sm font-semibold text-gray-400">Market cap</span>
                <span className="text-sm font-extrabold text-white font-mono">{formatLargeNum(marketCap)}</span>
              </div>

              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-sm font-semibold text-gray-400">Network</span>
                <span className="text-sm font-extrabold text-white">{coin.name}</span>
              </div>

              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-sm font-semibold text-gray-400">Funding Rate</span>
                <span className="text-sm font-extrabold text-white font-mono">{fundingRate}</span>
              </div>

              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-sm font-semibold text-gray-400">Open Interest</span>
                <span className="text-sm font-extrabold text-white font-mono">{openInterest}</span>
              </div>
            </div>
          </div>

          {/* 4. Up or Down > Prediction Game Widget */}
          <div className="space-y-3 pt-1">
            <button type="button" className="flex items-center space-x-1 text-xl font-extrabold text-white hover:text-[#beacff] transition-colors cursor-pointer">
              <span>Up or Down</span>
              <ChevronRight className="w-5 h-5 text-gray-300 stroke-[2.5]" />
            </button>

            <div className="bg-[#18181b] rounded-3xl p-4 border border-white/5 space-y-4">
              {/* Target & Timer Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-[#27272a] shrink-0">
                    {coin.image && <img src={coin.image} alt={coin.name} className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <div className="font-extrabold text-base text-white font-mono">{formatPrice(coin.price)}</div>
                    <div className="text-xs font-semibold text-gray-400">Target ${(coin.price * 0.9995).toFixed(2)}</div>
                  </div>
                </div>
                <div className="bg-[#202024] px-3 py-1 rounded-full text-xs font-extrabold text-white font-mono border border-white/5">
                  00:43
                </div>
              </div>

              {/* Chart SVG Line with Target Dashed Line */}
              <div className="h-24 w-full relative pt-2">
                <svg viewBox="0 0 300 80" className="w-full h-full overflow-visible">
                  {/* Dashed Target line */}
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#52525b" strokeDasharray="4 4" strokeWidth="1.5" />
                  {/* Target pill label */}
                  <rect x="235" y="41" width="55" height="18" rx="9" fill="#52525b" />
                  <text x="262" y="53" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">${(coin.price * 0.9995).toFixed(2)}</text>
                  
                  {/* Live Green Path */}
                  <path
                    d="M 0,45 L 30,45 L 40,65 L 70,65 L 90,30 L 110,40 L 125,25 L 140,40 L 160,15 L 210,15 Z"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Glowing end point */}
                  <circle cx="210" cy="15" r="4" fill="#10b981" />
                  <circle cx="210" cy="15" r="8" fill="#10b981" opacity="0.4" className="animate-ping" />
                </svg>
              </div>

              {/* Up / Down Choice Buttons */}
              <div className="flex items-center space-x-3">
                <button type="button" className="flex-1 py-3 bg-[#202024] hover:bg-[#2c2c32] rounded-xl text-center transition-colors cursor-pointer border border-white/5">
                  <span className="font-extrabold text-sm text-[#10b981]">▲ Up · 0%</span>
                </button>
                <button type="button" className="flex-1 py-3 bg-[#202024] hover:bg-[#2c2c32] rounded-xl text-center transition-colors cursor-pointer border border-white/5">
                  <span className="font-extrabold text-sm text-[#ef4444]">▼ Down · 100%</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5. Explore / Staking Card */}
          <div className="space-y-3 pt-1">
            <h3 className="text-xl font-extrabold text-white">Explore</h3>
            <div className="flex items-center space-x-3.5 p-4 bg-[#18181b] rounded-2xl border border-white/5 cursor-pointer hover:bg-[#202024] transition-all">
              <div className="w-10 h-10 rounded-full bg-[#beacff]/20 text-[#beacff] flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="font-extrabold text-base text-white">Stake P{coin.symbol}</div>
                <div className="text-sm font-semibold text-[#beacff]">Earn 6.03% APY</div>
              </div>
            </div>
          </div>

          {/* 6. Related News Card */}
          <div className="space-y-2 pt-1 pb-4">
            <h3 className="text-xl font-extrabold text-white">Related News</h3>
            <div className="text-xs font-extrabold text-[#10b981]">2 sources · Bullish</div>
            <p className="text-sm font-medium text-gray-300 leading-relaxed">
              {coin.name}&apos;s latest protocol upgrade goes live with 90% rent cut, 3.3x larger transactions, and path to enhanced throughput...
            </p>
          </div>

        </div>

        {/* ── FIXED STICKY BOTTOM ACTION BAR ── */}
        <div className="sticky bottom-0 bg-gradient-to-t from-black via-black/95 to-transparent pt-3 pb-6 px-5 flex items-center justify-between border-t border-white/5 z-20 shrink-0">
          <div className="text-xs font-bold text-gray-400 font-mono">
            {formatLargeNum(marketCap)} Market Cap
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onTrade?.(coin);
            }}
            className="bg-[#beacff] hover:bg-[#cca8ff] text-black font-extrabold px-8 py-3 rounded-full text-base transition-all cursor-pointer shadow-[0_0_16px_rgba(190,172,255,0.4)] active:scale-95"
          >
            Trade
          </button>
        </div>

      </div>
    </div>
  );
}
