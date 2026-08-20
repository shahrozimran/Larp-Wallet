"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Key,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Check,
  UserCheck,
} from "lucide-react";
import LoginModal from "@/components/LoginModal";
import CryptoPaymentModal, { SelectedPlan } from "@/components/CryptoPaymentModal";
import { useAuth } from "@/context/AuthContext";

export default function PlansPage() {
  const router = useRouter();
  const {
    user,
    profile,
    isLoggedIn,
    isLicenseActive,
    loading,
    activateLicense,
    signOut,
  } = useAuth();

  const [licenseKey, setLicenseKey] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [pendingPlan, setPendingPlan] = useState<SelectedPlan | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [activationError, setActivationError] = useState<string | null>(null);
  const [activationSuccess, setActivationSuccess] = useState<string | null>(null);

  const handleBuyClick = (plan: SelectedPlan) => {
    if (!isLoggedIn) {
      setPendingPlan(plan);
      setIsLoginOpen(true);
    } else {
      setSelectedPlan(plan);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    if (pendingPlan) {
      setSelectedPlan(pendingPlan);
      setPendingPlan(null);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const handleActivateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }

    setActivationError(null);
    setActivationSuccess(null);
    setIsActivating(true);

    const keyToUse = licenseKey.trim() || "LRP-9814-PRO-2026";
    const result = await activateLicense(keyToUse);

    setIsActivating(false);

    if (result.success) {
      setActivationSuccess("License activated successfully! Redirecting to Dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      setActivationError(result.message || "Failed to activate license key.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08061a] text-white flex items-center justify-center font-sans">
        <div className="flex items-center space-x-3 text-[#a78bfa]">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className="font-mono text-sm font-semibold">Loading membership data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08061a] text-white flex flex-col font-sans relative selection:bg-[#7c5ce8] selection:text-white">

      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#7c5ce8]/12 rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#4a2db8]/08 rounded-full blur-[200px] pointer-events-none" />

      {/* HEADER BAR */}
      <header className="sticky top-0 z-50 bg-[#08061a]/90 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-[#7c5ce8]/50 shadow-[0_0_16px_rgba(124,92,232,0.5)] group-hover:shadow-[0_0_24px_rgba(124,92,232,0.8)] transition-all">
              <img src="/img.jpeg" alt="Larp Wallet Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">
              Larp <span className="text-[#a78bfa]">Wallet</span>
            </span>
          </Link>

          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                  <UserCheck className="w-3.5 h-3.5 text-[#a78bfa]" />
                  <span className="max-w-[140px] truncate">{user?.email}</span>
                </div>

                {isLicenseActive && (
                  <Link
                    href="/dashboard"
                    className="px-4 py-1.5 rounded-full btn-hero-primary text-xs font-bold tracking-wide transition-all shadow-md"
                  >
                    Go to Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-4 py-1.5 rounded-full btn-nav-login text-xs font-bold tracking-wide flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center space-y-10">

        {/* Active License Banner if already active */}
        {isLicenseActive && (
          <div className="w-full p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-emerald-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white">Active License Detected</span> (
                <span className="capitalize text-emerald-300">{profile?.plan_type || "Pro"}</span> Plan)
                <p className="text-xs text-gray-300">
                  Key: <span className="font-mono text-emerald-300">{profile?.license_key}</span>
                </p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl btn-hero-primary text-xs font-bold inline-flex items-center space-x-1.5 shrink-0"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Header Title */}
        <div className="text-center space-y-2 max-w-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#a78bfa]">
            Membership Access
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Choose Your Access Option
          </h1>
          <p className="text-sm text-gray-400">
            Select a plan to purchase below or enter an existing license key to unlock your wallets.
          </p>
        </div>

        {/* ── SECTION 1: ALL 3 PLANS TO BUY ── */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Select a Plan to Buy
            </h2>
            <span className="text-xs text-[#a78bfa] font-mono font-bold">50% Regional Discount Applied</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* TIER 1: STARTER */}
            <div className="p-7 rounded-3xl glass-card-dark border border-white/10 hover:border-[#7c5ce8]/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  STARTER
                </span>
                <div className="flex items-baseline space-x-2 pt-2">
                  <span className="text-gray-500 font-mono text-lg line-through">$30</span>
                  <span className="text-4xl font-extrabold text-white font-mono">$15</span>
                </div>
                <div className="text-xs text-[#a78bfa] font-mono font-bold">7 days access</div>
                <p className="text-xs text-gray-400 leading-relaxed pt-1">
                  Ideal for quick simulator testing and single video production.
                </p>
              </div>

              <button
                onClick={() => handleBuyClick({ name: "Starter Plan", price: "$15", duration: "7 days access" })}
                className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Buy Starter</span>
                <ArrowRight className="w-4 h-4 text-[#a78bfa]" />
              </button>
            </div>

            {/* TIER 2: MOST POPULAR */}
            <div className="p-7 rounded-3xl bg-[#0e0926] border-2 border-[#7c5ce8] shadow-[0_0_35px_rgba(124,92,232,0.35)] flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#7c5ce8] text-[9px] font-extrabold text-white uppercase tracking-widest">
                MOST POPULAR
              </div>

              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-[#7c5ce8]/20 border border-[#7c5ce8]/40 text-[10px] font-mono font-bold text-[#c4b5fd] uppercase tracking-widest inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#a78bfa]" /> PRO CREATOR
                </span>
                <div className="flex items-baseline space-x-2 pt-2">
                  <span className="text-gray-500 font-mono text-lg line-through">$100</span>
                  <span className="text-4xl font-extrabold text-white font-mono">$45</span>
                </div>
                <div className="text-xs text-[#a78bfa] font-mono font-bold">1 month access</div>
                <p className="text-xs text-gray-300 leading-relaxed pt-1">
                  Full access for content creators, streamers and video editors.
                </p>
              </div>

              <button
                onClick={() => handleBuyClick({ name: "Pro Creator Plan", price: "$45", duration: "1 month access" })}
                className="w-full py-3 px-4 rounded-xl btn-hero-primary font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg"
              >
                <span>Buy Pro Creator</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* TIER 3: BEST VALUE */}
            <div className="p-7 rounded-3xl glass-card-dark border border-white/10 hover:border-[#7c5ce8]/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  BEST VALUE
                </span>
                <div className="flex items-baseline space-x-2 pt-2">
                  <span className="text-gray-500 font-mono text-lg line-through">$300</span>
                  <span className="text-4xl font-extrabold text-white font-mono">$200</span>
                </div>
                <div className="text-xs text-[#a78bfa] font-mono font-bold">Lifetime access</div>
                <p className="text-xs text-gray-400 leading-relaxed pt-1">
                  Unlimited lifetime access to all 3 wallets (Phantom, Trust, Ledger).
                </p>
              </div>

              <button
                onClick={() => handleBuyClick({ name: "Lifetime Access Plan", price: "$200", duration: "Unlimited lifetime access" })}
                className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Buy Lifetime</span>
                <ArrowRight className="w-4 h-4 text-[#a78bfa]" />
              </button>
            </div>

          </div>
        </div>

        {/* DIVIDER */}
        <div className="relative flex items-center justify-center w-full my-4">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#08061a] px-4 text-xs font-mono font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap">
            Already Have A License Key?
          </span>
          <div className="border-t border-white/10 w-full" />
        </div>

        {/* ── SECTION 2: LICENSE KEY ACTIVATION FORM ── */}
        <form onSubmit={handleActivateKey} className="w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-card-dark border border-white/10 space-y-5">
          
          {activationError && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-start space-x-2.5 text-xs text-red-300 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{activationError}</span>
            </div>
          )}

          {activationSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-start space-x-2.5 text-xs text-emerald-300 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{activationSuccess}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Enter License Key
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="LRP-9814-PRO-2026"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0d0a24] border border-white/10 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#7c5ce8] transition-colors uppercase"
              />
              <Key className="w-4 h-4 text-gray-500 absolute right-4 top-4" />
            </div>
            <p className="text-[11px] text-gray-500 mt-1.5 font-mono">
              Tip: You can use <span className="text-[#a78bfa]">LRP-9814-PRO-2026</span> or <span className="text-[#a78bfa]">LRP-STARTER-2026</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={isActivating}
            className="w-full py-3.5 px-4 rounded-xl btn-hero-primary font-bold text-sm tracking-wide cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-60"
          >
            {isActivating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Verifying with Supabase...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Activate Key &amp; Open Wallets</span>
              </>
            )}
          </button>
        </form>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/8 bg-[#05040f]/80 py-8 text-xs text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-6 h-6 rounded-xl overflow-hidden border border-[#7c5ce8]/50">
              <img src="/img.jpeg" alt="Larp Wallet Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-white text-xs">LARP WALLET</span>
          </Link>
          <div className="text-gray-600 font-mono text-[11px]">
            © {new Date().getFullYear()} Larp Wallet. All rights reserved.
          </div>
        </div>
      </footer>

      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* CRYPTO PAYMENT CHECKOUT MODAL */}
      <CryptoPaymentModal
        plan={selectedPlan}
        onClose={() => setSelectedPlan(null)}
        onSuccess={() => {
          setSelectedPlan(null);
          router.push("/dashboard");
        }}
      />

    </div>
  );
}
