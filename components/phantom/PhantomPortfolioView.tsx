"use client";

import React from "react";
import { CheckCircle2, ChevronRight, CreditCard } from "lucide-react";

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

// Default "zero" tokens always shown like real Phantom
const DEFAULT_TOKENS = [
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
];

interface PhantomPortfolioViewProps {
  holdings: Holding[];
  coins: CoinToken[];
  currency: "usd" | "gbp";
  usdToGbp: number;
  accountName: string;
}

type EnrichedHolding = {
  coinId: string;
  qty: number;
  avgBuyPrice: number;
  coin: CoinToken;
  currentValue: number;
  costBasis: number;
  pnlUsd: number;
  pnlPct: number;
};

function formatValue(usd: number, currency: "usd" | "gbp", rate: number): string {
  const value = currency === "gbp" ? usd * rate : usd;
  const symbol = currency === "gbp" ? "£" : "$";
  return `${symbol}${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatQty(qty: number): string {
  if (qty === 0) return "0";
  if (qty < 0.001) return qty.toFixed(8);
  if (qty < 1) return qty.toFixed(5);
  return qty.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

export default function PhantomPortfolioView({
  holdings,
  coins,
  currency,
  usdToGbp,
  accountName,
}: PhantomPortfolioViewProps) {
  // Enrich user holdings
  type MaybeEnriched = EnrichedHolding | null;
  const enrichedHoldings: EnrichedHolding[] = holdings
    .map((h): MaybeEnriched => {
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

  const totalUsd = enrichedHoldings.reduce((s, e) => s + e.currentValue, 0);
  const totalPnlUsd = enrichedHoldings.reduce((s, e) => s + e.pnlUsd, 0);
  const isPnlPositive = totalPnlUsd >= 0;

  // Build the token list: user holdings + default zeros for tokens not held
  const heldIds = new Set(enrichedHoldings.map((e) => e.coinId));
  const defaultRows = DEFAULT_TOKENS
    .filter((d) => !heldIds.has(d.id))
    .map((d) => {
      const coin = coins.find((c) => c.id === d.id);
      return { coinId: d.id, qty: 0, coin: coin ?? { id: d.id, symbol: d.symbol, name: d.name, image: "", price: 0, change24h: 0 } };
    });

  return (
    <div className="flex flex-col w-full">

      {/* ── BALANCE SECTION ── */}
      <div className="px-4 pt-4 pb-3 space-y-2">
        {/* Free Wallet label */}
        <button
          type="button"
          className="flex items-center space-x-1 text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
        >
          <span>Free Wallet</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" className="opacity-60">
            <path d="M0 0l5 6 5-6H0z" />
          </svg>
        </button>

        {/* Large total balance */}
        <div className="text-[2.6rem] font-extrabold text-white leading-none tracking-tight">
          {formatValue(totalUsd, currency, usdToGbp)}
        </div>

        {/* P/L badge */}
        {enrichedHoldings.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${
              isPnlPositive
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-red-500/20 text-red-400"
            }`}>
              {isPnlPositive ? "+" : ""}
              {formatValue(Math.abs(totalPnlUsd), currency, usdToGbp)}
            </span>
            <span className="text-xs font-bold text-gray-500 bg-[#1c1c1e] px-2 py-0.5 rounded-full">24H</span>
          </div>
        )}
      </div>

      {/* ── CASH ROW ── */}
      <div className="mx-4 mb-4">
        <div className="flex items-center justify-between px-4 py-3.5 bg-[#111113] rounded-2xl border border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#1c1c1e] flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-gray-400" />
            </div>
            <span className="font-bold text-white text-sm">Cash</span>
          </div>
          <span className="font-bold text-white text-sm font-mono">$0.00</span>
        </div>
      </div>

      {/* ── TOKENS SECTION ── */}
      <div className="px-4 space-y-2">
        {/* Section Header */}
        <button
          type="button"
          className="flex items-center space-x-1 text-lg font-extrabold text-white hover:text-[#a594fd] transition-colors cursor-pointer mb-1"
        >
          <span>Tokens</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* User Holdings */}
        {enrichedHoldings.map((item) => (
          <div
            key={item.coinId}
            className="flex items-center justify-between py-3 border-b border-white/5"
          >
            {/* Left: icon + name + qty */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#1c1c1e] border border-white/10 shrink-0">
                <img
                  src={item.coin.image}
                  alt={item.coin.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/img.jpeg"; }}
                />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-extrabold text-sm text-white">{item.coin.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a594fd] fill-[#a594fd]/20 shrink-0" />
                </div>
                <div className="text-xs text-gray-500 font-semibold">
                  {formatQty(item.qty)} {item.coin.symbol}
                </div>
              </div>
            </div>

            {/* Right: value + P/L */}
            <div className="text-right">
              <div className="font-extrabold text-sm text-white font-mono">
                {formatValue(item.currentValue, currency, usdToGbp)}
              </div>
              <div className={`text-xs font-bold font-mono ${
                item.pnlUsd >= 0 ? "text-emerald-400" : "text-red-400"
              }`}>
                {item.pnlUsd >= 0 ? "+" : ""}
                {formatValue(Math.abs(item.pnlUsd), currency, usdToGbp)}
              </div>
            </div>
          </div>
        ))}

        {/* Default Zero Tokens */}
        {defaultRows.map((row) => (
          <div
            key={row.coinId}
            className="flex items-center justify-between py-3 border-b border-white/5 opacity-60"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#1c1c1e] border border-white/10 shrink-0">
                {row.coin.image ? (
                  <img
                    src={row.coin.image}
                    alt={row.coin.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/img.jpeg"; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[9px] font-bold text-gray-500">{row.coin.symbol}</span>
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-extrabold text-sm text-white">{row.coin.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a594fd] fill-[#a594fd]/20 shrink-0" />
                </div>
                <div className="text-xs text-gray-500 font-semibold">0 {row.coin.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-extrabold text-sm text-white font-mono">$0.00</div>
              <div className="text-xs font-bold font-mono text-gray-600">$0.00</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
