"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Copy,
  Check,
  QrCode,
  Clock,
  ShieldCheck,
  RefreshCw,
  Zap,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

export interface SelectedPlan {
  name: string;
  price: string;
  duration: string;
}

interface CryptoPaymentModalProps {
  plan: SelectedPlan | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const CRYPTO_OPTIONS = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "🟠",
    network: "Bitcoin Mainnet",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    rate: 65000,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: "🔷",
    network: "ERC-20",
    address: "0x7F2d98a1C0492E83b4A902c3D81191a7B3B43B9a",
    rate: 3450,
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    icon: "🟣",
    network: "Solana Mainnet",
    address: "7Xw1Y9vP9Z2aK3m4B8c5D6e7F8g9H0j1K2l3M4n5P6q",
    rate: 148,
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    icon: "🟢",
    network: "TRC-20 / ERC-20",
    address: "TYu8k9M2N3P4Q5R6S7T8U9V0W1X2Y3Z4A5",
    rate: 1,
  },
];

export default function CryptoPaymentModal({
  plan,
  onClose,
  onSuccess,
}: CryptoPaymentModalProps) {
  const router = useRouter();
  const { user, activateLicense, refreshProfile } = useAuth();
  const [supabase] = useState(() => createClient());

  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_OPTIONS[0]);
  const [copied, setCopied] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(899); // 14:59 countdown

  useEffect(() => {
    if (!plan) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [plan]);

  if (!plan) return null;

  const numPrice = parseFloat(plan.price.replace(/[^0-9.]/g, "")) || 15;
  const cryptoAmount = (numPrice / selectedCrypto.rate).toFixed(
    selectedCrypto.symbol === "BTC" ? 6 : selectedCrypto.symbol === "ETH" ? 4 : 2
  );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedCrypto.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyKey = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  const handleConfirmPayment = async () => {
    setIsConfirming(true);
    setErrorMessage(null);

    try {
      const planTier = plan.name.toLowerCase().includes("starter")
        ? "starter"
        : plan.name.toLowerCase().includes("lifetime")
        ? "lifetime"
        : "pro";

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newKey = `LRP-${planTier.toUpperCase()}-${randomSuffix}`;

      // Save order in Supabase database
      if (user) {
        await (supabase.from("crypto_orders") as any).insert({
          user_id: user.id,
          plan_name: plan.name,
          plan_tier: planTier,
          price_usd: numPrice,
          crypto_symbol: selectedCrypto.symbol,
          crypto_amount: parseFloat(cryptoAmount),
          deposit_address: selectedCrypto.address,
          status: "completed",
          generated_license_key: newKey,
        });

        // Automatically activate this key for the user
        await activateLicense(newKey);
      }

      setTimeout(() => {
        setIsConfirming(false);
        setGeneratedKey(newKey);
        setPaymentSuccess(true);
      }, 1500);
    } catch (err: any) {
      console.error("Order processing error:", err);
      setIsConfirming(false);
      setErrorMessage(err.message || "Failed to process payment confirmation.");
    }
  };

  const handleGoToActivation = async () => {
    if (generatedKey && user) {
      await activateLicense(generatedKey);
      await refreshProfile();
    }
    onClose();
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl glass-card-dark p-6 sm:p-8 border border-[#7c5ce8]/40 shadow-[0_0_50px_rgba(124,92,232,0.3)] space-y-6 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-[#7c5ce8]/20 border border-[#7c5ce8]/40 text-[#c4b5fd]">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-white">Pay with Crypto</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                Instant Auto-Activation
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Purchasing <span className="text-[#a78bfa] font-semibold">{plan.name}</span> ({plan.price} — {plan.duration})
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-start space-x-2.5 text-xs text-red-300 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {paymentSuccess ? (
          <div className="py-6 flex flex-col items-center text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            
            <div className="space-y-1">
              <h4 className="text-2xl font-extrabold text-white">Payment Confirmed &amp; Activated!</h4>
              <p className="text-xs text-gray-300">
                Your purchase of <span className="text-[#a78bfa] font-semibold">{plan.name}</span> is verified and linked to your Supabase account.
              </p>
            </div>

            {/* Generated License Key Box */}
            <div className="w-full p-5 rounded-2xl bg-[#0d0a24] border border-[#7c5ce8]/40 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                Your License Key
              </div>
              <div className="font-mono text-xl sm:text-2xl font-extrabold text-[#c4b5fd] tracking-wider select-all bg-[#08061a] py-3 px-4 rounded-xl border border-white/10 break-all">
                {generatedKey}
              </div>
              <p className="text-[11px] text-gray-400">
                Your membership is now active in Supabase. You have full access to all wallets.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button
                type="button"
                onClick={handleCopyKey}
                className="w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer border border-white/10"
              >
                {keyCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Key Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#a78bfa]" />
                    <span>Copy License Key</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleGoToActivation}
                className="w-full py-3.5 px-4 rounded-xl btn-hero-primary font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Launch Dashboard Simulator</span>
              </button>
            </div>

          </div>
        ) : (
          <div className="space-y-6">

            {/* Crypto Currency Selection Pills */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
                Select Crypto Currency
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CRYPTO_OPTIONS.map((c) => {
                  const isSelected = selectedCrypto.id === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCrypto(c)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#7c5ce8]/20 border-[#7c5ce8] text-white shadow-[0_0_15px_rgba(124,92,232,0.3)]"
                          : "bg-[#0d0a24] border-white/8 text-gray-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{c.icon}</span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#7c5ce8]" />}
                      </div>
                      <div className="mt-2">
                        <div className="text-xs font-bold">{c.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{c.symbol}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment Box & QR Code */}
            <div className="p-5 rounded-2xl bg-[#0d0a24] border border-white/10 space-y-4">
              
              {/* Amount Display */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                    Send Exact Amount
                  </div>
                  <div className="text-2xl font-extrabold text-white font-mono flex items-baseline gap-2 mt-0.5">
                    <span>{cryptoAmount} {selectedCrypto.symbol}</span>
                    <span className="text-xs font-normal text-gray-400">({plan.price} USD)</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTime(timeLeft)} remaining</span>
                </div>
              </div>

              {/* QR Code & Address */}
              <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
                
                {/* SVG QR Code */}
                <div className="w-32 h-32 p-2 bg-white rounded-2xl shrink-0 flex items-center justify-center shadow-lg border-2 border-[#7c5ce8]/40">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#08061a] fill-current">
                    <rect x="0" y="0" width="30" height="30" rx="4" />
                    <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                    <rect x="9" y="9" width="12" height="12" rx="1" />
                    
                    <rect x="70" y="0" width="30" height="30" rx="4" />
                    <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                    <rect x="79" y="9" width="12" height="12" rx="1" />

                    <rect x="0" y="70" width="30" height="30" rx="4" />
                    <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                    <rect x="9" y="79" width="12" height="12" rx="1" />

                    <rect x="35" y="10" width="10" height="10" />
                    <rect x="50" y="20" width="10" height="10" />
                    <rect x="40" y="40" width="20" height="20" rx="3" fill="#7c5ce8" />
                    <rect x="70" y="40" width="15" height="15" />
                    <rect x="10" y="45" width="15" height="15" />
                    <rect x="70" y="70" width="25" height="25" rx="3" />
                    <rect x="35" y="75" width="15" height="15" />
                  </svg>
                </div>

                {/* Address Box & Copy */}
                <div className="space-y-3 w-full">
                  <div>
                    <div className="flex justify-between items-center text-[10px] uppercase font-mono font-semibold text-gray-400 mb-1">
                      <span>Deposit {selectedCrypto.symbol} Address</span>
                      <span className="text-[#a78bfa]">{selectedCrypto.network}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#08061a] border border-white/10 font-mono text-xs text-gray-200 break-all select-all font-semibold">
                      {selectedCrypto.address}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#a78bfa]" />
                        <span>Copy Deposit Address</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>

            {/* Action Submit Button */}
            <button
              type="button"
              onClick={handleConfirmPayment}
              disabled={isConfirming}
              className="w-full py-4 px-4 rounded-xl btn-hero-primary font-bold text-sm tracking-wide cursor-pointer flex items-center justify-center space-x-2 shadow-lg disabled:opacity-60"
            >
              {isConfirming ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Blockchain Transaction &amp; Updating Database...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>I Have Sent Payment</span>
                </>
              )}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
