"use client";

import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  QrCode,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Info,
  ChevronDown,
} from "lucide-react";

interface ModalsProps {
  isSendOpen: boolean;
  isReceiveOpen: boolean;
  onCloseSend: () => void;
  onCloseReceive: () => void;
}

export default function SendReceiveModals({
  isSendOpen,
  isReceiveOpen,
  onCloseSend,
  onCloseReceive,
}: ModalsProps) {
  // Send state
  const [sendAsset, setSendAsset] = useState("ETH");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [feeSpeed, setFeeSpeed] = useState("standard");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Receive state
  const [copied, setCopied] = useState(false);
  const walletAddress = "0x7F2d98a1C0492E83b4A902c3D81191a7B3B43B9a";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setTimeout(() => {
        setSendSuccess(false);
        setRecipient("");
        setAmount("");
        onCloseSend();
      }, 1800);
    }, 1500);
  };

  return (
    <>
      {/* SEND MODAL */}
      {isSendOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl glass-card-olive p-6 sm:p-8 shadow-2xl border border-[#8a9a5b]/30">
            {/* Close Button */}
            <button
              onClick={onCloseSend}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-2xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 text-[#c0d4a0]">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Send Crypto</h3>
                <p className="text-xs text-gray-400">
                  Transfer assets instantly with low gas fees
                </p>
              </div>
            </div>

            {sendSuccess ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#8a9a5b]/20 border-2 border-[#8a9a5b] flex items-center justify-center text-[#c0d4a0] animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Transaction Broadcasted!</h4>
                <p className="text-xs text-gray-400 max-w-xs">
                  Sent {amount} {sendAsset} to {recipient.slice(0, 8)}...{recipient.slice(-6)}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendSubmit} className="space-y-5">
                {/* Select Asset */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Select Token
                  </label>
                  <select
                    value={sendAsset}
                    onChange={(e) => setSendAsset(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#121814] border border-white/10 text-white font-medium focus:outline-none focus:border-[#8a9a5b] transition-colors"
                  >
                    <option value="ETH">Ethereum (ETH) - Bal: 12.8 ETH</option>
                    <option value="BTC">Bitcoin (BTC) - Bal: 1.42 BTC</option>
                    <option value="SOL">Solana (SOL) - Bal: 85.4 SOL</option>
                    <option value="USDT">Tether (USDT) - Bal: 3,450 USDT</option>
                  </select>
                </div>

                {/* Recipient Address */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Recipient Address / ENS
                    </label>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          const text = await navigator.clipboard.readText();
                          setRecipient(text);
                        } catch {}
                      }}
                      className="text-[11px] font-semibold text-[#a5b67d] hover:underline"
                    >
                      Paste
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="0x... or name.eth"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#121814] border border-white/10 text-white font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-[#8a9a5b] transition-colors"
                  />
                </div>

                {/* Amount Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Amount
                    </label>
                    <button
                      type="button"
                      onClick={() => setAmount("12.8")}
                      className="text-[11px] font-semibold text-[#a5b67d] hover:underline"
                    >
                      MAX (12.8 ETH)
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      required
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#121814] border border-white/10 text-white font-semibold text-lg placeholder-gray-500 focus:outline-none focus:border-[#8a9a5b] transition-colors"
                    />
                    <div className="absolute right-4 top-3.5 text-xs font-bold text-[#c0d4a0]">
                      {sendAsset}
                    </div>
                  </div>
                </div>

                {/* Network Speed Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Gas Speed Priority
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "slow", label: "Standard", fee: "~$0.45", time: "< 3 mins" },
                      { id: "standard", label: "Fast", fee: "~$0.85", time: "< 30 secs" },
                      { id: "fast", label: "Instant", fee: "~$1.20", time: "< 10 secs" },
                    ].map((speed) => (
                      <button
                        type="button"
                        key={speed.id}
                        onClick={() => setFeeSpeed(speed.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          feeSpeed === speed.id
                            ? "bg-[#8a9a5b]/20 border-[#8a9a5b] text-white"
                            : "bg-[#121814] border-white/5 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <div className="text-xs font-bold">{speed.label}</div>
                        <div className="text-[10px] text-[#c0d4a0]">{speed.fee}</div>
                        <div className="text-[9px] text-gray-500">{speed.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 px-4 rounded-xl olive-btn-primary font-bold text-sm tracking-wide transition-all disabled:opacity-50"
                >
                  {isSending ? "Validating & Confirming..." : `Send ${sendAsset}`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* RECEIVE MODAL */}
      {isReceiveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl glass-card-olive p-6 sm:p-8 shadow-2xl border border-[#8a9a5b]/30 text-center">
            {/* Close Button */}
            <button
              onClick={onCloseReceive}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center space-y-2 mb-6">
              <div className="p-3 rounded-2xl bg-[#8a9a5b]/20 border border-[#8a9a5b]/40 text-[#c0d4a0]">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Receive Deposit</h3>
              <p className="text-xs text-gray-400">
                Scan QR code or copy address to receive tokens
              </p>
            </div>

            {/* Stylized QR Code Box */}
            <div className="my-6 mx-auto w-48 h-48 p-3 rounded-2xl bg-white flex flex-col items-center justify-center border-4 border-[#8a9a5b]/50 shadow-[0_0_30px_rgba(138,154,91,0.3)]">
              {/* Simulated QR Pattern SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#090c0a] fill-current">
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
                <rect x="40" y="40" width="20" height="20" rx="3" fill="#697841" />
                <rect x="70" y="40" width="15" height="15" />
                <rect x="10" y="45" width="15" height="15" />
                <rect x="70" y="70" width="25" height="25" rx="3" />
                <rect x="35" y="75" width="15" height="15" />
                <rect x="55" y="65" width="10" height="20" />
              </svg>
            </div>

            {/* Address Box */}
            <div className="bg-[#121814] border border-white/10 rounded-2xl p-3 mb-4">
              <div className="text-[10px] font-semibold tracking-wider uppercase text-gray-400 mb-1">
                Your Public Address (ERC-20 / EVM)
              </div>
              <div className="font-mono text-xs text-gray-200 break-all select-all font-semibold">
                {walletAddress}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleCopy}
              className="w-full py-3.5 px-4 rounded-xl olive-btn-primary flex items-center justify-center space-x-2 text-sm font-bold"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Wallet Address</span>
                </>
              )}
            </button>

            {/* Warning Note */}
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-start space-x-2 text-left">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Send only EVM compatible tokens (ETH, ERC-20) to this address. Sending non-supported assets may cause permanent loss.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
