"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Wallet,
  Star,
  CheckCircle2,
  ChevronRight,
  Activity,
  ArrowUpRight,
  Flame,
  ShieldCheck,
  Lock,
  Layers,
  X,
  Sparkles,
  Quote,
  MessageSquare,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import LoginModal from "@/components/LoginModal";

const reviewsData = [
  {
    id: 1,
    name: "Alex Vance",
    handle: "@alexvance_creator",
    role: "Content Creator",
    category: "creators",
    comment: "The signature Larp Wallet UI fidelity is perfection. Sub-pixel accuracy across custom token balances makes video production 10x faster!",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Elena Rostova",
    handle: "@elenarostova_tv",
    role: "Twitch Streamer",
    category: "streamers",
    comment: "Custom token creation and instant balance configuration takes under 10 seconds. Ultra-smooth design and zero lag on live streams.",
    date: "3 days ago",
  },
  {
    id: 3,
    name: "Marcus Chen",
    handle: "@marcus_flexes",
    role: "Meme Page Admin",
    category: "meme",
    comment: "Mock deposit alerts work flawlessly on cue. Hilarious pranks with friends and pristine screenshots for my 200k follower page!",
    date: "4 days ago",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    handle: "@sarah_web3",
    role: "YouTube Creator",
    category: "creators",
    comment: "Hands down the cleanest fake wallet UI on the market. Setting up $1.4M ETH balances for thumbnail shots takes literally 5 seconds.",
    date: "5 days ago",
  },
  {
    id: 5,
    name: "David Kim",
    handle: "@davekim_fx",
    role: "TikTok Editor",
    category: "editors",
    comment: "The PWA mobile installation is so clean! Runs full-screen on my iPhone without any app store downloads. Perfect for quick skits.",
    date: "6 days ago",
  },
  {
    id: 6,
    name: "Liam O'Connor",
    handle: "@liam_mod",
    role: "Discord Admin",
    category: "meme",
    comment: "Peer-to-peer simulated transfers are insane! Sent 50 SOL in a mock transaction to my friend's Larp Wallet live on call.",
    date: "1 week ago",
  },
  {
    id: 7,
    name: "Sophia Thorne",
    handle: "@sophiathorne_fx",
    role: "Web3 Influencer",
    category: "creators",
    comment: "Zero data collected and 100% client-side. I love that I don't need seed phrases or real keys just to make aesthetic content.",
    date: "1 week ago",
  },
  {
    id: 8,
    name: "Carlos Rodriguez",
    handle: "@carlos_edits",
    role: "Video Producer",
    category: "editors",
    comment: "We produce high-budget YouTube videos and Larp Wallet has saved us hours in post-production graphics. Everything looks 1:1 authentic.",
    date: "1 week ago",
  },
  {
    id: 9,
    name: "Hannah Abbott",
    handle: "@hannah_stream",
    role: "Kick Streamer",
    category: "streamers",
    comment: "The dark olive theme looks incredibly premium. My chat thought I actually hit a 500x coin live on stream!",
    date: "2 weeks ago",
  },
  {
    id: 10,
    name: "Brandon Lee",
    handle: "@brandon_vlogs",
    role: "Vlogger",
    category: "creators",
    comment: "Super intuitive setup. Enter your key, open the PWA, and you have instant authority over any simulated portfolio balance.",
    date: "2 weeks ago",
  },
  {
    id: 11,
    name: "Ryan Reynolds",
    handle: "@ryan_shorts",
    role: "Shorts Creator",
    category: "editors",
    comment: "Pristine iOS Dynamic Island status bar mockup. Screenshots look crisp even on 4K monitors.",
    date: "2 weeks ago",
  },
  {
    id: 12,
    name: "Jessica Taylor",
    handle: "@jess_podcasts",
    role: "Crypto Podcaster",
    category: "creators",
    comment: "Best entertainment tool for video creators. Clean aesthetic, black and olive green color scheme is top tier.",
    date: "2 weeks ago",
  },
  {
    id: 13,
    name: "Tyler Smith",
    handle: "@tyler_flexes",
    role: "Instagram Creator",
    category: "creators",
    comment: "Instant push deposit notifications on screen on cue! Used it for a viral reel that hit 1.2M views.",
    date: "3 weeks ago",
  },
  {
    id: 14,
    name: "Maya Patel",
    handle: "@maya_creative",
    role: "Creative Director",
    category: "editors",
    comment: "Architected brilliantly. The floating dock navbar and dark glass cards give this tool an ultra-luxury vibe.",
    date: "3 weeks ago",
  },
  {
    id: 15,
    name: "Jordan Blake",
    handle: "@jordan_live",
    role: "Twitch Streamer",
    category: "streamers",
    comment: "10/10 rating. Unbelievably easy to use and 100% safe. Highly recommended for any streamer doing parody content.",
    date: "3 weeks ago",
  },
  {
    id: 16,
    name: "Chloe Dubois",
    handle: "@chloe_web3",
    role: "Content Creator",
    category: "creators",
    comment: "Simulated peer transfers work live without latency. Super fun for making skits with friends.",
    date: "1 month ago",
  },
  {
    id: 17,
    name: "Dylan Wright",
    handle: "@dylan_memes",
    role: "Meme Creator",
    category: "meme",
    comment: "The #1 fake portfolio app without question. Cleanest UI, zero ads, and instant customization.",
    date: "1 month ago",
  },
  {
    id: 18,
    name: "Samantha Ray",
    handle: "@samray_art",
    role: "NFT Artist",
    category: "creators",
    comment: "Love the custom token generator! Customized my own NFT collection balances for aesthetic presentation.",
    date: "1 month ago",
  },
  {
    id: 19,
    name: "Nathan Drake",
    handle: "@ndrake_vlogs",
    role: "Vlogger",
    category: "creators",
    comment: "Smooth performance on iOS Safari PWA. Never crashes and loads in under a second.",
    date: "1 month ago",
  },
  {
    id: 20,
    name: "Zoe Kravitz",
    handle: "@zoe_stream",
    role: "Streamer",
    category: "streamers",
    comment: "Customer support sent my license key via Telegram in less than 2 minutes. Outstanding service!",
    date: "1 month ago",
  },
  {
    id: 21,
    name: "Lucas Miller",
    handle: "@lucas_fx",
    role: "Video Producer",
    category: "editors",
    comment: "Sub-pixel UI fidelity makes zooming in on B-roll shots look authentic. Great tool for filmmakers.",
    date: "1 month ago",
  },
  {
    id: 22,
    name: "Olivia Wilde",
    handle: "@olivia_yt",
    role: "YouTube Creator",
    category: "creators",
    comment: "Overriding BTC and SOL balances in real time is a game-changer for script readings.",
    date: "1 month ago",
  },
  {
    id: 23,
    name: "Noah Gabriel",
    handle: "@noah_mod",
    role: "Discord Admin",
    category: "meme",
    comment: "Simple 3-step activation process. Bought key, activated in app, ready to flex in 60 seconds.",
    date: "1 month ago",
  },
  {
    id: 24,
    name: "Emma Watson",
    handle: "@emma_crypto",
    role: "Web3 Creator",
    category: "creators",
    comment: "Elegance, privacy, and zero risk. The best fake crypto wallet application built for creators.",
    date: "1 month ago",
  },
];

