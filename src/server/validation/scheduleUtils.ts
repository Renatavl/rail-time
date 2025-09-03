type Day = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
export const DAYS: Array<Day> = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
];

export function ensureSevenDays(
  incoming?: Array<{
    day: Day;
    runs: boolean;
    departure?: string | null;
    arrival?: string | null;
  }>
) {
  const map = new Map(incoming?.map((d) => [d.day, d]));
  return DAYS.map((day) => {
    const row = map.get(day);
    if (!row) return { day, runs: false, departure: null, arrival: null };
    return {
      day,
      runs: !!row.runs,
      departure: row.runs ? row.departure! : null,
      arrival: row.runs ? row.arrival! : null,
    };
  });
}
