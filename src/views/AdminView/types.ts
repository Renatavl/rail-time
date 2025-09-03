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

export type UiDaySchedule = {
  day: string;
  runs: boolean;
  departure: string;
  arrival: string;
};

export type Row = {
  id: string;
  number: string;
  from: string;
  to: string;
};

export const DAY_ORDER: DayApi[] = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
];
