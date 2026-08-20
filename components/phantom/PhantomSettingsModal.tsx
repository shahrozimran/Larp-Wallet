"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  DollarSign,
  Globe,
  Shield,
  ChevronRight,
  Check,
} from "lucide-react";

interface PhantomSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  handle: string;
  accountName: string;
  currency: "usd" | "gbp";
  onSave: (handle: string, accountName: string, currency: "usd" | "gbp") => void;
}

export default function PhantomSettingsModal({
  isOpen,
  onClose,
  handle,
  accountName,
  currency,
  onSave,
}: PhantomSettingsModalProps) {
  const [editHandle, setEditHandle] = useState(handle);
  const [editAccountName, setEditAccountName] = useState(accountName);
  const [editCurrency, setEditCurrency] = useState<"usd" | "gbp">(currency);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    const cleanHandle = editHandle.startsWith("@") ? editHandle : `@${editHandle}`;
    onSave(cleanHandle, editAccountName, editCurrency);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 900);
  };

  const currencyLabel = editCurrency === "gbp" ? "GBP (£)" : "USD ($)";

  return (
    <div className="fixed inset-0 z-[60] flex font-sans animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Full-screen slide-up panel */}
      <div className="relative w-full h-full bg-[#000000] text-white flex flex-col z-10 animate-slideInLeft overflow-y-auto font-sans">

        {/* ── HEADER ── */}
        <div className="sticky top-0 z-10 bg-[#000000] px-4 pt-12 pb-4 flex items-center space-x-4 border-b border-white/5">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1c1c1e] flex items-center justify-center hover:bg-[#2c2c2e] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl font-extrabold text-white tracking-tight">Settings</h1>
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 px-4 py-6 space-y-8 max-w-lg mx-auto w-full">

          {/* Account Customization */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 px-1">
              <User className="w-4 h-4 text-[#beacff]" />
              <span className="text-xs font-bold text-[#beacff] uppercase tracking-widest">Account</span>
            </div>

            <div className="bg-[#111113] rounded-2xl overflow-hidden border border-white/5 space-y-px">
              {/* Handle */}
              <div className="px-4 py-4 space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Username / Handle</label>
                <div className="flex items-center space-x-2 bg-[#1c1c1e] rounded-xl px-3 py-2.5 border border-white/5 focus-within:border-[#beacff]/60 transition-colors">
                  <span className="text-[#beacff] font-bold text-base select-none">@</span>
                  <input
                    type="text"
                    value={editHandle.replace(/^@/, "")}
                    onChange={(e) => setEditHandle(e.target.value)}
                    placeholder="GuidedMutt3528"
                    className="flex-1 bg-transparent text-white text-base font-medium placeholder-gray-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="h-px bg-white/5 mx-4" />

              {/* Account Name */}
              <div className="px-4 py-4 space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account Name</label>
                <div className="flex items-center bg-[#1c1c1e] rounded-xl px-3 py-2.5 border border-white/5 focus-within:border-[#beacff]/60 transition-colors">
                  <input
                    type="text"
                    value={editAccountName}
                    onChange={(e) => setEditAccountName(e.target.value)}
                    placeholder="Account 1"
                    className="flex-1 bg-transparent text-white text-base font-medium placeholder-gray-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Preferences</span>
            <div className="bg-[#111113] rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">

              {/* Currency Row */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowCurrencyPicker(!showCurrencyPicker)}
                  className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-[#beacff]" />
                    <span className="text-base font-semibold text-white">Preferred Currency</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400 font-semibold">{currencyLabel}</span>
                    <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${showCurrencyPicker ? "rotate-90" : ""}`} />
                  </div>
                </button>

                {/* Inline Currency Picker */}
                {showCurrencyPicker && (
                  <div className="border-t border-white/5 divide-y divide-white/5">
                    {[
                      { value: "usd", label: "US Dollar", symbol: "$", short: "USD ($)" },
                      { value: "gbp", label: "British Pound", symbol: "£", short: "GBP (£)" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => { setEditCurrency(opt.value as "usd" | "gbp"); setShowCurrencyPicker(false); }}
                        className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-7 h-7 rounded-full bg-[#2c2c2e] text-white text-sm font-bold flex items-center justify-center">
                            {opt.symbol}
                          </span>
                          <div className="text-left">
                            <div className="text-sm font-semibold text-white">{opt.label}</div>
                            <div className="text-xs text-gray-500">{opt.short}</div>
                          </div>
                        </div>
                        {editCurrency === opt.value && (
                          <Check className="w-4 h-4 text-[#beacff]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Network */}
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-[#beacff]" />
                  <span className="text-base font-semibold text-white">Network</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Solana Mainnet</span>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Security</span>
            <div className="bg-[#111113] rounded-2xl overflow-hidden border border-white/5">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#beacff]" />
                  <span className="text-base font-semibold text-white">Security & Passcode</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            className={`w-full py-4 rounded-2xl font-extrabold text-base transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              saved
                ? "bg-[#10b981] text-white"
                : "bg-[#beacff] hover:bg-[#cca8ff] text-black shadow-[0_4px_20px_rgba(190,172,255,0.3)]"
            }`}
          >
            {saved ? (
              <>
                <Check className="w-5 h-5" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}
