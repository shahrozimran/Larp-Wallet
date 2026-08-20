"use client";

import React from "react";
import { ShieldCheck, Lock, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function YieldSecurityBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Security Vault Health Card */}
      <div className="rounded-3xl glass-card p-6 border border-white/10 relative overflow-hidden flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Vault Security Status</h4>
              <p className="text-[11px] text-gray-400">100% Protected & Encrypted</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            HEALTHY
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#121814]">
            <span className="text-gray-300">Hardware Key (Ledger Nano)</span>
            <span className="text-[#a5b67d] font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Connected</span>
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#121814]">
            <span className="text-gray-300">Multi-Signature Safe</span>
            <span className="text-[#a5b67d] font-semibold">2 of 3 Active</span>
          </div>
        </div>
      </div>

      {/* Yield Staking Highlight Banner */}
      <div className="rounded-3xl glass-card-olive p-6 border border-[#8a9a5b]/40 relative overflow-hidden flex flex-col justify-between space-y-4 shadow-[0_0_25px_rgba(138,154,91,0.15)]">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#8a9a5b]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 text-[#c0d4a0]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">ETH Liquid Staking</h4>
              <p className="text-[11px] text-[#c0d4a0]">Earn native yield automatically</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#8a9a5b] text-white">
            6.4% APY
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] text-gray-300">Your Current Yield</div>
            <div className="text-sm font-bold text-white font-mono">+$414.02 / month</div>
          </div>

          <button className="px-4 py-2 rounded-xl olive-btn-primary flex items-center space-x-1.5 text-xs font-bold group">
            <span>Stake ETH</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
