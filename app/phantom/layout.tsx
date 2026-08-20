import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Phantom Wallet",
  description: "Phantom Crypto & Solana Wallet",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Phantom",
  },
  icons: {
    icon: "/Phantom 2.png",
    apple: "/Phantom 2.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function PhantomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Phantom" />
        <link rel="apple-touch-icon" href="/Phantom 2.png" />
      </head>
      <div className="min-h-screen bg-[#000000] text-white">
        {children}
      </div>
    </>
  );
}
