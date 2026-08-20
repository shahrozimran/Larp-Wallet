"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Send,
  QrCode,
  CircleDollarSign,
  ArrowLeftRight,
  X,
} from "lucide-react";
import PhantomSidebar from "./PhantomSidebar";
import PhantomInstallPrompt from "./PhantomInstallPrompt";
import PhantomSettingsModal from "./PhantomSettingsModal";
import PhantomProfileModal from "./PhantomProfileModal";
import PhantomAddCashModal from "./PhantomAddCashModal";
import PhantomPortfolioView, { Holding, CoinToken } from "./PhantomPortfolioView";
import PhantomTradeView from "./PhantomTradeView";
import PhantomExploreView from "./PhantomExploreView";
import PhantomCoinDetailModal from "./PhantomCoinDetailModal";

export default function PhantomHome() {
  const [activeTab, setActiveTab] = useState("Start");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAddCashOpen, setIsAddCashOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoinForDetail, setSelectedCoinForDetail] = useState<CoinToken | null>(null);

  // Live market data
  const [coins, setCoins] = useState<CoinToken[]>([]);
  const [usdToGbp, setUsdToGbp] = useState(0.79);
  const [isLoading, setIsLoading] = useState(true);

  // Holdings portfolio
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [currency, setCurrency] = useState<"usd" | "gbp">("usd");

  // Persistent user handle & account name
  const [handle, setHandle] = useState("@GuidedMutt3528");
  const [accountName, setAccountName] = useState("Account 1");

  useEffect(() => {
    const savedHandle = localStorage.getItem("phantom_user_handle");
    const savedAccountName = localStorage.getItem("phantom_account_name");
    const savedHoldings = localStorage.getItem("phantom_holdings");
    const savedCurrency = localStorage.getItem("phantom_currency") as "usd" | "gbp" | null;
    if (savedHandle) setHandle(savedHandle);
    if (savedAccountName) setAccountName(savedAccountName);
    if (savedHoldings) {
      try { setHoldings(JSON.parse(savedHoldings)); } catch {}
    }
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  // Fetch live prices from our API route
  const fetchPrices = async () => {
    try {
      const res = await fetch("/api/crypto", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.coins) {
          setCoins(data.coins);
        }
        if (data.usdToGbp) setUsdToGbp(data.usdToGbp);
      }
    } catch (e) {
      console.error("Failed to fetch prices:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveProfile = (newHandle: string, newAccountName: string, newCurrency: "usd" | "gbp") => {
    setHandle(newHandle);
    setAccountName(newAccountName);
    setCurrency(newCurrency);
    localStorage.setItem("phantom_user_handle", newHandle);
    localStorage.setItem("phantom_account_name", newAccountName);
    localStorage.setItem("phantom_currency", newCurrency);
  };

  const handleAddHolding = (coinId: string, qty: number) => {
    const coin = coins.find((c) => c.id === coinId);
    if (!coin) return;
    setHoldings((prev) => {
      const existing = prev.find((h) => h.coinId === coinId);
      let next: Holding[];
      if (existing) {
        const totalQty = existing.qty + qty;
        const avgPrice = (existing.qty * existing.avgBuyPrice + qty * coin.price) / totalQty;
        next = prev.map((h) => h.coinId === coinId ? { ...h, qty: totalQty, avgBuyPrice: avgPrice } : h);
      } else {
        next = [...prev, { coinId, qty, avgBuyPrice: coin.price }];
      }
      localStorage.setItem("phantom_holdings", JSON.stringify(next));
      return next;
    });
  };

  const handleUpdateHoldings = (newHoldings: Holding[]) => {
    setHoldings(newHoldings);
    localStorage.setItem("phantom_holdings", JSON.stringify(newHoldings));
  };

  // English Nav Tabs: Home, Trade, Predictions, Explore
  const navTabs = [
    { key: "Start", label: "Home" },
    { key: "Handel", label: "Trade" },
    { key: "Vorhersage", label: "Predictions" },
    { key: "Erkunden", label: "Explore" },
  ];

  const speedDialItems = [
    { id: "send", label: "Send", icon: Send, onClick: () => {} },
    { id: "receive", label: "Receive", icon: QrCode, onClick: () => {} },
    { id: "add_cash", label: "Add Cash", icon: CircleDollarSign, onClick: () => { setIsPlusMenuOpen(false); setIsAddCashOpen(true); } },
    { id: "trade", label: "Trade", icon: ArrowLeftRight, onClick: () => { setIsPlusMenuOpen(false); setActiveTab("Handel"); } },
  ];

  return (
    <div className="relative min-h-[100dvh] bg-[#000000] text-white font-sans flex flex-col selection:bg-[#beacff] selection:text-black overflow-x-hidden">
      
      {/* ── HEADER NAV BAR (Avatar + Pill Tabs) ── */}
      <header className="sticky top-0 z-40 bg-[#000000]/95 backdrop-blur-md px-4 py-2.5 flex items-center space-x-2.5 border-b border-white/5">
        
        {/* Profile Avatar Button */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="w-10 h-10 rounded-full bg-[#a594fd] flex items-center justify-center shrink-0 border border-white/10 hover:scale-105 transition-transform cursor-pointer shadow-sm"
        >
          <div className="w-6.5 h-6.5 rounded-full bg-[#fde047] flex items-center justify-center relative shadow-inner">
            <div className="w-1.5 h-1.5 bg-[#3b0764] rounded-full absolute top-2 left-1.5" />
            <div className="w-1.5 h-1.5 bg-[#3b0764] rounded-full absolute top-2 right-1.5" />
            <div className="w-2.5 h-1 bg-[#3b0764] rounded-full absolute bottom-1.5" />
          </div>
        </button>

        {/* Horizontal Navigation Pills (Home, Trade, Predictions, Explore) */}
        <nav className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#beacff] text-[#000000] shadow-[0_0_14px_rgba(190,172,255,0.4)]"
                    : "bg-[#26262a] text-[#a1a1aa] hover:bg-[#323236] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-[430px] w-full mx-auto pb-28">

        {activeTab === "Handel" ? (
          <PhantomTradeView
            coins={coins}
            holdings={holdings}
            currency={currency}
            usdToGbp={usdToGbp}
            onAddHolding={handleAddHolding}
            onUpdateHoldings={handleUpdateHoldings}
          />
        ) : activeTab === "Erkunden" ? (
          <PhantomExploreView
            coins={coins}
            onSwap={() => setActiveTab("Handel")}
            onBuy={() => setIsAddCashOpen(true)}
          />
        ) : (
          <PhantomPortfolioView
            holdings={holdings}
            coins={coins}
            currency={currency}
            usdToGbp={usdToGbp}
            accountName={accountName}
            onSelectCoin={(coin) => setSelectedCoinForDetail(coin)}
          />
        )}
      </main>

      {/* ── SPEED DIAL BACKDROP OVERLAY ── */}
      {isPlusMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#000000]/80 backdrop-blur-sm animate-fadeIn transition-opacity"
          onClick={() => setIsPlusMenuOpen(false)}
        />
      )}

      {/* ── FIXED BOTTOM SEARCH & ACTION BAR ── */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#000000] via-[#000000]/95 to-transparent pt-3 pb-5 px-4">
        
        {/* Speed Dial Menu Items */}
        {isPlusMenuOpen && (
          <div className="max-w-lg mx-auto flex flex-col items-end space-y-4 mb-4 pr-1 animate-slideUp">
            {speedDialItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.onClick?.();
                    if (!item.onClick || item.id !== "add_cash") setIsPlusMenuOpen(false);
                  }}
                  className="flex items-center space-x-4 group cursor-pointer active:scale-95 transition-transform"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-[#beacff] transition-colors">
                    {item.label}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-[#beacff] hover:bg-[#cca8ff] text-[#000000] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(190,172,255,0.4)] transition-all">
                    <IconComponent className="w-6 h-6 stroke-[2.5]" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          
          {/* Search Input Bar ("Search Phantom") */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Phantom"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#202024] border border-white/5 text-white text-base placeholder-gray-400 focus:outline-none focus:border-[#beacff]/60 transition-all font-medium"
            />
          </div>

          {/* Floating Circle Action Button (+) / (X) */}
          <button
            type="button"
            onClick={() => setIsPlusMenuOpen(!isPlusMenuOpen)}
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 active:scale-95 ${
              isPlusMenuOpen
                ? "bg-[#2c2c2e] text-white border border-white/20 shadow-lg rotate-90"
                : "bg-[#beacff] hover:bg-[#cca8ff] text-[#000000] shadow-[0_0_20px_rgba(190,172,255,0.35)]"
            }`}
          >
            {isPlusMenuOpen ? (
              <X className="w-6 h-6 stroke-[2.5]" />
            ) : (
              <Plus className="w-7 h-7 stroke-[2.5]" />
            )}
          </button>

        </div>
      </footer>

      {/* ── TOKEN DETAIL MODAL SHEET ── */}
      <PhantomCoinDetailModal
        isOpen={selectedCoinForDetail !== null}
        onClose={() => setSelectedCoinForDetail(null)}
        coin={selectedCoinForDetail}
        onTrade={() => {
          setSelectedCoinForDetail(null);
          setActiveTab("Handel");
        }}
      />

      {/* ── LEFT PROFILE SIDEBAR DRAWER ── */}
      <PhantomSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        handle={handle}
        accountName={accountName}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* ── PROFILE MODAL ── */}
      <PhantomProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        handle={handle}
        accountName={accountName}
        onOpenSettings={() => { setIsProfileOpen(false); setIsSettingsOpen(true); }}
      />

      {/* ── SETTINGS MODAL ── */}
      <PhantomSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        handle={handle}
        accountName={accountName}
        currency={currency}
        onSave={handleSaveProfile}
      />

      {/* ── ADD CASH MODAL ── */}
      <PhantomAddCashModal
        isOpen={isAddCashOpen}
        onClose={() => setIsAddCashOpen(false)}
        coins={coins}
        onAddHolding={handleAddHolding}
      />

      {/* ── STANDALONE PWA INSTALL PROMPT ── */}
      <PhantomInstallPrompt />

    </div>
  );
}
