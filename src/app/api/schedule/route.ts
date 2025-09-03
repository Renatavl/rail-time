import { trainService } from "@/server/services/trainService";
import { NextResponse } from "next/server";

type DayApi = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const day = sp.get("day") as DayApi | null;
  const q = sp.get("q")?.trim() || undefined;

  const sortBy = (sp.get("sortBy") || "departure") as
    | "departure"
    | "from"
    | "to"
    | "number";
  const order = (sp.get("order") === "desc" ? "desc" : "asc") as "asc" | "desc";

  if (!day) {
    return NextResponse.json(
      { message: "Param 'day' is required" },
      { status: 400 }
    );
  }

  const items = await trainService.listByDay({ day, q, sortBy, order });
  return NextResponse.json({ items });
}
