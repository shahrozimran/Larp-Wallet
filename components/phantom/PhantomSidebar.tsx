"use client";

import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  User,
  MessageSquare,
  Heart,
  Clock,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

interface PhantomSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhantomSidebar({ isOpen, onClose }: PhantomSidebarProps) {
  const [copied, setCopied] = useState(false);
  const [handle] = useState("@GuidedMutt3528");

  if (!isOpen) return null;

  const handleCopyHandle = () => {
    navigator.clipboard.writeText(handle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const menuItems = [
    { icon: User, label: "Profile" },
    { icon: MessageSquare, label: "Chats" },
    { icon: Heart, label: "Watchlist" },
    { icon: Clock, label: "History" },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container (Matching Screenshot 1) */}
      <div className="relative w-[300px] sm:w-[320px] max-w-[85vw] bg-[#000000] text-white h-full flex flex-col justify-between p-6 z-10 shadow-2xl overflow-y-auto animate-slideInLeft font-sans">
        
        {/* TOP SECTION */}
        <div className="space-y-6 pt-2">
          
          {/* Header Row: Avatar & Copy Icon */}
          <div className="flex items-center justify-between">
            {/* Custom Avatar matching Screenshot 1 */}
            <div className="w-14 h-14 rounded-full bg-[#8fa1ff] flex items-center justify-center relative overflow-hidden border-2 border-white/10 shadow-md">
              <div className="w-9 h-9 rounded-full bg-[#fce886] flex items-center justify-center relative">
                {/* Sunglasses & Headphones detail */}
                <div className="w-3.5 h-1.5 bg-[#432c7a] rounded-full absolute top-3 left-1.5" />
                <div className="w-3.5 h-1.5 bg-[#432c7a] rounded-full absolute top-3 right-1.5" />
                <div className="w-2.5 h-1 bg-[#ff9e9e] rounded-full absolute bottom-2" />
              </div>
            </div>

            {/* Copy Handle Button */}
            <button
              type="button"
              onClick={handleCopyHandle}
              className="p-3 rounded-2xl bg-[#1c1c1e] hover:bg-[#2c2c2e] text-gray-300 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          {/* User Handle & X Account Link */}
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {handle}
            </h2>
            <button
              type="button"
              className="flex items-center space-x-2 text-xs font-semibold text-[#a594fd] hover:text-[#c4b5fd] transition-colors cursor-pointer"
            >
              <span className="font-bold">𝕏</span>
              <span>Connect your X account</span>
            </button>
          </div>

          {/* Account Selector Pill */}
          <div className="pt-2">
            <button
              type="button"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-transparent hover:bg-white/5 text-white transition-colors cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-[#1c1c1e] text-[11px] font-mono font-bold flex items-center justify-center text-gray-300">
                A1
              </span>
              <span className="text-lg font-bold text-white">Account 1</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Menu Items List */}
          <div className="space-y-5 pt-4">
            {menuItems.slice(0, 4).map((item, index) => {
              const IconComp = item.icon;
              return (
                <button
                  key={index}
                  type="button"
                  className="w-full flex items-center space-x-4 text-white hover:text-[#a594fd] transition-colors py-1 cursor-pointer text-left group"
                >
                  <IconComp className="w-5 h-5 text-gray-300 group-hover:text-[#a594fd] transition-colors" />
                  <span className="text-lg font-bold tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* BOTTOM SECTION (Settings & Help) */}
        <div className="space-y-5 pt-6 border-t border-white/10 pb-4">
          {menuItems.slice(4).map((item, index) => {
            const IconComp = item.icon;
            return (
              <button
                key={index}
                type="button"
                className="w-full flex items-center space-x-4 text-white hover:text-[#a594fd] transition-colors py-1 cursor-pointer text-left group"
              >
                <IconComp className="w-5 h-5 text-gray-300 group-hover:text-[#a594fd] transition-colors" />
                <span className="text-lg font-bold tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
