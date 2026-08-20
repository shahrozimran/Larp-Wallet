"use client";

import React, { useState } from "react";
import {
  ArrowUpDown,
  CheckCircle2,
  ChevronDown,
  Check,
  Search,
} from "lucide-react";
import { Holding } from "./PhantomPortfolioView";
import PhantomTokenPickerModal from "./PhantomTokenPickerModal";

interface CoinToken {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  marketCap: number;
  change24h: number;
}

interface PhantomTradeViewProps {
  coins: CoinToken[];
  holdings: Holding[];
  currency: "usd" | "gbp";
  usdToGbp: number;
  onAddHolding: (coinId: string, qty: number) => void;
  onUpdateHoldings: (newHoldings: Holding[]) => void;
}

function formatPrice(price: number): string {
  if (price >= 1000)
    return `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(4)}`;
  if (price >= 0.01) return `$${price.toFixed(5)}`;
  return `$${price.toFixed(8)}`;
}

function formatMarketCap(mc: number): string {
  if (mc >= 1e9) return `$${(mc / 1e9).toFixed(1)}B MC`;
  if (mc >= 1e6) return `$${(mc / 1e6).toFixed(0)}M MC`;
  return `$${(mc / 1e3).toFixed(0)}K MC`;
}

export default function PhantomTradeView({
  coins,
  holdings,
  currency,
  usdToGbp,
  onAddHolding,
  onUpdateHoldings,
}: PhantomTradeViewProps) {
  // Default tokens: Pay SOL, Receive USDC or FART
  const solCoin = coins.find((c) => c.symbol === "SOL") || coins[0] || {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    image: "",
    price: 180,
    marketCap: 80e9,
    change24h: 2.5,
  };

  const usdcCoin = coins.find((c) => c.symbol === "USDC" || c.symbol === "ETH" || c.symbol === "FART") || coins[1] || {
    id: "usd-coin",
    symbol: "USDC",
    name: "USDC",
    image: "",
    price: 1,
    marketCap: 35e9,
    change24h: 0.01,
  };

  const [payToken, setPayToken] = useState<CoinToken>(solCoin);
  const [receiveToken, setReceiveToken] = useState<CoinToken>(usdcCoin);
  const [payAmount, setPayAmount] = useState("");
  const [pickingTarget, setPickingTarget] = useState<"pay" | "receive" | null>(null);
  const [marketTab, setMarketTab] = useState<"Tokens" | "Perps">("Tokens");
  const [swapSuccess, setSwapSuccess] = useState(false);

  const holdingsMap = new Map(holdings.map((h) => [h.coinId, h.qty]));
  const payBalance = holdingsMap.get(payToken.id) || 0;
  const receiveBalance = holdingsMap.get(receiveToken.id) || 0;

  const payNum = parseFloat(payAmount) || 0;
  // Calculate output amount based on ratio
  const receiveNum =
    payNum > 0 && payToken.price > 0 && receiveToken.price > 0
      ? (payNum * payToken.price) / receiveToken.price
      : 0;

  const payUsdValue = payNum * payToken.price;
  const receiveUsdValue = receiveNum * receiveToken.price;

  const handleFlip = () => {
    setPayToken(receiveToken);
    setReceiveToken(payToken);
    if (receiveNum > 0) {
      setPayAmount(receiveNum.toString());
    }
  };

  const handleSwap = () => {
    if (payNum <= 0) return;
    if (payNum > payBalance && payBalance > 0) {
      alert(`Insufficient ${payToken.symbol} balance.`);
      return;
    }

    // Perform swap in holdings state
    const currentPayQty = holdingsMap.get(payToken.id) || 0;
    const currentRecQty = holdingsMap.get(receiveToken.id) || 0;

    const newPayQty = Math.max(0, currentPayQty - payNum);
    const newRecQty = currentRecQty + receiveNum;

    let updated = holdings.map((h) => {
      if (h.coinId === payToken.id) {
        return { ...h, qty: newPayQty };
      }
      if (h.coinId === receiveToken.id) {
        return { ...h, qty: newRecQty, avgBuyPrice: receiveToken.price };
      }
      return h;
    });

    // If receiveToken wasn't held yet, add it
    if (!holdingsMap.has(receiveToken.id)) {
      updated.push({
        coinId: receiveToken.id,
        qty: receiveNum,
        avgBuyPrice: receiveToken.price,
      });
    }

    // Filter out zero balance holdings
    updated = updated.filter((h) => h.qty > 0);

    onUpdateHoldings(updated);
    setSwapSuccess(true);
    setPayAmount("");

    setTimeout(() => {
      setSwapSuccess(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col w-full space-y-6 px-4 pt-2">
      {/* ── SWAP CARDS CONTAINER ── */}
      <div className="relative space-y-2">
        {/* YOU PAY CARD */}
        <div className="bg-[#111113] rounded-2xl border border-white/5 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
            <span>You Pay</span>
          </div>

          <div className="flex items-center justify-between">
            {/* Input */}
            <div className="flex-1 min-w-0 pr-3">
              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent text-3xl font-extrabold text-white placeholder-gray-600 focus:outline-none font-mono"
              />
              <div className="text-xs font-semibold text-gray-500 font-mono mt-1">
                ${payUsdValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            {/* Token Selector Pill */}
            <button
              type="button"
              onClick={() => setPickingTarget("pay")}
              className="flex items-center space-x-2 px-3 py-2 rounded-full bg-[#1c1c1e] hover:bg-[#2c2c2e] border border-white/5 transition-colors cursor-pointer shrink-0"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-[#2c2c2e] shrink-0">
                <img
                  src={payToken.image}
                  alt={payToken.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/img.jpeg";
                  }}
                />
              </div>
              <span className="font-extrabold text-sm text-white">
                {payToken.symbol}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="flex justify-end">
            <span className="text-xs font-semibold text-gray-500">
              {payBalance.toLocaleString()} {payToken.symbol}
            </span>
          </div>
        </div>

        {/* CENTER FLIP BUTTON */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <button
            type="button"
            onClick={handleFlip}
            className="w-10 h-10 rounded-full bg-[#1c1c1e] hover:bg-[#2c2c2e] border-2 border-[#000000] text-[#a594fd] flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <ArrowUpDown className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* YOU RECEIVE CARD */}
        <div className="bg-[#111113] rounded-2xl border border-white/5 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
            <span>You Receive</span>
          </div>

          <div className="flex items-center justify-between">
            {/* Display output */}
            <div className="flex-1 min-w-0 pr-3">
              <div className="text-3xl font-extrabold text-white font-mono truncate">
                {receiveNum > 0
                  ? receiveNum < 0.0001
                    ? receiveNum.toFixed(6)
                    : receiveNum.toLocaleString("en-US", { maximumFractionDigits: 4 })
                  : "0"}
              </div>
              <div className="text-xs font-semibold text-gray-500 font-mono mt-1">
                ${receiveUsdValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            {/* Token Selector Pill */}
            <button
              type="button"
              onClick={() => setPickingTarget("receive")}
              className="flex items-center space-x-2 px-3 py-2 rounded-full bg-[#1c1c1e] hover:bg-[#2c2c2e] border border-white/5 transition-colors cursor-pointer shrink-0"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-[#2c2c2e] shrink-0">
                <img
                  src={receiveToken.image}
                  alt={receiveToken.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/img.jpeg";
                  }}
                />
              </div>
              <span className="font-extrabold text-sm text-white">
                {receiveToken.symbol}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="flex justify-end">
            <span className="text-xs font-semibold text-gray-500">
              {receiveBalance.toLocaleString()} {receiveToken.symbol}
            </span>
          </div>
        </div>
      </div>

      {/* ── SWAP ACTION BUTTON ── */}
      <button
        type="button"
        onClick={handleSwap}
        disabled={payNum <= 0}
        className={`w-full py-4 rounded-2xl font-extrabold text-base transition-all flex items-center justify-center space-x-2 cursor-pointer ${
          swapSuccess
            ? "bg-emerald-500 text-white"
            : payNum > 0
            ? "bg-[#a594fd] hover:bg-[#b6a7ff] text-black shadow-[0_4px_20px_rgba(165,148,253,0.3)] active:scale-[0.99]"
            : "bg-[#1c1c1e] text-gray-600 cursor-not-allowed"
        }`}
      >
        {swapSuccess ? (
          <>
            <Check className="w-5 h-5" />
            <span>Swapped Successfully!</span>
          </>
        ) : (
          <span>{payNum > 0 ? "Review Order" : "Enter an Amount"}</span>
        )}
      </button>

      {/* ── MARKET TOKENS / PERPS SECTION ── */}
      <div className="space-y-4 pt-4">
        {/* Tokens / Perps Sub-tabs */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setMarketTab("Tokens")}
              className={`text-xl font-extrabold transition-colors cursor-pointer ${
                marketTab === "Tokens"
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Tokens
            </button>
            <button
              type="button"
              onClick={() => setMarketTab("Perps")}
              className={`text-xl font-extrabold transition-colors cursor-pointer ${
                marketTab === "Perps"
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Perps
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#1c1c1e] hover:bg-[#2c2c2e] text-xs font-bold text-gray-300 transition-colors cursor-pointer"
          >
            <span>Rank</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            type="button"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#1c1c1e] hover:bg-[#2c2c2e] text-xs font-bold text-gray-300 transition-colors cursor-pointer"
          >
            <span>Solana</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            type="button"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#1c1c1e] hover:bg-[#2c2c2e] text-xs font-bold text-gray-300 transition-colors cursor-pointer"
          >
            <span>24h</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>

        {/* Market Token List */}
        <div className="space-y-2">
          {coins.map((coin, index) => {
            const isPositive = coin.change24h >= 0;
            return (
              <div
                key={coin.id}
                onClick={() => {
                  setReceiveToken(coin);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#09090b] hover:bg-[#0f0f12] border border-white/5 transition-all cursor-pointer group"
              >
                {/* Rank + Icon + Info */}
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

                {/* Price & Change */}
                <div className="text-right">
                  <div className="font-extrabold text-sm text-white font-mono">
                    {formatPrice(coin.price)}
                  </div>
                  <div
                    className={`text-xs font-bold font-mono ${
                      isPositive ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {coin.change24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TOKEN PICKER MODAL */}
      <PhantomTokenPickerModal
        isOpen={pickingTarget !== null}
        onClose={() => setPickingTarget(null)}
        coins={coins}
        holdings={holdings}
        onSelectToken={(selected) => {
          if (pickingTarget === "pay") {
            setPayToken(selected);
          } else {
            setReceiveToken(selected);
          }
        }}
      />
    </div>
  );
}
