export type DayApi = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
export type ApiSchedule = {
  day: DayApi;
  runs: boolean;
  departure: string | null;
  arrival: string | null;
};
export type ApiTrain = {
  id: string;
  number: string;
  from: string;
  to: string;
  schedules: ApiSchedule[];
};

export type Row = {
  id: string;
  to: string;
  from: string;
  arrival: string;
  departure: string;
};

export type SortKey =
  | "depAsc"
  | "depDesc"
  | "fromAsc"
  | "fromDesc"
  | "toAsc"
  | "toDesc";

export const JS_DAY_TO_API: DayApi[] = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
];
