"use client";

import React, { useState } from "react";
import { Search, X, CheckCircle2, TrendingUp, TrendingDown } from "lucide-react";
import PhantomCoinDetailModal from "./PhantomCoinDetailModal";
import { CoinToken } from "./PhantomPortfolioView";

interface PhantomExploreViewProps {
  coins: CoinToken[];
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

function formatMarketCap(mc: number = 0): string {
  if (mc >= 1e9) return `$${(mc / 1e9).toFixed(1)}B MC`;
  if (mc >= 1e6) return `$${(mc / 1e6).toFixed(0)}M MC`;
  return `$${(mc / 1e3).toFixed(0)}K MC`;
}

type FilterCategory = "Trending" | "Top Gainers" | "Top Losers" | "Solana" | "Memes";

export default function PhantomExploreView({
  coins,
  onSwap,
  onBuy,
}: PhantomExploreViewProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("Trending");
  const [selectedCoin, setSelectedCoin] = useState<CoinToken | null>(null);

  const categories: FilterCategory[] = [
    "Trending",
    "Top Gainers",
    "Top Losers",
    "Solana",
    "Memes",
  ];

  // Process & filter coins based on active category and search query
  let processedCoins = [...coins];

  if (activeCategory === "Top Gainers") {
    processedCoins.sort((a, b) => b.change24h - a.change24h);
  } else if (activeCategory === "Top Losers") {
    processedCoins.sort((a, b) => a.change24h - b.change24h);
  } else if (activeCategory === "Memes") {
    const memeIds = ["fartcoin", "popcat", "peanut-the-squirrel", "bonk", "dogecoin", "shiba-inu", "pepe"];
    processedCoins = processedCoins.filter(
      (c) => memeIds.includes(c.id) || c.symbol.includes("CAT") || c.symbol.includes("DOGE")
    );
  }

  if (query.trim().length > 0) {
    processedCoins = processedCoins.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.symbol.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <div className="flex flex-col w-full space-y-5 px-4 pt-2">
      {/* ── SEARCH BAR ── */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#6e6e78] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tokens or contract address"
          className="w-full pl-11 pr-10 py-3 rounded-full bg-[#1b1a22] border border-white/5 text-white text-sm placeholder-[#6e6e78] focus:outline-none focus:border-[#a594fd]/50 transition-all font-medium"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* ── CATEGORY FILTER CHIPS ── */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#a594fd] text-black shadow-[0_0_12px_rgba(165,148,253,0.3)]"
                  : "bg-[#1c1c1e] text-gray-400 hover:bg-[#2c2c2e] hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── COIN LIST HEADER ── */}
      <div className="flex items-center justify-between px-1 pt-1">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          {activeCategory} ({processedCoins.length})
        </span>
        <span className="text-xs font-semibold text-gray-600">24h Change</span>
      </div>

      {/* ── COIN DISCOVERY LIST ── */}
      <div className="space-y-2">
        {processedCoins.map((coin, index) => {
          const isPositive = coin.change24h >= 0;
          return (
            <div
              key={coin.id}
              onClick={() => setSelectedCoin(coin)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#09090b] hover:bg-[#0f0f12] active:bg-[#151518] border border-white/5 transition-all cursor-pointer group"
            >
              {/* Rank + Avatar + Name + MC */}
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-gray-600 w-4 text-center">
                  {index + 1}
                </span>
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#1c1c1e] border border-white/10 shrink-0">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/img.jpeg";
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-extrabold text-sm text-white group-hover:text-[#a594fd] transition-colors">
                      {coin.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8b79f6] fill-[#8b79f6]/20" />
                  </div>
                  <div className="text-xs font-semibold text-gray-500">
                    {formatMarketCap(coin.marketCap)}
                  </div>
                </div>
              </div>

              {/* Price & 24h Variation */}
              <div className="text-right">
                <div className="font-extrabold text-sm text-white font-mono">
                  {formatPrice(coin.price)}
                </div>
                <div
                  className={`flex items-center justify-end space-x-0.5 text-xs font-bold font-mono ${
                    isPositive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>
                    {isPositive ? "+" : ""}
                    {coin.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── COIN DETAIL MODAL ── */}
      <PhantomCoinDetailModal
        isOpen={selectedCoin !== null}
        onClose={() => setSelectedCoin(null)}
        coin={selectedCoin}
        onSwap={onSwap}
        onBuy={onBuy}
      />
    </div>
  );
}
