import { NextResponse } from "next/server";

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function GET() {
  const apiKey = process.env.COINGECKO_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    // Fetch top 50 coins by market cap for rich search coverage
    const [marketsRes, gbpRes] = await Promise.all([
      fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`,
        {
          headers: { "x-cg-demo-api-key": apiKey, Accept: "application/json" },
          next: { revalidate: 60 },
        }
      ),
      fetch(
        `${BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd,gbp`,
        {
          headers: { "x-cg-demo-api-key": apiKey, Accept: "application/json" },
          next: { revalidate: 300 },
        }
      ),
    ]);

    if (!marketsRes.ok) {
      return NextResponse.json(
        { error: `CoinGecko API returned ${marketsRes.status}` },
        { status: marketsRes.status }
      );
    }

    const marketsData = await marketsRes.json();

    // Calculate USD → GBP rate from Bitcoin prices
    let usdToGbp = 0.79; // fallback
    if (gbpRes.ok) {
      const gbpData = await gbpRes.json();
      if (gbpData?.bitcoin?.gbp && gbpData?.bitcoin?.usd) {
        usdToGbp = gbpData.bitcoin.gbp / gbpData.bitcoin.usd;
      }
    }

    const coins = marketsData.map((coin: {
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
      change24h: coin.price_change_percentage_24h ?? 0,
    }));

    return NextResponse.json({ coins, usdToGbp, updatedAt: Date.now() });
  } catch (err) {
    console.error("Failed to fetch from CoinGecko:", err);
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
  }
}
