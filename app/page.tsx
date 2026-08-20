"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Wallet,
  Download,
  ShieldCheck,
  Zap,
  Star,
  Lock,
  Layers,
  X,
  ChevronRight,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import LoginModal from "@/components/LoginModal";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#08061a] text-white flex flex-col font-sans relative selection:bg-[#7c5ce8] selection:text-white pt-14">

      {/* Background Ambient Spotlights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#7c5ce8]/14 rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#5b3fc4]/06 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#4a2db8]/06 rounded-full blur-[200px] pointer-events-none" />

      {/* NAVBAR */}
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-16 sm:pt-20 pb-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center">

        {/* Live badge */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full badge-pitch-purple text-[11px] sm:text-xs font-semibold tracking-wide mb-5 sm:mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] animate-pulse" />
          Now available on iOS &amp; Android
        </div>

        {/* Tagline — two lines, clean professional style */}
        <div className="mb-4 sm:mb-5 space-y-0.5 sm:space-y-1">
          <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight text-white">
            Fake it till
          </p>
          <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight hero-olive-text">
            You Make It.
          </p>
        </div>

        {/* H1 */}
        <h1 className="text-xs sm:text-sm md:text-base font-semibold text-[#a78bfa] tracking-widest uppercase mb-4 sm:mb-5">
          The #1 Fake Crypto Wallet App
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-xl leading-relaxed mb-6 sm:mb-8 px-2">
          Display any balance on a pixel-perfect Phantom Wallet, Trust Wallet, Ledger, or Exodus interface. Live prices, custom tokens, push notifications — built purely for entertainment.
        </p>

        {/* Price display */}
        <div className="flex items-baseline justify-center gap-2 sm:gap-3 mb-3">
          <span className="text-2xl sm:text-3xl font-bold text-gray-500 line-through font-mono">$30</span>
          <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">$15</span>
          <span className="text-xs sm:text-sm text-gray-400 font-medium">starting price</span>
        </div>

        {/* Discount badge */}
        <div className="hero-price-badge mb-6 sm:mb-8 text-[11px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-[#a78bfa]" />
          Regional discount: 50% off
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full btn-hero-primary flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Get Larp Wallet
          </button>
          <a
            href="https://t.me/larpzwalletcom"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full btn-hero-ghost flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="16" width="16" viewBox="0 0 640 640">
              <path d="M320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM435 240.7C431.3 279.9 415.1 375.1 406.9 419C403.4 437.6 396.6 443.8 390 444.4C375.6 445.7 364.7 434.9 350.7 425.7C328.9 411.4 316.5 402.5 295.4 388.5C270.9 372.4 286.8 363.5 300.7 349C304.4 345.2 367.8 287.5 369 282.3C369.2 281.6 369.3 279.2 367.8 277.9C366.3 276.6 364.2 277.1 362.7 277.4C360.5 277.9 325.6 300.9 258.1 346.5C248.2 353.3 239.2 356.6 231.2 356.4C222.3 356.2 205.3 351.4 192.6 347.3C177.1 342.3 164.7 339.6 165.8 331C166.4 326.5 172.5 322 184.2 317.3C256.5 285.8 304.7 265 328.8 255C397.7 226.4 412 221.4 421.3 221.2C423.4 221.2 427.9 221.7 430.9 224.1C432.9 225.8 434.1 228.2 434.4 230.8C434.9 234 435 237.3 434.8 240.6z" />
            </svg>
            Join Telegram
          </a>
        </div>
      </section>

      {/* ── PHONE MOCKUP FLOATING DISPLAY (Up & Down Slow Animation) ── */}
      <section className="relative w-full py-10 overflow-hidden">

        {/* Subtle purple glow behind the phones */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(124,92,232,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="phone-float-container relative z-10">
          <img
            src="/mockup-phone 4.webp"
            alt="Phantom / Ghost Wallet simulator"
            className="phone-mockup-float float-phone-1"
          />
          <img
            src="/mockup-phone-l.webp"
            alt="Trust Wallet simulator"
            className="phone-mockup-float float-phone-2"
          />
          <img
            src="/mockup-phone-2.webp"
            alt="Exodus Wallet simulator"
            className="phone-mockup-float float-phone-3"
          />
          <img
            src="/mockup-phone-3.webp"
            alt="Ledger Live simulator"
            className="phone-mockup-float float-phone-4"
          />
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-[#a78bfa] uppercase">
            Designed For Content Creators
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Built 100% For Fun &amp; Pranks
          </h2>
          <p className="text-base text-gray-300 font-normal">
            Override balances instantly, trigger deposit push alerts on cue, and simulate peer-to-peer transfers with zero risk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl glass-card-dark border border-white/8 hover:border-[#7c5ce8]/40 transition-all space-y-4">
            <div className="w-11 h-11 rounded-2xl bg-[#7c5ce8]/15 border border-[#7c5ce8]/30 flex items-center justify-center text-[#a78bfa]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Pixel-Perfect Signature UI</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Built with sub-pixel precision mirroring authentic wallet layouts for high-resolution screenshots &amp; video creation.</p>
          </div>
          <div className="p-7 rounded-3xl glass-card-dark border border-white/8 hover:border-[#7c5ce8]/40 transition-all space-y-4">
            <div className="w-11 h-11 rounded-2xl bg-[#7c5ce8]/15 border border-[#7c5ce8]/30 flex items-center justify-center text-[#a78bfa]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Trigger Mock Deposit Alerts</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Send real-time simulated incoming crypto push notifications directly to your phone on cue for pristine video production.</p>
          </div>
          <div id="security" className="p-7 rounded-3xl glass-card-dark border border-white/8 hover:border-[#7c5ce8]/40 transition-all space-y-4">
            <div className="w-11 h-11 rounded-2xl bg-[#7c5ce8]/15 border border-[#7c5ce8]/30 flex items-center justify-center text-[#a78bfa]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Zero Data &amp; 100% Safe</h3>
            <p className="text-sm text-gray-400 leading-relaxed">No seed phrases or private keys required. Completely risk-free simulator operating 100% locally.</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/features" className="inline-flex items-center gap-2 text-xs font-bold text-[#a78bfa] hover:text-white underline underline-offset-4 transition-colors">
            <span>Explore All Interactive Features</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── FAQ SECTION (Below Features) ── */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/8 w-full">
        <div className="text-left mb-12 space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#a78bfa] uppercase">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Is Larpz Wallet a real crypto wallet?",
              a: "No. Larpz Wallet is an entertainment app only — it does not hold, send, receive, or interact with any real crypto assets. No seed phrases or private keys are ever asked for or stored. It is a display app that shows custom balances on a realistic wallet interface."
            },
            {
              q: "Will it look exactly like the real crypto apps?",
              a: "Yes. Each wallet is designed to be pixel-perfect — identical to the real app on mobile. Prices are pulled live from CoinGecko, the 24-hour chart is interactive, and the send flow screens look and behave like the real thing."
            },
            {
              q: "Does it work on iPhone and Android?",
              a: "Yes. Larpz Wallet is a PWA (Progressive Web App) that installs directly to your home screen. Use Safari on iOS or Chrome on Android — no App Store download required."
            },
            {
              q: "Can I add custom tokens or memecoins?",
              a: "Yes. On the apps, you can add any Solana or Ethereum token by contract address. The app fetches the live price and token image from DexScreener automatically."
            },
            {
              q: "How do I receive my license key after purchase?",
              a: "Delivery is fully automated. Once your crypto payment is detected on-chain, your unique license key is generated and displayed on the order status page — usually within a few minutes."
            },
            {
              q: "What's the difference between the wallets?",
              a: "All plans include all four wallets: Phantom Wallet (supports memecoins), Trust Wallet (multi-chain look), Ledger (hardware wallet style), and Exodus (multi-chain portfolio view)."
            },
            {
              q: "Is my payment anonymous?",
              a: "Crypto payments (SOL, ETH, BNB, BTC, TRX, USDT) require no personal information at all. Card payments require an email address, which is passed directly to the payment processor and not stored by us."
            }
          ].map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className={`p-6 rounded-2xl glass-card-dark border transition-all duration-300 select-none cursor-pointer ${
                  isOpen ? "border-[#7c5ce8]/40 shadow-[0_0_20px_rgba(124,92,232,0.15)] bg-[#0c0926]" : "border-white/8 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-base sm:text-lg text-white">
                  <span className={isOpen ? "text-[#c4b5fd] transition-colors" : "text-white transition-colors"}>{faq.q}</span>
                  <span className={`ml-4 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isOpen ? "bg-[#7c5ce8]/20 border border-[#7c5ce8]/40 text-[#a78bfa] rotate-45" : "bg-white/5 border border-white/10 text-gray-400"
                  }`}>
                    +
                  </span>
                </div>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/8" : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 border-transparent"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── REVIEWS (INFINITE MARQUEE CAROUSEL) ── */}
      <section id="reviews" className="py-20 border-t border-white/8 overflow-hidden w-full">
        <div className="text-center max-w-3xl mx-auto mb-14 px-4 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-[#a78bfa] uppercase">Verified Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Loved By Content Creators &amp; Streamers</h2>
          <div className="flex items-center justify-center gap-1 text-amber-400 pt-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            <span className="text-xs text-gray-300 font-bold ml-2">5.0 / 5.0 Rating</span>
          </div>
        </div>

        {/* Infinite Marquee Carousel Track */}
        <div className="reviews-marquee-container">
          <div className="reviews-marquee-track">
            {[
              { name: "Abankek", role: "via Telegram", comment: "Appreciate the fast reply and the help, thank you. Works great on iPhone 12" },
              { name: "John Stockton", role: "via Telegram", comment: "Bought the lifetime key, amazing and fast service thank you so much!" },
              { name: "Kal", role: "via Telegram", comment: "Cheers bro, great product vouch +1. Indistinguishable from normal app" },
              { name: "Gvems", role: "via Telegram", comment: "Vouch Larpz Wallet works perfect for the price 10/10" },
              { name: "Alex Vance", role: "Content Creator", comment: "The signature Larp Wallet UI fidelity is perfection. Best fake wallet app for videos and screenshots!" },
              { name: "Elena Rostova", role: "Streamer", comment: "Custom token creation and instant balance configuration takes under 10 seconds. Ultra-smooth design." },
              { name: "Marcus Chen", role: "Meme Page Admin", comment: "Mock deposit alerts work flawlessly on cue. Hilarious pranks with friends!" },
              { name: "Ethan", role: "via Telegram", comment: "Thanks bro, huge vouch for you, very helpful and fast service instantly fixed my issue" },
              { name: "Tokarz", role: "via Telegram", comment: "Thank you so much, everything working! Best larp wallet out there" },
              { name: "jasjasjas", role: "via Telegram", comment: "Heavy vouch, support fast asf and services are goated" }
            ].concat([
              { name: "Abankek", role: "via Telegram", comment: "Appreciate the fast reply and the help, thank you. Works great on iPhone 12" },
              { name: "John Stockton", role: "via Telegram", comment: "Bought the lifetime key, amazing and fast service thank you so much!" },
              { name: "Kal", role: "via Telegram", comment: "Cheers bro, great product vouch +1. Indistinguishable from normal app" },
              { name: "Gvems", role: "via Telegram", comment: "Vouch Larpz Wallet works perfect for the price 10/10" },
              { name: "Alex Vance", role: "Content Creator", comment: "The signature Larp Wallet UI fidelity is perfection. Best fake wallet app for videos and screenshots!" },
              { name: "Elena Rostova", role: "Streamer", comment: "Custom token creation and instant balance configuration takes under 10 seconds. Ultra-smooth design." },
              { name: "Marcus Chen", role: "Meme Page Admin", comment: "Mock deposit alerts work flawlessly on cue. Hilarious pranks with friends!" },
              { name: "Ethan", role: "via Telegram", comment: "Thanks bro, huge vouch for you, very helpful and fast service instantly fixed my issue" },
              { name: "Tokarz", role: "via Telegram", comment: "Thank you so much, everything working! Best larp wallet out there" },
              { name: "jasjasjas", role: "via Telegram", comment: "Heavy vouch, support fast asf and services are goated" }
            ]).map((rev, idx) => (
              <div key={idx} className="review-card-item p-6 rounded-3xl glass-card-dark border border-white/8 space-y-4">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
                <div className="pt-2 border-t border-white/8 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{rev.name}</span>
                  <span className="text-gray-500">{rev.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/8 bg-[#05040f]/80 py-10 text-xs text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-[#7c5ce8]/50 shadow-[0_0_12px_rgba(124,92,232,0.4)] group-hover:shadow-[0_0_20px_rgba(124,92,232,0.7)] transition-all">
              <img
                src="/img.jpeg"
                alt="Larp Wallet Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-white text-sm group-hover:text-[#c4b5fd] transition-colors">LARP WALLET</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 font-medium">
            <Link href="/" className="hover:text-[#a78bfa] transition-colors">Home</Link>
            <Link href="/features" className="hover:text-[#a78bfa] transition-colors">Features</Link>
            <Link href="/how-it-works" className="hover:text-[#a78bfa] transition-colors">How It Works</Link>
            <Link href="/pricing" className="hover:text-[#a78bfa] transition-colors">Pricing</Link>
            <Link href="/reviews" className="hover:text-[#a78bfa] transition-colors">Reviews</Link>
          </div>
          <div className="text-gray-600 font-mono text-[11px]">
            © {new Date().getFullYear()} Larp Wallet. Built 100% for fun.
          </div>
        </div>
      </footer>

      {/* ── LOGIN MODAL ── */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

    </div>
  );
}
