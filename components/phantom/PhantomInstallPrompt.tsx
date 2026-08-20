"use client";

import React, { useState, useEffect } from "react";
import { Download, X, Share, PlusSquare, CheckCircle2 } from "lucide-react";

export default function PhantomInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed & opened as PWA)
    const checkStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(checkStandalone);

    if (checkStandalone) return; // Don't show install prompt if already running as standalone app!

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iosDevice);

    // Listen for Chrome/Android PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Show prompt for iOS if not standalone
    if (iosDevice) {
      setShowPrompt(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-[#1c1c1e]/95 backdrop-blur-xl border border-[#a594fd]/40 rounded-2xl p-4 shadow-[0_0_30px_rgba(165,148,253,0.3)] animate-fadeIn font-sans">
      <div className="flex items-center justify-between gap-3">
        
        {/* App Icon & Details */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-[#beacff] p-1 shadow-sm">
            <img src="/Phantom 2.png" alt="Phantom App Icon" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h4 className="font-extrabold text-sm text-white">Phantom Wallet</h4>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#a594fd]" />
            </div>
            <p className="text-[11px] text-gray-300 font-medium">
              {isIOS ? "Install App on iPhone / iPad" : "Install Standalone Mobile App"}
            </p>
          </div>
        </div>

        {/* Action Button & Close */}
        <div className="flex items-center space-x-2">
          {!isIOS && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-3.5 py-2 rounded-xl bg-[#a594fd] hover:bg-[#b6a7ff] text-[#000000] font-extrabold text-xs flex items-center space-x-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowPrompt(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* iOS Instructions */}
      {isIOS && (
        <div className="mt-3 pt-2.5 border-t border-white/10 text-xs text-gray-300 flex items-center space-x-2">
          <Share className="w-4 h-4 text-[#a594fd] shrink-0" />
          <span>Tap <strong>Share</strong> in Safari, then select <strong>Add to Home Screen</strong></span>
        </div>
      )}
    </div>
  );
}
