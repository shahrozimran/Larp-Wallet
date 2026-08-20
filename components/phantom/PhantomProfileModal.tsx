"use client";

import React, { useState } from "react";
import { ArrowLeft, Copy, Check, Edit2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface PhantomProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  handle: string;
  accountName: string;
  onOpenSettings: () => void;
}

export default function PhantomProfileModal({
  isOpen,
  onClose,
  handle = "@GuidedMutt3528",
  accountName = "Account 1",
  onOpenSettings,
}: PhantomProfileModalProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState(false);
  const { user, profile } = useAuth();

  if (!isOpen) return null;

  // Generate deterministic user address based on user ID or fallback
  const userAddress = user?.id
    ? `${user.id.slice(0, 4)}...${user.id.slice(-4)}`
    : "7Xw1...3M4n";
  const fullAddress = user?.id
    ? `7Xw1${user.id.replace(/-/g, "").slice(0, 26)}`
    : "7Xw1kFBe8Nn2aqN9cLMGGiRQakQA6Uh3M4n";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyHandle = () => {
    navigator.clipboard.writeText(handle);
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex font-sans animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Full-screen panel */}
      <div className="relative w-full h-full bg-[#000000] text-white flex flex-col z-10 animate-slideInLeft overflow-y-auto font-sans">

        {/* ── HEADER ── */}
        <div className="sticky top-0 z-10 bg-[#000000] px-4 pt-12 pb-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#1c1c1e] flex items-center justify-center hover:bg-[#2c2c2e] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-extrabold text-white tracking-tight">Profile</h1>
          </div>
          {/* Edit button -> opens Settings */}
          <button
            type="button"
            onClick={() => { onClose(); onOpenSettings(); }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#1c1c1e] hover:bg-[#2c2c2e] transition-colors cursor-pointer"
          >
            <Edit2 className="w-4 h-4 text-[#beacff]" />
            <span className="text-sm font-bold text-[#beacff]">Edit</span>
          </button>
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 px-4 py-6 space-y-6 max-w-lg mx-auto w-full">

          {/* ── PROFILE HERO CARD ── */}
          <div className="bg-[#111113] rounded-3xl border border-white/5 p-6 space-y-5">

            {/* Avatar + Handle Row */}
            <div className="flex items-center space-x-4">
              {/* Phantom Logo Avatar */}
              <div className="w-16 h-16 rounded-full bg-[#beacff] flex items-center justify-center flex-shrink-0 border-2 border-white/10 shadow-lg p-2 overflow-hidden">
                <img src="/Phantom 2.png" alt="Phantom Logo" className="w-full h-full object-contain" />
              </div>

              {/* Handle + Account Name + User Email */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-white tracking-tight truncate">{handle}</h2>
                  <button
                    type="button"
                    onClick={handleCopyHandle}
                    className="ml-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
                  >
                    {copiedHandle
                      ? <Check className="w-4 h-4 text-[#10b981]" />
                      : <Copy className="w-4 h-4 text-gray-400" />
                    }
                  </button>
                </div>
                <p className="text-sm font-semibold text-gray-400 mt-0.5">{accountName}</p>
                {user?.email && (
                  <p className="text-xs font-mono text-[#beacff] mt-0.5 truncate">{user.email}</p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* Wallet Address */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Wallet Address</span>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#1c1c1e] rounded-2xl border border-white/5 hover:bg-[#252528] transition-colors cursor-pointer group"
              >
                <span className="text-sm font-mono font-semibold text-white truncate max-w-[220px]">
                  {fullAddress}
                </span>
                {copiedAddress ? (
                  <div className="flex items-center space-x-1.5">
                    <Check className="w-4 h-4 text-[#10b981]" />
                    <span className="text-xs font-bold text-[#10b981]">Copied!</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1.5">
                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-[#beacff] transition-colors" />
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-[#beacff] transition-colors">Copy</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Account Info Section */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Account</span>
            <div className="bg-[#111113] rounded-2xl border border-white/5 divide-y divide-white/5">
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-sm font-semibold text-gray-400">Account Name</span>
                <span className="text-sm font-bold text-white">{accountName}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-sm font-semibold text-gray-400">Plan Tier</span>
                <span className="text-sm font-bold text-[#beacff] uppercase font-mono">{profile?.plan_type || "Pro"}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-sm font-semibold text-gray-400">Network</span>
                <span className="text-sm font-bold text-[#10b981]">Solana Mainnet</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            type="button"
            onClick={() => { onClose(); onOpenSettings(); }}
            className="w-full py-4 rounded-2xl bg-[#1c1c1e] hover:bg-[#252528] border border-white/5 text-white font-extrabold text-base transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Edit2 className="w-5 h-5 text-[#beacff]" />
            <span>Edit Profile</span>
          </button>

        </div>
      </div>
    </div>
  );
}
