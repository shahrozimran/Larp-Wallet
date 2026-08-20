"use client";

import React from "react";
import { ChevronDown, ChevronRight, Banknote } from "lucide-react";

export interface Holding {
  coinId: string;
  qty: number;
  avgBuyPrice: number;
}

interface CoinToken {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  change24h: number;
}

interface PhantomPortfolioViewProps {
  holdings: Holding[];
  coins: CoinToken[];
  currency: "usd" | "gbp";
  usdToGbp: number;
  accountName: string;
}

export default function PhantomPortfolioView({
  holdings,
  coins,
  currency,
  usdToGbp,
  accountName = "Konto 1",
}: PhantomPortfolioViewProps) {

  // If user has custom holdings from transactions, calculate them, otherwise default to screenshot exact 1:1 data
  const hasUserHoldings = holdings.length > 0;

  // Exact 1:1 screenshot defaults
  const solanaHolding = holdings.find((h) => h.coinId === "solana");
  const bfsHolding = holdings.find((h) => h.coinId === "bfs");

  const solQty = solanaHolding ? solanaHolding.qty : 0.09413;
  const solPrice = coins.find((c) => c.id === "solana")?.price || 8.22;
  const solValue = solanaHolding ? solQty * solPrice : 8.22;
  const solChange = solanaHolding ? (coins.find((c) => c.id === "solana")?.change24h || 6.10) : 0.48;

  const bfsQty = bfsHolding ? bfsHolding.qty : 176.12138;
  const bfsPrice = coins.find((c) => c.id === "bfs")?.price || 0.00034;
  const bfsValue = bfsHolding ? bfsQty * bfsPrice : 0.06;

  const totalBalance = hasUserHoldings
    ? holdings.reduce((sum, h) => {
        const c = coins.find((coin) => coin.id === h.coinId);
        return sum + (c ? c.price * h.qty : 0);
      }, 0)
    : 8.28;

  const formattedBalance = `$${totalBalance.toFixed(2)}`;

  return (
    <div className="flex flex-col w-full px-4 pt-3 space-y-6">

      {/* ── ACCOUNT SELECTOR & BALANCE SECTION ── */}
      <div className="space-y-1">
        {/* Konto 1 Selector */}
        <button
          type="button"
          className="flex items-center space-x-1 text-sm font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <span>{accountName || "Konto 1"}</span>
          <ChevronDown className="w-4 h-4 text-gray-300 stroke-[2.5]" />
        </button>

        {/* Huge $8.28 Balance */}
        <div className="text-[3.2rem] font-extrabold text-white leading-tight tracking-tight font-sans">
          {formattedBalance}
        </div>

        {/* PnL Indicator Row (+ $0.48 [+6.10%]) */}
        <div className="flex items-center space-x-2 pt-0.5">
          <span className="text-base font-extrabold text-[#10b981]">
            +$0.48
          </span>
          <span className="bg-[#10b981] text-[#000000] font-black text-xs px-2.5 py-0.5 rounded-full tracking-tight">
            +6.10%
          </span>
        </div>
      </div>

      {/* ── CASH CARD ROW ── */}
      <div>
        <div className="flex items-center justify-between p-4 bg-[#18181b] hover:bg-[#202024] rounded-2xl border border-white/5 transition-all cursor-pointer">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#27272a] flex items-center justify-center text-gray-300 shrink-0">
              <Banknote className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="font-extrabold text-base text-white">Cash</span>
          </div>
          <span className="font-extrabold text-base text-white font-mono">$0.00</span>
        </div>
      </div>

      {/* ── TOKEN SECTION ── */}
      <div className="space-y-3">
        {/* Title */}
        <button
          type="button"
          className="flex items-center space-x-1 text-xl font-extrabold text-white hover:text-[#beacff] transition-colors cursor-pointer"
        >
          <span>Token</span>
          <ChevronRight className="w-5 h-5 text-gray-300 stroke-[2.5]" />
        </button>

        {/* Token Cards Stack */}
        <div className="space-y-2.5">
          
          {/* Solana Card */}
          <div className="flex items-center justify-between p-4 bg-[#18181b] hover:bg-[#202024] rounded-2xl border border-white/5 transition-all cursor-pointer">
            <div className="flex items-center space-x-3.5">
              {/* Solana Logo Circle */}
              <div className="w-11 h-11 rounded-full bg-[#000000] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative">
                <svg viewBox="0 0 397.7 311.7" className="w-6 h-6">
                  <linearGradient id="solGrad1" x1="362.9" y1="38.4" x2="35.3" y2="38.4" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#00ffa3"/>
                    <stop offset="1" stopColor="#dc1fff"/>
                  </linearGradient>
                  <path fill="url(#solGrad1)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.1-3.8h314.6c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.1 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"/>
                  <linearGradient id="solGrad2" x1="362.9" y1="155.8" x2="35.3" y2="155.8" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#00ffa3"/>
                    <stop offset="1" stopColor="#dc1fff"/>
                  </linearGradient>
                  <path fill="url(#solGrad2)" d="M64.6 3.8C67 1.4 70.3 0 73.7 0h314.6c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.1 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"/>
                  <linearGradient id="solGrad3" x1="362.9" y1="273.2" x2="35.3" y2="273.2" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#00ffa3"/>
                    <stop offset="1" stopColor="#dc1fff"/>
                  </linearGradient>
                  <path fill="url(#solGrad3)" d="M333.1 120.9c-2.4-2.4-5.7-3.8-9.1-3.8H9.4c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.1 3.8h314.6c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"/>
                </svg>
              </div>

              <div>
                <div className="font-extrabold text-base text-white">Solana</div>
                <div className="text-sm font-semibold text-gray-400">
                  {solQty.toLocaleString("en-US", { maximumFractionDigits: 5 })} SOL
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-extrabold text-base text-white font-mono">
                ${solValue.toFixed(2)}
              </div>
              <div className="text-xs font-extrabold text-[#10b981] font-mono">
                +${solChange.toFixed(2)}
              </div>
            </div>
          </div>

          {/* BFS Card */}
          <div className="flex items-center justify-between p-4 bg-[#18181b] hover:bg-[#202024] rounded-2xl border border-white/5 transition-all cursor-pointer">
            <div className="flex items-center space-x-3.5">
              {/* BFS Custom Badge Icon */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#00d2ff] via-[#3a7bd5] to-[#f857a6] border border-white/10 flex items-center justify-center shrink-0 shadow-md">
                <span className="font-black text-white text-xs italic tracking-wider">BFS</span>
              </div>

              <div>
                <div className="font-extrabold text-base text-white">BFS</div>
                <div className="text-sm font-semibold text-gray-400">
                  {bfsQty.toLocaleString("en-US", { maximumFractionDigits: 5 })} BFS
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-extrabold text-base text-white font-mono">
                ${bfsValue.toFixed(2)}
              </div>
              <div className="text-xs font-extrabold text-[#ef4444] font-mono">
                -&lt;$0.01
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── PERPS SECTION ── */}
      <div className="space-y-3 pt-1">
        {/* Title */}
        <button
          type="button"
          className="flex items-center space-x-1 text-xl font-extrabold text-white hover:text-[#beacff] transition-colors cursor-pointer"
        >
          <span>Perps</span>
          <ChevronRight className="w-5 h-5 text-gray-300 stroke-[2.5]" />
        </button>

        {/* Perps Horizontal Scroll Carousel */}
        <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-3">
          
          {/* BTC Card */}
          <div className="w-36 h-36 rounded-2xl bg-[#18181b] hover:bg-[#202024] p-4 border border-white/5 flex flex-col justify-between shrink-0 transition-all cursor-pointer group">
            {/* Top Logo */}
            <div className="w-10 h-10 rounded-full bg-[#f7931a] flex items-center justify-center text-white font-black text-lg shadow-md shrink-0">
              ₿
            </div>

            {/* Middle Name + Badge */}
            <div className="flex items-center space-x-1.5 pt-2">
              <span className="font-extrabold text-base text-white">BTC</span>
              <span className="bg-[#27272a] text-gray-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                40x
              </span>
            </div>

            {/* Bottom Change */}
            <div className="text-base font-extrabold text-[#10b981]">
              +6.28%
            </div>
          </div>

          {/* ETH Card */}
          <div className="w-36 h-36 rounded-2xl bg-[#18181b] hover:bg-[#202024] p-4 border border-white/5 flex flex-col justify-between shrink-0 transition-all cursor-pointer group">
            {/* Top Logo */}
            <div className="w-10 h-10 rounded-full bg-[#282a36] border border-white/10 flex items-center justify-center text-teal-300 font-extrabold text-base shadow-md shrink-0">
              ◆
            </div>

            {/* Middle Name + Badge */}
            <div className="flex items-center space-x-1.5 pt-2">
              <span className="font-extrabold text-base text-white">ETH</span>
              <span className="bg-[#27272a] text-gray-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                25x
              </span>
            </div>

            {/* Bottom Change */}
            <div className="text-base font-extrabold text-[#10b981]">
              +10.93%
            </div>
          </div>

          {/* HY Card */}
          <div className="w-36 h-36 rounded-2xl bg-[#18181b] hover:bg-[#202024] p-4 border border-white/5 flex flex-col justify-between shrink-0 transition-all cursor-pointer group">
            {/* Top Logo */}
            <div className="w-10 h-10 rounded-full bg-[#14262b] border border-[#20ded3]/30 flex items-center justify-center text-[#20ded3] font-black text-sm shadow-md shrink-0">
              HY
            </div>

            {/* Middle Name */}
            <div className="flex items-center space-x-1.5 pt-2">
              <span className="font-extrabold text-base text-white">HY...</span>
            </div>

            {/* Bottom Change */}
            <div className="text-base font-extrabold text-[#10b981]">
              +3...
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
