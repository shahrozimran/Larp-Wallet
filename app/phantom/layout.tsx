import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Phantom Wallet",
  description: "Phantom Crypto & Solana Wallet",
  manifest: "/phantom-manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Phantom",
  },
  icons: {
    icon: "/phantom-icon.png",
    apple: "/phantom-icon.png",
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
        <link rel="manifest" href="/phantom-manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Phantom" />
        <link rel="apple-touch-icon" href="/phantom-icon.png" />
      </head>
      <div className="min-h-screen bg-[#000000] text-white">
        {children}
      </div>
    </>
  );
}
