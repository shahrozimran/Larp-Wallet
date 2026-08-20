"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Lock, ShieldCheck } from "lucide-react";
import { loginUser } from "@/lib/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email.trim() || "user@larpzwallet.app");
    onClose();
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      router.push("/plans");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl glass-card-dark p-6 sm:p-8 border border-[#7c5ce8]/30 shadow-2xl space-y-6 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-[#7c5ce8]/15 border border-[#7c5ce8]/30 text-[#a78bfa]">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Access Larp Wallet</h3>
            <p className="text-xs text-gray-400">Enter your email and password to log in</p>
          </div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-xl bg-[#0d0a24] border border-white/10 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#7c5ce8] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#0d0a24] border border-white/10 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#7c5ce8] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl btn-hero-primary font-bold text-sm tracking-wide cursor-pointer flex items-center justify-center space-x-2 mt-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Login &amp; Continue</span>
          </button>
        </form>

      </div>
    </div>
  );
}
