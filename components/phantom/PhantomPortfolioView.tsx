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

// Default tokens shown when portfolio is empty
const DEFAULT_TOKENS = [
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
];

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
  accountName = "Konto 1",
}: PhantomPortfolioViewProps) {

  // Enrich user holdings dynamically with live coin prices
  const enrichedHoldings: EnrichedHolding[] = holdings
    .map((h) => {
      const coin = coins.find((c) => c.id === h.coinId) || {
        id: h.coinId,
        symbol: h.coinId.toUpperCase(),
        name: h.coinId.charAt(0).toUpperCase() + h.coinId.slice(1),
        image: "",
        price: h.avgBuyPrice || 0,
        change24h: 0,
      };
      const currentValue = h.qty * coin.price;
      const costBasis = h.qty * h.avgBuyPrice;
      const pnlUsd = currentValue - costBasis;
      const pnlPct = costBasis > 0 ? (pnlUsd / costBasis) * 100 : 0;
      return { ...h, coin, currentValue, costBasis, pnlUsd, pnlPct };
    })
    .sort((a, b) => b.currentValue - a.currentValue);

  // Total balance & total PnL calculated dynamically
  const totalUsd = enrichedHoldings.reduce((s, e) => s + e.currentValue, 0);
  const totalCostBasis = enrichedHoldings.reduce((s, e) => s + e.costBasis, 0);
  const totalPnlUsd = totalUsd - totalCostBasis;
  const totalPnlPct = totalCostBasis > 0 ? (totalPnlUsd / totalCostBasis) * 100 : 0;
  const isPnlPositive = totalPnlUsd >= 0;

  // Default zero rows if no user holdings exist
  const heldIds = new Set(enrichedHoldings.map((e) => e.coinId));
  const defaultRows = DEFAULT_TOKENS.filter((d) => !heldIds.has(d.id)).map((d) => {
    const coin = coins.find((c) => c.id === d.id);
    return {
      coinId: d.id,
      qty: 0,
      coin: coin ?? { id: d.id, symbol: d.symbol, name: d.name, image: "", price: 0, change24h: 0 },
    };
  });

  // Perps market data dynamically fetched from live coins or default top futures
  const btcCoin = coins.find((c) => c.id === "bitcoin");
  const ethCoin = coins.find((c) => c.id === "ethereum");
  const btcChange = btcCoin ? btcCoin.change24h : 6.28;
  const ethChange = ethCoin ? ethCoin.change24h : 10.93;

  return (
    <div className="flex flex-col w-full px-4 pt-3 space-y-6">

      {/* ── ACCOUNT SELECTOR & DYNAMIC BALANCE SECTION ── */}
      <div className="space-y-1">
        {/* Account Selector */}
        <button
          type="button"
          className="flex items-center space-x-1 text-sm font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <span>{accountName || "Konto 1"}</span>
          <ChevronDown className="w-4 h-4 text-gray-300 stroke-[2.5]" />
        </button>

        {/* Dynamic Balance */}
        <div className="text-[3.1rem] font-extrabold text-white leading-tight tracking-tight font-sans">
          {formatValue(totalUsd, currency, usdToGbp)}
        </div>

        {/* Dynamic PnL Indicator Row */}
        {enrichedHoldings.length > 0 ? (
          <div className="flex items-center space-x-2 pt-0.5">
            <span className={`text-base font-extrabold ${isPnlPositive ? "text-[#10b981]" : "text-[#ef4444]"}`}>
              {isPnlPositive ? "+" : "-"}{formatValue(Math.abs(totalPnlUsd), currency, usdToGbp)}
            </span>
            <span className={`font-black text-xs px-2.5 py-0.5 rounded-full tracking-tight ${
              isPnlPositive ? "bg-[#10b981] text-[#000000]" : "bg-[#ef4444] text-white"
            }`}>
              {isPnlPositive ? "+" : ""}{totalPnlPct.toFixed(2)}%
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 pt-0.5">
            <span className="text-base font-extrabold text-[#10b981]">+$0.00</span>
            <span className="bg-[#10b981] text-[#000000] font-black text-xs px-2.5 py-0.5 rounded-full tracking-tight">+0.00%</span>
          </div>
        )}
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

        {/* Token Cards List */}
        <div className="space-y-2.5">
          
          {/* User Active Holdings */}
          {enrichedHoldings.map((item) => {
            const isPos = item.pnlUsd >= 0;
            return (
              <div
                key={item.coinId}
                className="flex items-center justify-between p-4 bg-[#18181b] hover:bg-[#202024] rounded-2xl border border-white/5 transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3.5">
                  {/* Coin Avatar */}
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-[#27272a] border border-white/10 flex items-center justify-center shrink-0">
                    {item.coin.image ? (
                      <img
                        src={item.coin.image}
                        alt={item.coin.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="font-black text-xs text-white">{item.coin.symbol.slice(0, 3)}</span>
                    )}
                  </div>

                  <div>
                    <div className="font-extrabold text-base text-white group-hover:text-[#beacff] transition-colors">
                      {item.coin.name}
                    </div>
                    <div className="text-sm font-semibold text-gray-400">
                      {formatQty(item.qty)} {item.coin.symbol}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-base text-white font-mono">
                    {formatValue(item.currentValue, currency, usdToGbp)}
                  </div>
                  <div className={`text-xs font-extrabold font-mono ${isPos ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                    {isPos ? "+" : "-"}{formatValue(Math.abs(item.pnlUsd), currency, usdToGbp)}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Default Rows if User Has No Holdings */}
          {enrichedHoldings.length === 0 &&
            defaultRows.map((row) => (
              <div
                key={row.coinId}
                className="flex items-center justify-between p-4 bg-[#18181b] hover:bg-[#202024] rounded-2xl border border-white/5 transition-all cursor-pointer opacity-80"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-[#27272a] border border-white/10 flex items-center justify-center shrink-0">
                    {row.coin.image ? (
                      <img
                        src={row.coin.image}
                        alt={row.coin.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-black text-xs text-white">{row.coin.symbol}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-extrabold text-base text-white">{row.coin.name}</div>
                    <div className="text-sm font-semibold text-gray-400">0 {row.coin.symbol}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-base text-white font-mono">$0.00</div>
                  <div className="text-xs font-extrabold text-gray-500 font-mono">$0.00</div>
                </div>
              </div>
            ))}

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
            <div className="w-10 h-10 rounded-full bg-[#f7931a] flex items-center justify-center text-white font-black text-lg shadow-md shrink-0">
              ₿
            </div>
            <div className="flex items-center space-x-1.5 pt-2">
              <span className="font-extrabold text-base text-white">BTC</span>
              <span className="bg-[#27272a] text-gray-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                40x
              </span>
            </div>
            <div className={`text-base font-extrabold ${btcChange >= 0 ? "text-[#10b981]" : "text-[#ef4444]"}`}>
              {btcChange >= 0 ? "+" : ""}{btcChange.toFixed(2)}%
            </div>
          </div>

          {/* ETH Card */}
          <div className="w-36 h-36 rounded-2xl bg-[#18181b] hover:bg-[#202024] p-4 border border-white/5 flex flex-col justify-between shrink-0 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-[#282a36] border border-white/10 flex items-center justify-center text-teal-300 font-extrabold text-base shadow-md shrink-0">
              ◆
            </div>
            <div className="flex items-center space-x-1.5 pt-2">
              <span className="font-extrabold text-base text-white">ETH</span>
              <span className="bg-[#27272a] text-gray-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                25x
              </span>
            </div>
            <div className={`text-base font-extrabold ${ethChange >= 0 ? "text-[#10b981]" : "text-[#ef4444]"}`}>
              {ethChange >= 0 ? "+" : ""}{ethChange.toFixed(2)}%
            </div>
          </div>

          {/* HY Card */}
          <div className="w-36 h-36 rounded-2xl bg-[#18181b] hover:bg-[#202024] p-4 border border-white/5 flex flex-col justify-between shrink-0 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-[#14262b] border border-[#20ded3]/30 flex items-center justify-center text-[#20ded3] font-black text-sm shadow-md shrink-0">
              HY
            </div>
            <div className="flex items-center space-x-1.5 pt-2">
              <span className="font-extrabold text-base text-white">HY...</span>
            </div>
            <div className="text-base font-extrabold text-[#10b981]">
              +3...
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
