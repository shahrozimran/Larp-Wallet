"use client";

import React, { useState } from "react";
import { ArrowLeft, Copy, Check, Edit2, X } from "lucide-react";

interface PhantomProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  handle: string;
  accountName: string;
  onOpenSettings: () => void;
}

const WALLET_ADDRESS = "7Xw1...3M4n";
const FULL_ADDRESS = "7Xw1kFBe8Nn2aqN9cLMGGiRQakQA6Uh3M4n";

export default function PhantomProfileModal({
  isOpen,
  onClose,
  handle,
  accountName,
  onOpenSettings,
}: PhantomProfileModalProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState(false);

  if (!isOpen) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(FULL_ADDRESS);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyHandle = () => {
    navigator.clipboard.writeText(handle);
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex">
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
            <Edit2 className="w-4 h-4 text-[#a594fd]" />
            <span className="text-sm font-semibold text-[#a594fd]">Edit</span>
          </button>
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 px-4 py-6 space-y-6 max-w-lg mx-auto w-full">

          {/* ── PROFILE HERO CARD ── */}
          <div className="bg-[#111113] rounded-3xl border border-white/5 p-6 space-y-5">

            {/* Avatar + Handle Row */}
            <div className="flex items-center space-x-4">
              {/* Yellow mascot avatar */}
              <div className="w-16 h-16 rounded-full bg-[#8fa1ff] flex items-center justify-center flex-shrink-0 border-2 border-white/10 shadow-lg">
                <div className="w-11 h-11 rounded-full bg-[#fce886] flex items-center justify-center relative">
                  <div className="w-4 h-1.5 bg-[#432c7a] rounded-full absolute top-3.5 left-1.5" />
                  <div className="w-4 h-1.5 bg-[#432c7a] rounded-full absolute top-3.5 right-1.5" />
                  <div className="w-3 h-1 bg-[#ff9e9e] rounded-full absolute bottom-2.5" />
                </div>
              </div>

              {/* Handle + Account Name */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-white tracking-tight truncate">{handle}</h2>
                  <button
                    type="button"
                    onClick={handleCopyHandle}
                    className="ml-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
                  >
                    {copiedHandle
                      ? <Check className="w-4 h-4 text-emerald-400" />
                      : <Copy className="w-4 h-4 text-gray-400" />
                    }
                  </button>
                </div>
                <p className="text-sm font-semibold text-gray-400 mt-0.5">{accountName}</p>
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
                <span className="text-sm font-mono font-semibold text-white">
                  7Xw1kFBe8Nn2aqN9cL...3M4n
                </span>
                {copiedAddress ? (
                  <div className="flex items-center space-x-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400">Copied!</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1.5">
                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-[#a594fd] transition-colors" />
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-[#a594fd] transition-colors">Copy</span>
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
                <span className="text-sm font-semibold text-gray-400">Network</span>
                <span className="text-sm font-bold text-[#14F195]">Solana Mainnet</span>
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-sm font-semibold text-gray-400">Balance</span>
                <span className="text-sm font-bold text-white">$0.00</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            type="button"
            onClick={() => { onClose(); onOpenSettings(); }}
            className="w-full py-4 rounded-2xl bg-[#1c1c1e] hover:bg-[#252528] border border-white/5 text-white font-extrabold text-base transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Edit2 className="w-5 h-5 text-[#a594fd]" />
            <span>Edit Profile</span>
          </button>

        </div>
      </div>
    </div>
  );
}
