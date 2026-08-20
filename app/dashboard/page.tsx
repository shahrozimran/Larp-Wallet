"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Layers,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  X,
  ArrowUpRight,
  Send,
  Download,
  User,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import PortfolioCard from "@/app/components/PortfolioCard";
import AssetList from "@/app/components/AssetList";
import SendReceiveModals from "@/app/components/SendReceiveModals";

export default function DashboardPage() {
  const router = useRouter();
  const {
    user,
    profile,
    isLoggedIn,
    isLicenseActive,
    loading,
    signOut,
    updateActiveWallet,
  } = useAuth();

  const [selectedWallet, setSelectedWallet] = useState<"phantom" | "trust" | "ledger" | null>(null);
  const [activeModal, setActiveModal] = useState<"send" | "receive" | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        router.push("/login?redirect=/dashboard");
      } else if (!isLicenseActive) {
        router.push("/plans");
      }
    }
  }, [loading, isLoggedIn, isLicenseActive, router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const handleSelectWallet = async (wallet: "phantom" | "trust" | "ledger") => {
    setSelectedWallet(wallet);
    await updateActiveWallet(wallet);
    if (wallet === "phantom") {
      router.push("/phantom");
    }
  };

  if (loading || !isLoggedIn || !isLicenseActive) {
    return (
      <div className="min-h-screen bg-[#08061a] text-white flex items-center justify-center font-sans">
        <div className="flex items-center space-x-3 text-[#a78bfa]">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className="font-mono text-sm font-semibold">Verifying authorization &amp; loading...</span>
        </div>
      </div>
    );
  }

  const walletOptions = [
    {
      id: "phantom" as const,
      name: "Phantom Wallet",
      icon: "🟣",
      badge: "Solana & Memecoins",
      color: "from-[#7c5ce8] to-[#4a2db8]",
      accent: "#7c5ce8",
      desc: "Pixel-perfect Phantom interface simulation optimized for Solana & Raydium.",
    },
    {
      id: "trust" as const,
      name: "Trust Wallet",
      icon: "🛡️",
      badge: "Multi-Chain Portfolio",
      color: "from-[#2563eb] to-[#1d4ed8]",
      accent: "#3b82f6",
      desc: "Multi-chain Web3 wallet view for Ethereum, BNB Chain, Polygon & BTC.",
    },
    {
      id: "ledger" as const,
      name: "Ledger Wallet",
      icon: "⚡",
      badge: "Hardware Security",
      color: "from-[#ea580c] to-[#c2410c]",
      accent: "#f97316",
      desc: "Hardware security interface featuring interactive vault balances.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#08061a] text-white flex flex-col font-sans relative selection:bg-[#7c5ce8] selection:text-white">

      {/* Background Ambient Spotlights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#7c5ce8]/12 rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#4a2db8]/08 rounded-full blur-[200px] pointer-events-none" />

      {/* ── DASHBOARD HEADER ── */}
      <header className="sticky top-0 z-50 bg-[#08061a]/90 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-[#7c5ce8]/50 shadow-[0_0_16px_rgba(124,92,232,0.5)] group-hover:shadow-[0_0_24px_rgba(124,92,232,0.8)] transition-all">
              <img src="/img.jpeg" alt="Larp Wallet Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">
              Larp <span className="text-[#a78bfa]">Wallet</span>
            </span>
          </Link>

          {/* User Status & Logout */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-[#7c5ce8]/20 text-[#c4b5fd] font-mono uppercase text-[10px] font-bold">
                {profile?.plan_type || "Pro"}
              </span>
              <span className="text-gray-300 font-mono max-w-[150px] truncate">{user?.email}</span>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7c5ce8]/15 border border-[#7c5ce8]/30 text-xs font-mono font-bold text-[#c4b5fd]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#a78bfa]" />
            <span>Authenticated &amp; Authorized</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Select Your Wallet
          </h1>
          <p className="text-sm text-gray-400">
            Choose a wallet interface below to launch the simulator
          </p>
        </div>

        {/* ── 3 WALLET SELECTION CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {walletOptions.map((w) => {
            const isSelected = selectedWallet === w.id;
            return (
              <button
                key={w.id}
                onClick={() => handleSelectWallet(w.id)}
                className={`p-7 rounded-3xl text-left transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between space-y-6 border ${
                  isSelected
                    ? `bg-[#0e0926] border-2 border-[#7c5ce8] shadow-[0_0_35px_rgba(124,92,232,0.35)] scale-[1.02]`
                    : `glass-card-dark border-white/8 hover:border-[#7c5ce8]/40 hover:scale-[1.01]`
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{w.icon}</span>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-mono text-[#a78bfa] border border-white/5">
                      {w.badge}
                    </span>
                  </div>

                  <h2 className="font-extrabold text-xl text-white group-hover:text-[#c4b5fd] transition-colors">
                    {w.name}
                  </h2>

                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    {w.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/8 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? "text-[#c4b5fd]" : "text-gray-300 group-hover:text-white"}>
                    {isSelected ? "Active Interface" : "Launch Simulator"}
                  </span>
                  <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isSelected ? "text-[#a78bfa]" : "text-gray-400"}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* ── DEDICATED WALLET SIMULATOR VIEW (When a card is selected) ── */}
        {selectedWallet && (
          <section className="pt-8 border-t border-white/8 space-y-6 max-w-4xl mx-auto animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#a78bfa]">
                  Active Wallet View
                </span>
                <h3 className="text-2xl font-extrabold text-white capitalize">
                  {selectedWallet} Wallet
                </h3>
              </div>
              <button
                onClick={() => setSelectedWallet(null)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>

            <div className="space-y-6">
              <PortfolioCard
                onOpenSend={() => setActiveModal("send")}
                onOpenReceive={() => setActiveModal("receive")}
              />
              <AssetList
                onOpenSend={() => setActiveModal("send")}
                onOpenReceive={() => setActiveModal("receive")}
              />
            </div>
          </section>
        )}

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/8 bg-[#05040f]/80 py-8 text-xs text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-6 h-6 rounded-xl overflow-hidden border border-[#7c5ce8]/50">
              <img src="/img.jpeg" alt="Larp Wallet Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-white text-xs">LARP WALLET DASHBOARD</span>
          </Link>
          <div className="text-gray-600 font-mono text-[11px]">
            © {new Date().getFullYear()} Larp Wallet. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <SendReceiveModals
        isSendOpen={activeModal === "send"}
        isReceiveOpen={activeModal === "receive"}
        onCloseSend={() => setActiveModal(null)}
        onCloseReceive={() => setActiveModal(null)}
      />

    </div>
  );
}
