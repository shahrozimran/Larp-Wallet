import { NextResponse } from "next/server";

// CoinGecko coin IDs for tokens shown in the Phantom trending list
const COIN_IDS = [
  "fartcoin",
  "popcat",
  "spx6900",
  "peanut-the-squirrel",
  "bonk",
  "solana",
  "bitcoin",
  "ethereum",
];

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function GET() {
  const apiKey = process.env.COINGECKO_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(",")}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`,
      {
        headers: {
          "x-cg-demo-api-key": apiKey,
          Accept: "application/json",
        },
        // Revalidate every 60 seconds
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("CoinGecko API error:", res.status, errorText);
      return NextResponse.json(
        { error: `CoinGecko API returned ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Map to a simpler format for the Phantom UI
    const coins = data.map((coin: {
      id: string;
      symbol: string;
      name: string;
      image: string;
      current_price: number;
      market_cap: number;
      price_change_percentage_24h: number;
    }) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.image,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
    }));

    return NextResponse.json({ coins, updatedAt: Date.now() });
  } catch (err) {
    console.error("Failed to fetch from CoinGecko:", err);
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
  }
}
