"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import PhantomHome from "@/components/phantom/PhantomHome";

export default function PhantomAppPage() {
  const router = useRouter();
  const { isLoggedIn, isLicenseActive, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        router.push("/login?redirect=/phantom");
      } else if (!isLicenseActive) {
        router.push("/plans");
      }
    }
  }, [loading, isLoggedIn, isLicenseActive, router]);

  if (loading || !isLoggedIn || !isLicenseActive) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center font-sans">
        <div className="flex items-center space-x-3 text-[#a78bfa]">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className="font-mono text-sm font-semibold">Authorizing Phantom Simulator...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <PhantomHome />
    </div>
  );
}
