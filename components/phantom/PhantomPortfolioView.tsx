"use client";

import React from "react";
import { CheckCircle2, Trash2, TrendingUp } from "lucide-react";

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
  onCurrencyToggle: () => void;
  onRemoveHolding: (coinId: string) => void;
}

function formatValue(usd: number, currency: "usd" | "gbp", rate: number): string {
  const value = currency === "gbp" ? usd * rate : usd;
  const symbol = currency === "gbp" ? "£" : "$";
  return `${symbol}${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatQty(qty: number, symbol: string): string {
  const formatted = qty < 0.001
    ? qty.toFixed(8)
    : qty < 1
    ? qty.toFixed(5)
    : qty.toLocaleString("en-US", { maximumFractionDigits: 4 });
  return `${formatted} ${symbol}`;
}

export default function PhantomPortfolioView({
  holdings,
  coins,
  currency,
  usdToGbp,
  onCurrencyToggle,
  onRemoveHolding,
}: PhantomPortfolioViewProps) {
  type EnrichedHolding = Holding & {
    coin: CoinToken;
    currentValue: number;
    costBasis: number;
    pnlUsd: number;
    pnlPct: number;
  };

  // Enrich holdings with live price data
  const enriched: EnrichedHolding[] = holdings
    .map((h) => {
      const coin = coins.find((c) => c.id === h.coinId);
      if (!coin) return null;
      const currentValue = h.qty * coin.price;
      const costBasis = h.qty * h.avgBuyPrice;
      const pnlUsd = currentValue - costBasis;
      const pnlPct = costBasis > 0 ? (pnlUsd / costBasis) * 100 : 0;
      return { ...h, coin, currentValue, costBasis, pnlUsd, pnlPct };
    })
    .filter((x): x is EnrichedHolding => x !== null)
    .sort((a, b) => b.currentValue - a.currentValue);

  const totalUsd = enriched.reduce((sum: number, e: EnrichedHolding) => sum + e.currentValue, 0);
  const totalPnlUsd = enriched.reduce((sum: number, e: EnrichedHolding) => sum + e.pnlUsd, 0);
  const totalPnlPct = totalUsd > 0 ? (totalPnlUsd / (totalUsd - totalPnlUsd)) * 100 : 0;

  const isPnlPositive = totalPnlUsd >= 0;

  return (
    <div className="space-y-5">

      {/* ── BALANCE CARD ── */}
      <div className="mx-0 pt-4 pb-2 space-y-3">

        {/* Currency Toggle */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onCurrencyToggle}
            className="flex items-center space-x-1 px-3 py-1 rounded-full bg-[#1c1c1e] border border-white/5 hover:bg-[#2c2c2e] transition-colors cursor-pointer"
          >
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${currency === "usd" ? "bg-[#a594fd] text-black" : "text-gray-400"}`}>$ USD</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${currency === "gbp" ? "bg-[#a594fd] text-black" : "text-gray-400"}`}>£ GBP</span>
          </button>
        </div>

        {/* Total Balance Display */}
        <div className="text-center space-y-1">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Total Balance</div>
          <div className="text-4xl font-extrabold text-white tracking-tight">
            {formatValue(totalUsd, currency, usdToGbp)}
          </div>
          <div className={`flex items-center justify-center space-x-1.5 text-sm font-bold ${isPnlPositive ? "text-emerald-400" : "text-red-400"}`}>
            <TrendingUp className="w-4 h-4" />
            <span>
              {isPnlPositive ? "+" : ""}{formatValue(Math.abs(totalPnlUsd), currency, usdToGbp)}
              {" "}({isPnlPositive ? "+" : ""}{totalPnlPct.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* ── HOLDINGS HEADER ── */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Holdings</span>
        <span className="text-xs font-semibold text-gray-600">{enriched.length} token{enriched.length !== 1 ? "s" : ""}</span>
      </div>

      {/* ── HOLDINGS LIST ── */}
      <div className="space-y-2">
        {enriched.map((item) => {
          const isPositive = item.coin.change24h >= 0;
          const isPnlPos = item.pnlUsd >= 0;

          return (
            <div
              key={item.coinId}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#09090b] border border-white/5 group relative overflow-hidden"
            >
              {/* Token Left: icon + name + qty */}
              <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#1c1c1e] border border-white/10 shrink-0">
                  <img
                    src={item.coin.image}
                    alt={item.coin.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/img.jpeg"; }}
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-extrabold text-base text-white truncate">{item.coin.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8b79f6] fill-[#8b79f6]/20 shrink-0" />
                  </div>
                  <div className="text-xs font-semibold text-gray-500">
                    {formatQty(item.qty, item.coin.symbol)}
                  </div>
                </div>
              </div>

              {/* Token Right: value + 24h change */}
              <div className="text-right flex items-center space-x-3 shrink-0">
                <div>
                  <div className="font-extrabold text-base text-white font-mono">
                    {formatValue(item.currentValue, currency, usdToGbp)}
                  </div>
                  <div className={`text-xs font-bold font-mono ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
                    {isPositive ? "+" : ""}{item.coin.change24h.toFixed(2)}%
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => onRemoveHolding(item.coinId)}
                  className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center hover:bg-red-500/30 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
