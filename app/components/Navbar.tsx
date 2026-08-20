"use client";

import React, { useState } from "react";
import {
  Wallet,
  Copy,
  Check,
  QrCode,
  Bell,
  ChevronDown,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

interface NavbarProps {
  onOpenReceive: () => void;
}

export default function Navbar({ onOpenReceive }: NavbarProps) {
  const [copied, setCopied] = useState(false);
  const [networkDropdown, setNetworkDropdown] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("Ethereum Mainnet");
  const walletAddress = "0x7F2d98a1C0492E83b4A902c3D81191a7B3B43B9a";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const networks = [
    { name: "Ethereum Mainnet", icon: "Ξ", color: "bg-emerald-500" },
    { name: "Polygon Mainnet", icon: "⬡", color: "bg-purple-500" },
    { name: "Arbitrum One", icon: "🔷", color: "bg-blue-500" },
    { name: "Optimism", icon: "🔴", color: "bg-red-500" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 glass-card bg-opacity-80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#8a9a5b] to-[#455227] p-[1px] shadow-[0_0_18px_rgba(138,154,91,0.3)]">
            <div className="w-full h-full bg-[#0d120e] rounded-[11px] flex items-center justify-center">
              <Wallet className="w-5 h-5 text-[#a5b67d]" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#8a9a5b] rounded-full border-2 border-[#090c0a] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-xl tracking-tight text-white">
                VERDANT
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-mono font-medium olive-badge">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-[#8a9a5b] tracking-wider uppercase font-semibold">
              Crypto Vault
            </p>
          </div>
        </div>

        {/* Center / Network Switcher & Quick Search Status */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setNetworkDropdown(!networkDropdown)}
              className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-xl bg-[#141b16] border border-white/10 hover:border-[#8a9a5b]/40 transition-all text-xs font-medium text-gray-200"
            >
              <span className="w-2 h-2 rounded-full bg-[#8a9a5b] animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#8a9a5b] absolute" />
              <span className="ml-1">{selectedNetwork}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {networkDropdown && (
              <div className="absolute top-full mt-2 w-52 rounded-xl bg-[#121814] border border-[#8a9a5b]/30 shadow-2xl p-1.5 z-50">
                <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                  Select Network
                </div>
                {networks.map((net) => (
                  <button
                    key={net.name}
                    onClick={() => {
                      setSelectedNetwork(net.name);
                      setNetworkDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedNetwork === net.name
                        ? "bg-[#8a9a5b]/20 text-[#c0d4a0]"
                        : "text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{net.icon}</span>
                      <span>{net.name}</span>
                    </div>
                    {selectedNetwork === net.name && (
                      <Check className="w-3.5 h-3.5 text-[#8a9a5b]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/5 text-[11px] text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8a9a5b]" />
            <span>Vault Protected</span>
          </div>
        </div>

        {/* Right Section: Address Pill, QR Code & Actions */}
        <div className="flex items-center space-x-3">
          
          {/* Address Copy Pill */}
          <div className="flex items-center bg-[#131a15] border border-white/10 rounded-xl p-1">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all text-xs font-mono text-gray-200"
              title="Copy Address"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>0x7F2d...3B9a</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[#8a9a5b]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
              )}
            </button>
            <button
              onClick={onOpenReceive}
              className="p-1.5 rounded-lg hover:bg-[#8a9a5b]/20 text-gray-300 hover:text-[#c0d4a0] transition-colors"
              title="Show Address QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>

          {/* Notifications Button */}
          <button className="relative p-2.5 rounded-xl bg-[#131a15] border border-white/10 hover:border-[#8a9a5b]/40 text-gray-300 hover:text-white transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#8a9a5b] rounded-full ring-2 ring-[#090c0a]" />
          </button>

          {/* Profile Avatar */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3a4726] to-[#8a9a5b] p-[1.5px] cursor-pointer hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#101511] rounded-[9.5px] flex items-center justify-center text-xs font-bold text-[#c0d4a0]">
              VP
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
