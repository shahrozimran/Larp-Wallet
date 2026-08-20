"use client";

import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  MoreVertical,
  Send,
  Download,
  Repeat,
  Sparkles,
} from "lucide-react";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  bgHex: string;
  price: number;
  change24h: number;
  balance: number;
  usdValue: number;
  category: "tokens" | "defi";
  sparkline: number[];
}

const mockAssets: Asset[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    bgHex: "#F7931A",
    price: 64280.5,
    change24h: 3.42,
    balance: 1.42,
    usdValue: 91278.31,
    category: "tokens",
    sparkline: [61000, 62100, 61800, 63400, 62900, 64280],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    bgHex: "#627EEA",
    price: 3450.2,
    change24h: 4.15,
    balance: 12.8,
    usdValue: 44162.56,
    category: "tokens",
    sparkline: [3200, 3280, 3310, 3390, 3420, 3450],
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    icon: "◎",
    bgHex: "#14F195",
    price: 148.75,
    change24h: 6.88,
    balance: 85.4,
    usdValue: 12703.25,
    category: "tokens",
    sparkline: [135, 138, 142, 140, 145, 148],
  },
  {
    id: "tether",
    name: "Tether USD",
    symbol: "USDT",
    icon: "₮",
    bgHex: "#26A17B",
    price: 1.0,
    change24h: 0.02,
    balance: 3450.0,
    usdValue: 3450.0,
    category: "tokens",
    sparkline: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    icon: "⬡",
    bgHex: "#375BD2",
    price: 18.4,
    change24h: -1.25,
    balance: 320.0,
    usdValue: 5888.0,
    category: "tokens",
    sparkline: [19.2, 19.0, 18.8, 18.5, 18.2, 18.4],
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    icon: "▲",
    bgHex: "#E84142",
    price: 28.9,
    change24h: 2.1,
    balance: 140.0,
    usdValue: 4046.0,
    category: "defi",
    sparkline: [27.0, 27.5, 28.0, 27.8, 28.5, 28.9],
  },
];

interface AssetListProps {
  onOpenSend: () => void;
  onOpenReceive: () => void;
}

export default function AssetList({ onOpenSend, onOpenReceive }: AssetListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "tokens" | "defi">("all");

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || asset.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="rounded-3xl glass-card p-6 sm:p-7 border border-white/10 space-y-6">
      
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>Your Crypto Assets</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full olive-badge font-mono">
              {mockAssets.length} Tokens
            </span>
          </h2>
          <p className="text-xs text-gray-400">
            Real-time market valuation and personal token distribution
          </p>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-[#121814] border border-white/10 text-xs">
            {(["all", "tokens", "defi"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                  activeTab === tab
                    ? "bg-[#8a9a5b] text-white shadow-[0_0_12px_rgba(138,154,91,0.4)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search token..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 rounded-xl bg-[#121814] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#8a9a5b] transition-colors w-36 sm:w-44"
            />
          </div>

        </div>
      </div>

      {/* Assets Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-white/10 pb-3">
              <th className="py-3 px-2">Asset / Symbol</th>
              <th className="py-3 px-2">Price</th>
              <th className="py-3 px-2">24h Change</th>
              <th className="py-3 px-2 hidden sm:table-cell">7D Trend</th>
              <th className="py-3 px-2 text-right">Holdings</th>
              <th className="py-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => {
                const isPositive = asset.change24h >= 0;
                return (
                  <tr
                    key={asset.id}
                    className="group hover:bg-[#8a9a5b]/10 transition-colors"
                  >
                    {/* Token Icon & Name */}
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md text-base"
                          style={{ backgroundColor: asset.bgHex }}
                        >
                          {asset.icon}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm group-hover:text-[#c0d4a0] transition-colors">
                            {asset.name}
                          </div>
                          <div className="text-xs font-mono text-gray-400">
                            {asset.symbol}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-2 font-mono text-sm font-semibold text-gray-200">
                      ${asset.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>

                    {/* 24h Change */}
                    <td className="py-4 px-2">
                      <div
                        className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-xs font-semibold ${
                          isPositive
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                            : "bg-rose-500/15 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>
                          {isPositive ? "+" : ""}
                          {asset.change24h}%
                        </span>
                      </div>
                    </td>

                    {/* Sparkline Graphic */}
                    <td className="py-4 px-2 hidden sm:table-cell">
                      <svg className="w-24 h-7 stroke-current" viewBox="0 0 100 30">
                        <polyline
                          fill="none"
                          stroke={isPositive ? "#8a9a5b" : "#f43f5e"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={asset.sparkline
                            .map(
                              (val, idx) =>
                                `${(idx / (asset.sparkline.length - 1)) * 100},${
                                  30 -
                                  ((val - Math.min(...asset.sparkline)) /
                                    (Math.max(...asset.sparkline) -
                                      Math.min(...asset.sparkline) || 1)) *
                                    24
                                }`
                            )
                            .join(" ")}
                        />
                      </svg>
                    </td>

                    {/* User Holdings */}
                    <td className="py-4 px-2 text-right">
                      <div className="font-bold text-white text-sm font-mono">
                        ${asset.usdValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        {asset.balance} {asset.symbol}
                      </div>
                    </td>

                    {/* Quick Action */}
                    <td className="py-4 px-2 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={onOpenSend}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          title="Send"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={onOpenReceive}
                          className="p-1.5 rounded-lg hover:bg-[#8a9a5b]/20 text-[#8a9a5b] hover:text-[#c0d4a0] transition-colors"
                          title="Receive"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400 text-xs">
                  No assets found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