export default function ReviewsPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "creators" | "streamers" | "meme" | "editors">("all");
  const router = useRouter();

  const filteredReviews = activeTab === "all"
    ? reviewsData
    : reviewsData.filter(r => r.category === activeTab);

  return (
    <div className="min-h-screen bg-[#08061a] text-white flex flex-col font-sans relative selection:bg-[#7c5ce8] selection:text-white pt-14">
      
      {/* Background Ambient Spotlights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#7c5ce8]/14 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#4a2db8]/08 rounded-full blur-[180px] pointer-events-none" />

      {/* CENTRALIZED NAVBAR */}
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />

      {/* HERO HEADER */}
      <section className="relative pt-10 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full badge-pitch-purple text-xs font-mono font-bold tracking-widest uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#a78bfa]" />
          <span>VERIFIED TESTIMONIALS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.15]">
          <span className="hero-title-white block">Loved By 2,400+ Creators</span>
          <span className="hero-olive-text block mt-2">&amp; Streamers Worldwide.</span>
        </h1>

        {/* Rating Metrics Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-8 p-4 px-6 rounded-2xl glass-card-dark border border-white/10 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold text-white text-sm">5.0 / 5.0 Rating</span>
          </div>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <div className="flex items-center space-x-2 text-gray-300">
            <Users className="w-4 h-4 text-[#a78bfa]" />
            <span>2,480+ Active Users</span>
          </div>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <div className="flex items-center space-x-2 text-[#a78bfa] font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Satisfaction Guaranteed</span>
          </div>
        </div>

      </section>

      {/* CATEGORY FILTER TABS */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold font-mono">
          {[
            { id: "all", label: `All Reviews (${reviewsData.length})` },
            { id: "creators", label: "Content Creators" },
            { id: "streamers", label: "Streamers" },
            { id: "meme", label: "Meme Pages & Mods" },
            { id: "editors", label: "Video Editors" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? "bg-[#7c5ce8] text-white shadow-[0_0_20px_rgba(124,92,232,0.4)]"
                  : "bg-white/5 text-gray-400 border border-white/8 hover:text-white hover:border-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* REVIEWS GRID SECTION — SLEEK & CLEAN */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#0c0926]/70 border border-white/8 hover:border-[#7c5ce8]/40 hover:shadow-[0_10px_30px_rgba(124,92,232,0.12)] transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Top Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">{rev.date}</span>
                </div>

                {/* Review Text Quote */}
                <p className="text-sm text-gray-300 leading-relaxed font-normal">
                  &ldquo;{rev.comment.replace("black and olive green", "black and purple")}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-3 border-t border-white/8 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c5ce8] to-[#4a2db8] flex items-center justify-center font-bold text-white text-xs shadow-md">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center space-x-1">
                      <span>{rev.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#a78bfa] shrink-0" />
                    </div>
                    <div className="text-[10px] font-mono text-gray-400">{rev.handle}</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#7c5ce8]/10 text-[10px] font-mono text-[#c4b5fd] border border-[#7c5ce8]/20">
                  {rev.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="rounded-3xl glass-card-dark border border-[#7c5ce8]/40 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-[0_0_40px_rgba(124,92,232,0.2)]">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#7c5ce8]/15 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Join 2,400+ Content Creators Today
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Experience uncompromised elegance and pixel-perfect wallet simulation across all your mobile devices.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="py-4 px-8 rounded-full btn-hero-primary font-bold text-sm tracking-wide cursor-pointer flex items-center space-x-2"
            >
              <span>Get Larp Wallet</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 glass-card-dark py-10 text-xs text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-[#7c5ce8]/50 shadow-[0_0_12px_rgba(124,92,232,0.4)] group-hover:shadow-[0_0_20px_rgba(124,92,232,0.7)] transition-all">
              <img
                src="/img.jpeg"
                alt="Larp Wallet Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-white text-base group-hover:text-[#c4b5fd] transition-colors">LARP WALLET</span>
          </Link>

          <div className="flex flex-wrap justify-center gap-6 text-gray-400 font-semibold">
            <Link href="/" className="hover:text-[#a78bfa] transition-colors">Home</Link>
            <Link href="/features" className="hover:text-[#a78bfa] transition-colors">Features</Link>
            <Link href="/how-it-works" className="hover:text-[#a78bfa] transition-colors">How It Works</Link>
            <Link href="/pricing" className="hover:text-[#a78bfa] transition-colors">Pricing</Link>
            <Link href="/reviews" className="text-[#a78bfa] font-bold">Reviews</Link>
          </div>

          <div className="text-gray-500 font-mono text-[11px]">
            © {new Date().getFullYear()} Larp Wallet. Built 100% for fun and pranks.
          </div>
        </div>
      </footer>

      {/* LOGIN & AUTHENTICATION MODAL */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

    </div>
  );
}
