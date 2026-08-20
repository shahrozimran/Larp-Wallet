"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Search, X, CheckCircle2, ChevronRight } from "lucide-react";

interface CoinToken {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  marketCap: number;
  change24h: number;
}

interface PhantomAddCashModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: CoinToken[];
  onAddHolding: (coinId: string, qty: number) => void;
}

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(4)}`;
  if (price >= 0.01) return `$${price.toFixed(5)}`;
  return `$${price.toFixed(8)}`;
}

export default function PhantomAddCashModal({
  isOpen,
  onClose,
  coins,
  onAddHolding,
}: PhantomAddCashModalProps) {
  const [step, setStep] = useState<"search" | "quantity">("search");
  const [query, setQuery] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<CoinToken | null>(null);
  const [qty, setQty] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const qtyInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStep("search");
      setQuery("");
      setSelectedCoin(null);
      setQty("");
      setTimeout(() => searchInputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === "quantity") {
      setTimeout(() => qtyInputRef.current?.focus(), 150);
    }
  }, [step]);

  if (!isOpen) return null;

  const filteredCoins = query.trim().length === 0
    ? coins.slice(0, 20)
    : coins.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.symbol.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 15);

  const qtyNum = parseFloat(qty) || 0;
  const usdValue = selectedCoin ? qtyNum * selectedCoin.price : 0;

  const handleAdd = () => {
    if (!selectedCoin || qtyNum <= 0) return;
    onAddHolding(selectedCoin.id, qtyNum);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-[#000000] text-white font-sans animate-slideUp overflow-hidden">

      {/* ── STEP 1: COIN SEARCH ── */}
      {step === "search" && (
        <>
          {/* Header */}
          <div className="px-4 pt-12 pb-3 flex items-center space-x-3 border-b border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#1c1c1e] flex items-center justify-center hover:bg-[#2c2c2e] transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#6e6e78] absolute left-3.5 top-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tokens"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#1b1a22] border border-white/5 text-white text-sm placeholder-[#6e6e78] focus:outline-none focus:border-[#a594fd]/50 transition-all font-medium"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 top-3 cursor-pointer"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>

          {/* Token List */}
          <div className="flex-1 overflow-y-auto">
            {query.trim().length === 0 && (
              <div className="px-4 pt-4 pb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Popular Tokens</span>
              </div>
            )}
            <div className="divide-y divide-white/4">
              {filteredCoins.map((coin) => {
                const isPositive = coin.change24h >= 0;
                return (
                  <button
                    key={coin.id}
                    type="button"
                    onClick={() => { setSelectedCoin(coin); setStep("quantity"); }}
                    className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#0f0f12] transition-colors cursor-pointer group text-left"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-full overflow-hidden bg-[#1c1c1e] border border-white/8 shrink-0">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/img.jpeg"; }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-extrabold text-base text-white group-hover:text-[#a594fd] transition-colors">
                            {coin.name}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8b79f6] fill-[#8b79f6]/20" />
                        </div>
                        <span className="text-xs font-semibold text-gray-500">{coin.symbol}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-sm text-white font-mono">{formatPrice(coin.price)}</div>
                      <div className={`text-xs font-bold font-mono ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
                        {isPositive ? "+" : ""}{coin.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* ── STEP 2: QUANTITY INPUT ── */}
      {step === "quantity" && selectedCoin && (
        <>
          {/* Header */}
          <div className="px-4 pt-12 pb-4 flex items-center space-x-4 border-b border-white/5">
            <button
              type="button"
              onClick={() => setStep("search")}
              className="w-9 h-9 rounded-full bg-[#1c1c1e] flex items-center justify-center hover:bg-[#2c2c2e] transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-extrabold text-white">Add {selectedCoin.name}</h1>
          </div>

          <div className="flex-1 px-4 py-6 flex flex-col space-y-6 max-w-lg mx-auto w-full">

            {/* Selected Coin Info Card */}
            <div className="flex items-center space-x-4 p-4 bg-[#111113] rounded-2xl border border-white/5">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[#1c1c1e] border border-white/10 shrink-0">
                <img
                  src={selectedCoin.image}
                  alt={selectedCoin.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/img.jpeg"; }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-extrabold text-white">{selectedCoin.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#8b79f6] fill-[#8b79f6]/20" />
                </div>
                <span className="text-sm text-gray-400 font-semibold">{selectedCoin.symbol}</span>
              </div>
              <div className="text-right">
                <div className="font-extrabold text-white font-mono">{formatPrice(selectedCoin.price)}</div>
                <div className={`text-xs font-bold font-mono ${selectedCoin.change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {selectedCoin.change24h >= 0 ? "+" : ""}{selectedCoin.change24h.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Quantity Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
                Number of {selectedCoin.symbol} coins
              </label>
              <div className="flex items-center bg-[#1c1c1e] rounded-2xl border border-white/5 focus-within:border-[#a594fd]/60 transition-colors px-4 py-4">
                <input
                  ref={qtyInputRef}
                  type="number"
                  min="0"
                  step="any"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-transparent text-3xl font-extrabold text-white placeholder-gray-600 focus:outline-none font-mono"
                />
                <span className="text-lg font-bold text-gray-400 ml-2 shrink-0">{selectedCoin.symbol}</span>
              </div>
            </div>

            {/* Live USD Preview */}
            <div className="flex items-center justify-between px-4 py-4 bg-[#111113] rounded-2xl border border-white/5">
              <span className="text-sm font-semibold text-gray-400">Estimated Value</span>
              <div className="text-right">
                <span className="text-xl font-extrabold text-white font-mono">
                  ${usdValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                {qtyNum > 0 && (
                  <div className="text-xs text-gray-500 font-mono mt-0.5">
                    {qtyNum.toLocaleString()} × {formatPrice(selectedCoin.price)}
                  </div>
                )}
              </div>
            </div>

            {/* Add to Portfolio CTA */}
            <div className="mt-auto pt-4">
              <button
                type="button"
                onClick={handleAdd}
                disabled={qtyNum <= 0}
                className={`w-full py-4 rounded-2xl font-extrabold text-base transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  qtyNum > 0
                    ? "bg-[#a594fd] hover:bg-[#b6a7ff] text-black shadow-[0_4px_20px_rgba(165,148,253,0.3)] active:scale-[0.99]"
                    : "bg-[#1c1c1e] text-gray-600 cursor-not-allowed"
                }`}
              >
                <span>Add to Portfolio</span>
                {qtyNum > 0 && <ChevronRight className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
