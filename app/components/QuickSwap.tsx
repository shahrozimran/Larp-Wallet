"use client";

import React, { useState } from "react";
import {
  Repeat,
  Settings,
  ArrowDown,
  Zap,
  Info,
  Check,
  Sparkles,
} from "lucide-react";

export default function QuickSwap() {
  const [payToken, setPayToken] = useState("ETH");
  const [receiveToken, setReceiveToken] = useState("USDT");
  const [payAmount, setPayAmount] = useState("1.0");
  const [slippage, setSlippage] = useState("0.5%");
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);

  // Rate calculator simulation
  const rates: Record<string, number> = {
    ETH: 3450.2,
    BTC: 64280.5,
    SOL: 148.75,
    USDT: 1.0,
    LINK: 18.4,
  };

  const payUsd = (parseFloat(payAmount) || 0) * (rates[payToken] || 1);
  const receiveAmount = rates[receiveToken]
    ? (payUsd / rates[receiveToken]).toFixed(4)
    : "0.00";

  const handleSwapDirection = () => {
    setPayToken(receiveToken);
    setReceiveToken(payToken);
  };

  const handleSwapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payAmount || parseFloat(payAmount) <= 0) return;
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccess(true);
      setTimeout(() => setSwapSuccess(false), 2500);
    }, 1500);
  };

  return (
    <div
      id="quick-swap-section"
      className="rounded-3xl glass-card p-6 sm:p-7 border border-white/10 relative overflow-hidden space-y-5"
    >
      {/* Background glow accent */}
      <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-[#8a9a5b]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 text-[#c0d4a0]">
            <Repeat className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Instant Swap DEX</h3>
            <p className="text-[11px] text-gray-400">Zero-slippage best price routing</p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 bg-[#121814] p-1 rounded-xl border border-white/10 text-xs text-gray-300">
          <span className="text-[10px] text-gray-400 font-semibold px-1">Slippage:</span>
          {["0.1%", "0.5%", "1.0%"].map((slip) => (
            <button
              key={slip}
              onClick={() => setSlippage(slip)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                slippage === slip
                  ? "bg-[#8a9a5b] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {slip}
            </button>
          ))}
        </div>
      </div>

      {swapSuccess ? (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#8a9a5b]/20 border-2 border-[#8a9a5b] flex items-center justify-center text-[#c0d4a0] animate-bounce">
            <Check className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white">Swap Complete!</h4>
          <p className="text-xs text-gray-400">
            Swapped {payAmount} {payToken} for {receiveAmount} {receiveToken}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSwapSubmit} className="space-y-3">
          {/* You Pay */}
          <div className="p-4 rounded-2xl bg-[#121814] border border-white/10 focus-within:border-[#8a9a5b] transition-colors">
            <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5">
              <span>You Pay</span>
              <span>Balance: 12.8 {payToken}</span>
            </div>
            <div className="flex items-center justify-between space-x-3">
              <input
                type="number"
                step="any"
                required
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none placeholder-gray-600 font-mono"
              />
              <select
                value={payToken}
                onChange={(e) => setPayToken(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#1c241e] border border-white/10 text-white font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
                <option value="SOL">SOL</option>
                <option value="USDT">USDT</option>
                <option value="LINK">LINK</option>
              </select>
            </div>
            <div className="text-[11px] text-gray-400 mt-1 font-mono">
              ≈ ${payUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
            </div>
          </div>

          {/* Swap Flip Icon */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              type="button"
              onClick={handleSwapDirection}
              className="p-2.5 rounded-xl bg-[#1a231c] border border-[#8a9a5b]/40 text-[#c0d4a0] hover:bg-[#8a9a5b] hover:text-white transition-all shadow-lg hover:rotate-180 duration-300"
              title="Switch tokens"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* You Receive */}
          <div className="p-4 rounded-2xl bg-[#121814] border border-white/10">
            <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5">
              <span>You Receive (Estimated)</span>
              <span className="text-[#8a9a5b] font-medium">Best Rate</span>
            </div>
            <div className="flex items-center justify-between space-x-3">
              <input
                type="text"
                readOnly
                value={receiveAmount}
                className="w-full bg-transparent text-2xl font-bold text-[#c0d4a0] focus:outline-none font-mono"
              />
              <select
                value={receiveToken}
                onChange={(e) => setReceiveToken(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#1c241e] border border-white/10 text-white font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value="USDT">USDT</option>
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
                <option value="SOL">SOL</option>
                <option value="LINK">LINK</option>
              </select>
            </div>
            <div className="text-[11px] text-gray-400 mt-1 font-mono">
              ≈ ${payUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
            </div>
          </div>

          {/* Rate Breakdown */}
          <div className="p-3 rounded-xl bg-white/5 space-y-1 text-[11px] text-gray-400">
            <div className="flex justify-between">
              <span>Exchange Rate</span>
              <span className="font-mono text-gray-200 font-medium">
                1 {payToken} = {(rates[payToken] / (rates[receiveToken] || 1)).toFixed(4)} {receiveToken}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Network Fee</span>
              <span className="font-mono text-emerald-400 font-medium">$0.65 (12 Gwei)</span>
            </div>
          </div>

          {/* Swap Button */}
          <button
            type="submit"
            disabled={isSwapping}
            className="w-full py-3.5 px-4 rounded-xl olive-btn-primary font-bold text-sm tracking-wide transition-all disabled:opacity-50"
          >
            {isSwapping ? "Processing Swap..." : `Swap ${payToken} to ${receiveToken}`}
          </button>
        </form>
      )}
    </div>
  );
}
