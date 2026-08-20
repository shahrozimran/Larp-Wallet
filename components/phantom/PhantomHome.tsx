"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  CheckCircle2,
  ChevronRight,
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
import PhantomPortfolioView, { Holding } from "./PhantomPortfolioView";

interface CoinToken {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  marketCap: number;
  change24h: number;
}

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(4)}`;
  if (price >= 0.01) return `$${price.toFixed(5)}`;
  return `$${price.toFixed(8)}`;
}

function formatMarketCap(mc: number): string {
  if (mc >= 1e9) return `$${(mc / 1e9).toFixed(1)}B MC`;
  if (mc >= 1e6) return `$${(mc / 1e6).toFixed(0)}M MC`;
  return `$${(mc / 1e3).toFixed(0)}K MC`;
}

export default function PhantomHome() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAddCashOpen, setIsAddCashOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Live market data
  const [coins, setCoins] = useState<CoinToken[]>([]);
  const [usdToGbp, setUsdToGbp] = useState(0.79);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

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
          setLastUpdated(new Date());
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
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchPrices, 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveProfile = (newHandle: string, newAccountName: string) => {
    setHandle(newHandle);
    setAccountName(newAccountName);
    localStorage.setItem("phantom_user_handle", newHandle);
    localStorage.setItem("phantom_account_name", newAccountName);
  };

  const handleAddHolding = (coinId: string, qty: number) => {
    const coin = coins.find((c) => c.id === coinId);
    if (!coin) return;
    setHoldings((prev) => {
      const existing = prev.find((h) => h.coinId === coinId);
      let next: Holding[];
      if (existing) {
        // Weighted average buy price
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

  const handleRemoveHolding = (coinId: string) => {
    setHoldings((prev) => {
      const next = prev.filter((h) => h.coinId !== coinId);
      localStorage.setItem("phantom_holdings", JSON.stringify(next));
      return next;
    });
  };

  const handleCurrencyToggle = () => {
    setCurrency((prev) => {
      const next = prev === "usd" ? "gbp" : "usd";
      localStorage.setItem("phantom_currency", next);
      return next;
    });
  };

  const tabs = ["Home", "Trade", "Predict", "Explore"];

  const speedDialItems = [
    { id: "send", label: "Send", icon: Send, onClick: () => {} },
    { id: "receive", label: "Receive", icon: QrCode, onClick: () => {} },
    { id: "add_cash", label: "Add Cash", icon: CircleDollarSign, onClick: () => { setIsPlusMenuOpen(false); setIsAddCashOpen(true); } },
    { id: "trade", label: "Trade", icon: ArrowLeftRight, onClick: () => {} },
  ];

  const hasHoldings = holdings.length > 0;

  const filteredCoins = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-[#000000] text-white font-sans flex flex-col justify-between selection:bg-[#a594fd] selection:text-black">
      
      {/* ── TOP HEADER (Matching Screenshot 2) ── */}
      <header className="sticky top-0 z-40 bg-[#000000]/95 backdrop-blur-md px-4 py-3 flex items-center space-x-3 border-b border-white/5">
        
        {/* Profile Avatar Button (Opens Left Drawer) */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="w-10 h-10 rounded-full bg-[#8fa1ff] flex items-center justify-center shrink-0 border border-white/10 hover:scale-105 transition-transform cursor-pointer"
        >
          <div className="w-6.5 h-6.5 rounded-full bg-[#fce886] flex items-center justify-center relative">
            <div className="w-2.5 h-1 bg-[#432c7a] rounded-full absolute top-2 left-1" />
            <div className="w-2.5 h-1 bg-[#432c7a] rounded-full absolute top-2 right-1" />
          </div>
        </button>

        {/* Horizontal Navigation Pills */}
        <nav className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#a594fd] text-[#000000] shadow-[0_0_12px_rgba(165,148,253,0.4)]"
                    : "bg-[#1c1c1e] text-gray-300 hover:bg-[#2c2c2e] hover:text-white"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </header>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full space-y-8 pb-28">

        {/* ── PORTFOLIO VIEW (when holdings exist) ── */}
        {hasHoldings ? (
          <PhantomPortfolioView
            holdings={holdings}
            coins={coins}
            currency={currency}
            usdToGbp={usdToGbp}
            onCurrencyToggle={handleCurrencyToggle}
            onRemoveHolding={handleRemoveHolding}
          />
        ) : (
          /* ── HERO BANNER & WELCOME TO PHANTOM ── */
          <div className="flex flex-col items-center text-center space-y-4 pt-4">
          
          {/* Custom 3D Wallet Graphic Illustration */}
          <div className="relative w-44 h-36 flex items-center justify-center my-2">
            
            {/* Background Purple Wallet Body */}
            <div className="absolute inset-x-2 bottom-0 h-24 bg-[#392e66] rounded-3xl border border-[#584898] shadow-2xl flex flex-col justify-end p-3">
              <div className="w-5 h-5 rounded-full bg-[#a594fd]/30 mx-auto mb-2" />
            </div>

            {/* Floating Items coming out of wallet */}
            {/* Solana Token Badge */}
            <div className="absolute top-1 right-2 w-11 h-11 rounded-full bg-[#000000] border-2 border-[#9945FF] flex items-center justify-center shadow-lg -rotate-12">
              <span className="text-[10px] font-extrabold text-[#14F195]">SOL</span>
            </div>

            {/* GPay Green Badge */}
            <div className="absolute top-4 left-6 px-3 py-1 rounded-xl bg-[#61cca6] text-[#083827] text-xs font-black shadow-md rotate-6">
              GPay
            </div>

            {/* Credit Card Graphic */}
            <div className="absolute top-0 left-2 w-12 h-14 rounded-xl bg-gradient-to-tr from-[#f3d060] to-[#f8e59e] shadow-md -rotate-45 border border-white/20" />

            {/* Phantom Ghost Icon */}
            <div className="absolute top-6 left-14 w-10 h-11 rounded-t-full bg-white flex items-center justify-center shadow-md">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]" />
              </div>
            </div>

          </div>

          {/* Welcome Text */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome to Phantom
            </h1>
            <p className="text-sm text-gray-400 font-medium">
              Add cash or crypto to start trading
            </p>
          </div>

          {/* Add Funds Button (Exact soft purple color match) */}
          <button
            type="button"
            className="w-full py-4 px-6 rounded-full bg-[#a594fd] hover:bg-[#b6a7ff] text-[#000000] font-extrabold text-base transition-all cursor-pointer shadow-[0_4px_20px_rgba(165,148,253,0.3)] active:scale-[0.99]"
          >
            Add Funds
          </button>
          </div>
        )}

        {/* ── TRENDING TOKENS SECTION (Live CoinGecko Data) ── */}
        <div className="space-y-4 pt-2">
          
          {/* Section Header with last-updated pulse */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={fetchPrices}
              className="flex items-center space-x-1 text-xl font-extrabold text-white hover:text-[#a594fd] transition-colors cursor-pointer"
            >
              <span>Trending</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            {lastUpdated && (
              <span className="text-[10px] font-semibold text-gray-600">
                Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>

          {/* Token List */}
          <div className="space-y-2">
            {isLoading ? (
              // Skeleton loading state
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-[#09090b] border border-white/5 animate-pulse">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#1c1c1e]" />
                    <div className="space-y-2">
                      <div className="w-20 h-3.5 rounded-full bg-[#1c1c1e]" />
                      <div className="w-14 h-2.5 rounded-full bg-[#1c1c1e]" />
                    </div>
                  </div>
                  <div className="space-y-2 items-end flex flex-col">
                    <div className="w-16 h-3.5 rounded-full bg-[#1c1c1e]" />
                    <div className="w-12 h-2.5 rounded-full bg-[#1c1c1e]" />
                  </div>
                </div>
              ))
            ) : filteredCoins.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">No tokens found</div>
            ) : (
              filteredCoins.map((coin) => {
                const isPositive = coin.change24h >= 0;
                return (
                  <div
                    key={coin.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#09090b] hover:bg-[#0f0f12] border border-white/5 transition-all cursor-pointer group"
                  >
                    {/* Token Icon & Name */}
                    <div className="flex items-center space-x-3.5">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#1c1c1e] border border-white/10 shrink-0">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/img.jpeg"; }}
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-extrabold text-base text-white group-hover:text-[#a594fd] transition-colors">
                            {coin.name}
                          </span>
                          <CheckCircle2 className="w-4 h-4 text-[#8b79f6] fill-[#8b79f6]/20" />
                        </div>
                        <div className="text-xs font-semibold text-gray-500">
                          {formatMarketCap(coin.marketCap)}
                        </div>
                      </div>
                    </div>

                    {/* Price & Change */}
                    <div className="text-right">
                      <div className="font-extrabold text-base text-white font-mono">
                        {formatPrice(coin.price)}
                      </div>
                      <div className={`text-xs font-bold font-mono ${
                        isPositive ? "text-emerald-400" : "text-red-400"
                      }`}>
                        {isPositive ? "+" : ""}{coin.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

      </main>

      {/* ── SPEED DIAL BACKDROP OVERLAY ── */}
      {isPlusMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#000000]/80 backdrop-blur-sm animate-fadeIn transition-opacity"
          onClick={() => setIsPlusMenuOpen(false)}
        />
      )}

      {/* ── FIXED BOTTOM SEARCH & ACTION BAR (Matching Reference Image) ── */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#000000] via-[#000000]/95 to-transparent pt-3 pb-5 px-4">
        
        {/* Speed Dial Menu Items Vertical Stack (Matches Reference Image) */}
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
                  {/* Option Label */}
                  <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-[#a594fd] transition-colors">
                    {item.label}
                  </span>

                  {/* Option Soft Purple Icon Circle */}
                  <div className="w-12 h-12 rounded-full bg-[#a594fd] hover:bg-[#b6a7ff] text-[#000000] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(165,148,253,0.4)] transition-all">
                    <IconComponent className="w-6 h-6 stroke-[2.5]" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          
          {/* Pill Search Input Bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#6e6e78] absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Phantom"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#1b1a22] border border-white/5 text-white text-base placeholder-[#6e6e78] focus:outline-none focus:border-[#a594fd]/50 transition-all font-medium"
            />
          </div>

          {/* Floating Circle Action Button (+) / (X) */}
          <button
            type="button"
            onClick={() => setIsPlusMenuOpen(!isPlusMenuOpen)}
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 active:scale-95 ${
              isPlusMenuOpen
                ? "bg-[#2c2c2e] text-white border border-white/20 shadow-lg rotate-90"
                : "bg-[#a594fd] hover:bg-[#b6a7ff] text-[#000000] shadow-[0_0_20px_rgba(165,148,253,0.35)]"
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
