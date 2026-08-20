"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  Check,
  User,
  MessageSquare,
  Heart,
  Clock,
  Settings,
  HelpCircle,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface PhantomSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  handle: string;
  accountName: string;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
}

export default function PhantomSidebar({
  isOpen,
  onClose,
  handle = "@GuidedMutt3528",
  accountName = "Account 1",
  onOpenProfile,
  onOpenSettings,
}: PhantomSidebarProps) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { user, profile, signOut } = useAuth();

  if (!isOpen) return null;

  const handleCopyHandle = () => {
    navigator.clipboard.writeText(handle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
    router.push("/");
  };

  const topMenuItems = [
    { icon: User, label: "Profile", onClick: () => { onClose(); onOpenProfile(); } },
    { icon: MessageSquare, label: "Chats", onClick: () => {} },
    { icon: Heart, label: "Watchlist", onClick: () => {} },
    { icon: Clock, label: "History", onClick: () => {} },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: "Settings", onClick: () => { onClose(); onOpenSettings(); } },
    { icon: HelpCircle, label: "Help & Support", onClick: () => {} },
  ];

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-[310px] sm:w-[330px] max-w-[85vw] bg-[#000000] text-white h-full flex flex-col justify-between p-6 z-10 shadow-2xl overflow-y-auto animate-slideInLeft">

        {/* ── TOP CONTENT SECTION ── */}
        <div className="space-y-5 pt-2">

          {/* Header Row: Avatar Logo & Copy Button */}
          <div className="flex items-center justify-between">
            {/* App Avatar Button */}
            <button
              type="button"
              onClick={() => { onClose(); onOpenProfile(); }}
              className="w-13 h-13 rounded-full bg-[#beacff] flex items-center justify-center overflow-hidden border border-white/10 shadow-md hover:scale-105 transition-transform cursor-pointer p-1.5 shrink-0"
            >
              <img src="/Phantom 2.png" alt="Phantom Logo" className="w-full h-full object-contain" />
            </button>

            {/* Copy Button Container */}
            <button
              type="button"
              onClick={handleCopyHandle}
              className="w-11 h-11 rounded-full bg-[#202024] hover:bg-[#2a2a30] text-gray-300 flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-white/5"
            >
              {copied ? <Check className="w-5 h-5 text-[#10b981]" /> : <Copy className="w-5 h-5 stroke-[2]" />}
            </button>
          </div>

          {/* Username Handle & Active User Meta */}
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">{handle}</h2>

            {user?.email && (
              <div className="flex items-center space-x-2 pt-0.5">
                <span className="px-2 py-0.5 rounded-full bg-[#beacff]/20 text-[#beacff] text-[10px] font-mono font-bold uppercase">
                  {profile?.plan_type || "Pro"}
                </span>
                <span className="text-xs text-gray-400 font-mono truncate max-w-[170px]">
                  {user.email}
                </span>
              </div>
            )}

            {/* Connect X Account button */}
            <button
              type="button"
              className="flex items-center space-x-2 text-sm font-semibold text-[#beacff] hover:text-[#cca8ff] transition-colors cursor-pointer pt-1"
            >
              <span className="font-black text-base">𝕏</span>
              <span>Connect your X account</span>
            </button>
          </div>

          {/* Account Selector Pill */}
          <div className="pt-1">
            <button
              type="button"
              className="flex items-center space-x-3 text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#202024] text-xs font-bold font-mono flex items-center justify-center text-gray-300 border border-white/10 shrink-0">
                A1
              </div>
              <span className="text-xl font-extrabold text-white">{accountName}</span>
              <ChevronDown className="w-4 h-4 text-gray-300 stroke-[2.5]" />
            </button>
          </div>

          {/* Top Menu Items List (Profile, Chats, Watchlist, History) */}
          <div className="space-y-5 pt-2">
            {topMenuItems.map((item, index) => {
              const IconComp = item.icon;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={item.onClick}
                  className="w-full flex items-center space-x-4 text-white hover:text-[#beacff] transition-colors py-1 cursor-pointer text-left group"
                >
                  <IconComp className="w-6 h-6 text-white stroke-[2] group-hover:text-[#beacff] transition-colors" />
                  <span className="text-xl font-extrabold tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* ── BOTTOM CONTENT SECTION (Settings, Help & Support, Sign Out) ── */}
        <div className="space-y-4 pt-6 pb-2 border-t border-white/10">
          {bottomMenuItems.map((item, index) => {
            const IconComp = item.icon;
            return (
              <button
                key={index}
                type="button"
                onClick={item.onClick}
                className="w-full flex items-center space-x-4 text-white hover:text-[#beacff] transition-colors py-1 cursor-pointer text-left group"
              >
                <IconComp className="w-6 h-6 text-white stroke-[2] group-hover:text-[#beacff] transition-colors" />
                <span className="text-xl font-extrabold tracking-tight">{item.label}</span>
              </button>
            );
          })}

          {user && (
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 text-red-400 hover:text-red-300 transition-colors py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/15 cursor-pointer text-left font-extrabold text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
