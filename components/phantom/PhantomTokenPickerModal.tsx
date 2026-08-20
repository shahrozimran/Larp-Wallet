"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Search, X, CheckCircle2 } from "lucide-react";
import { Holding, CoinToken } from "./PhantomPortfolioView";

interface PhantomTokenPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: CoinToken[];
  holdings: Holding[];
  onSelectToken: (coin: CoinToken) => void;
  title?: string;
}

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(8)}`;
}

export default function PhantomTokenPickerModal({
  isOpen,
  onClose,
  coins,
  holdings,
  onSelectToken,
  title = "Select Token",
}: PhantomTokenPickerModalProps) {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => searchInputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const holdingsMap = new Map(holdings.map((h) => [h.coinId, h.qty]));

  const filteredCoins = query.trim().length === 0
    ? coins
    : coins.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.symbol.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-[#000000] text-white font-sans animate-slideUp">
      {/* Header */}
      <div className="px-4 pt-12 pb-3 flex items-center space-x-3 border-b border-white/5 shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-[#1c1c1e] flex items-center justify-center hover:bg-[#2c2c2e] transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#6e6e78] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search token name or address"
            className="w-full pl-10 pr-10 py-2.5 rounded-full bg-[#1b1a22] border border-white/5 text-white text-sm placeholder-[#6e6e78] focus:outline-none focus:border-[#a594fd]/50 transition-all font-medium"
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
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
        {filteredCoins.map((coin) => {
          const userQty = holdingsMap.get(coin.id) || 0;
          return (
            <button
              key={coin.id}
              type="button"
              onClick={() => {
                onSelectToken(coin);
                onClose();
              }}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-[#0f0f12] active:bg-[#1a1a1e] transition-colors cursor-pointer group text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#1c1c1e] border border-white/8 shrink-0">
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
                    <span className="font-extrabold text-sm text-white">
                      {coin.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#a594fd] fill-[#a594fd]/20" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500">
                    {coin.symbol}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-bold text-sm text-white font-mono">
                  {formatPrice(coin.price)}
                </div>
                {userQty > 0 ? (
                  <div className="text-xs font-semibold text-[#a594fd]">
                    {userQty.toLocaleString()} {coin.symbol}
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-gray-600">
                    0 {coin.symbol}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
