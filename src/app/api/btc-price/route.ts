import { NextResponse } from "next/server";

const BTC_PRICE_EXTERNAL_TIME_API = `${process.env.COIN_API}exchangerate/BTC/USD/history`;
const BTC_PRICE_BACKUP_API = `https://api.coincap.io/v2/assets?ids=bitcoin`;

export type BitcoinPriceReturn = {
  price: number;
  isBitcoinUp: boolean;
};

const fetchCoinApiPrice = async (): Promise<BitcoinPriceReturn> => {
  const now = new Date();
  const yesterday = new Date(now);

  yesterday.setDate(now.getDate() - 1);

  const params = `period_id=1DAY&time_start=${yesterday.toISOString()}&time_end=${now.toISOString()}`;

  const response = await fetch(`${BTC_PRICE_EXTERNAL_TIME_API}?${params}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
      "X-CoinAPI-Key": process.env.COIN_KEY ?? "",
    },
  });

  if (!response.ok) throw new Error();

  const data = await response.json();

  return {
    price: data[0].rate_close,
    isBitcoinUp: data[0].rate_close >= data[0].rate_open,
  };
};

const fetchBackupApiPrice = async (): Promise<BitcoinPriceReturn> => {
  const response = await fetch(BTC_PRICE_BACKUP_API, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error();

  const backupData = await response.json();

  return {
    price: Number(backupData.data[0].priceUsd),
    isBitcoinUp: Number(backupData.data[0].changePercent24Hr) >= 0,
  };
};

export async function GET() {
  try {
    const primaryData = await fetchCoinApiPrice();
    return NextResponse.json(primaryData);
  } catch (error) {
    try {
      const backupData = await fetchBackupApiPrice();
      return NextResponse.json(backupData);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch BTC price" },
        { status: 500 }
      );
    }
  }
}

export const dynamic = "force-dynamic";
