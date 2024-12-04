import { NextResponse } from "next/server";

const BTC_PRICE_EXTERNAL_TIME_API = `${process.env.COIN_API}exchangerate/BTC/USD/history`;

export type CoinApiTimeReturn = {
  time_period_start: string;
  time_period_end: string;
  time_open: string;
  rate_open: number;
  rate_high: number;
  rate_low: number;
  rate_close: number;
};

export async function GET() {
  try {
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

    const data: CoinApiTimeReturn[] = await response.json();

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch BTC price" },
      { status: 500 }
    );
  }
}
