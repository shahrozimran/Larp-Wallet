"use client";

import React, { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Repeat,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "receive" | "send" | "swap" | "stake";
  title: string;
  subtitle: string;
  amount: string;
  amountUsd: string;
  timestamp: string;
  status: "completed" | "pending";
  hash: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: "tx-1",
    type: "receive",
    title: "Received ETH",
    subtitle: "From 0x4B2...9a11",
    amount: "+2.5 ETH",
    amountUsd: "+$8,625.50",
    timestamp: "10 mins ago",
    status: "completed",
    hash: "0x8f2d91a...3b92",
  },
  {
    id: "tx-2",
    type: "swap",
    title: "Swapped SOL to USDT",
    subtitle: "Uniswap v3 DEX",
    amount: "-15.0 SOL",
    amountUsd: "$2,231.25",
    timestamp: "2 hours ago",
    status: "completed",
    hash: "0x4e1a0b3...7c84",
  },
  {
    id: "tx-3",
    type: "stake",
    title: "Staking Reward Claimed",
    subtitle: "Verdant Vault APY 4.8%",
    amount: "+0.12 ETH",
    amountUsd: "+$414.02",
    timestamp: "Yesterday",
    status: "completed",
    hash: "0x91c0e81...2a5f",
  },
  {
    id: "tx-4",
    type: "send",
    title: "Sent USDT",
    subtitle: "To 0x1A4...e003",
    amount: "-500.0 USDT",
    amountUsd: "-$500.00",
    timestamp: "2 days ago",
    status: "completed",
    hash: "0x33b821a...91d2",
  },
];

export default function RecentActivity() {
  const [selectedTx, setSelectedTx] = useState<string | null>(null);

  return (
    <div className="rounded-3xl glass-card p-6 sm:p-7 border border-white/10 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base text-white">Recent Transactions</h3>
          <p className="text-[11px] text-gray-400">On-chain activity logs</p>
        </div>
        <button className="text-xs font-semibold text-[#a5b67d] hover:underline flex items-center space-x-1">
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {mockActivities.map((tx) => {
          const isPositive = tx.type === "receive" || tx.type === "stake";
          
          const iconMap = {
            receive: <ArrowDownLeft className="w-4 h-4 text-emerald-400" />,
            send: <ArrowUpRight className="w-4 h-4 text-rose-400" />,
            swap: <Repeat className="w-4 h-4 text-[#8a9a5b]" />,
            stake: <Sparkles className="w-4 h-4 text-amber-400" />,
          };

          return (
            <div
              key={tx.id}
              onClick={() => setSelectedTx(selectedTx === tx.id ? null : tx.id)}
              className="p-3.5 rounded-2xl bg-[#121814] border border-white/5 hover:border-[#8a9a5b]/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-[#8a9a5b]/20 transition-colors">
                    {iconMap[tx.type]}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white group-hover:text-[#c0d4a0] transition-colors">
                      {tx.title}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {tx.subtitle} • <span className="text-gray-500">{tx.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`font-mono font-bold text-xs ${
                      isPositive ? "text-emerald-400" : "text-gray-200"
                    }`}
                  >
                    {tx.amount}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono">
                    {tx.amountUsd}
                  </div>
                </div>
              </div>

              {/* Hash Details Dropdown */}
              {selectedTx === tx.id && (
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>Tx Hash: <span className="text-gray-200">{tx.hash}</span></span>
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center space-x-1 text-[#a5b67d] hover:underline"
                  >
                    <span>Explorer</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
