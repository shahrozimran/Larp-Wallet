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
  onSave: (handle: string, accountName: string) => void;
}

export default function PhantomSettingsModal({
  isOpen,
  onClose,
  handle,
  accountName,
  onSave,
}: PhantomSettingsModalProps) {
  const [editHandle, setEditHandle] = useState(handle);
  const [editAccountName, setEditAccountName] = useState(accountName);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    const cleanHandle = editHandle.startsWith("@") ? editHandle : `@${editHandle}`;
    onSave(cleanHandle, editAccountName);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 900);
  };

  const settingsGroups = [
    {
      title: "Preferences",
      items: [
        { icon: DollarSign, label: "Preferred Currency", value: "USD" },
        { icon: Globe, label: "Network", value: "Solana Mainnet" },
      ],
    },
    {
      title: "Security",
      items: [
        { icon: Shield, label: "Security & Passcode", value: "" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

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

          {/* Account Customization Card */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 px-1">
              <User className="w-4 h-4 text-[#a594fd]" />
              <span className="text-xs font-bold text-[#a594fd] uppercase tracking-widest">Account</span>
            </div>

            <div className="bg-[#111113] rounded-2xl overflow-hidden border border-white/5 space-y-px">
              {/* Handle Field */}
              <div className="px-4 py-4 space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Username / Handle
                </label>
                <div className="flex items-center space-x-2 bg-[#1c1c1e] rounded-xl px-3 py-2.5 border border-white/5 focus-within:border-[#a594fd]/60 transition-colors">
                  <span className="text-[#a594fd] font-bold text-base select-none">@</span>
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

              {/* Account Name Field */}
              <div className="px-4 py-4 space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Account Name
                </label>
                <div className="flex items-center bg-[#1c1c1e] rounded-xl px-3 py-2.5 border border-white/5 focus-within:border-[#a594fd]/60 transition-colors">
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

          {/* Other Settings Groups */}
          {settingsGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
                {group.title}
              </span>
              <div className="bg-[#111113] rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                {group.items.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComp className="w-5 h-5 text-[#a594fd]" />
                        <span className="text-base font-semibold text-white">{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.value && (
                          <span className="text-sm text-gray-400">{item.value}</span>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            className={`w-full py-4 rounded-2xl font-extrabold text-base transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-[#a594fd] hover:bg-[#b6a7ff] text-black shadow-[0_4px_20px_rgba(165,148,253,0.3)]"
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
