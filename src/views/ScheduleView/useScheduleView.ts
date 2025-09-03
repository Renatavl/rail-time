import { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ApiTrain, DayApi, JS_DAY_TO_API, Row, SortKey } from "./types";

function getTodayApiDay(): DayApi {
  const now = new Date();
  return JS_DAY_TO_API[now.getDay()];
}

function toBackendSort(sort: SortKey): {
  sortBy: "departure" | "from" | "to";
  order: "asc" | "desc";
} {
  switch (sort) {
    case "depAsc":
      return { sortBy: "departure", order: "asc" };
    case "depDesc":
      return { sortBy: "departure", order: "desc" };
    case "fromAsc":
      return { sortBy: "from", order: "asc" };
    case "fromDesc":
      return { sortBy: "from", order: "desc" };
    case "toAsc":
      return { sortBy: "to", order: "asc" };
    case "toDesc":
      return { sortBy: "to", order: "desc" };
    default:
      return { sortBy: "departure", order: "asc" };
  }
}

const useScheduleView = () => {
  const [day, setDay] = useState<DayApi>(getTodayApiDay());
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("depAsc");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDayChange = (
    _: React.MouseEvent<HTMLElement>,
    newDay: DayApi | null
  ) => {
    if (newDay) setDay(newDay);
  };

  const handleSortChange = (e: SelectChangeEvent<SortKey>) => {
    setSort(e.target.value as SortKey);
  };

  const loadSchedule = useCallback(
    async (signal: AbortSignal): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const { sortBy, order } = toBackendSort(sort);

        const params: Record<string, string> = {
          day,
          sortBy,
          order,
          ...(query.trim() ? { q: query.trim() } : {}),
        };

        const res = await axios.get("/api/schedule", {
          params,
          signal,
        });

        const items = res.data?.items ?? [];

        const mapped: Row[] = items
          .map((t: ApiTrain) => {
            const s =
              t.schedules.find((s) => s.day === day && s.runs) ||
              t.schedules[0];
            if (!s || !s.runs) return null;

            return {
              id: t.number,
              to: t.to,
              from: t.from,
              arrival: s.arrival ?? "—",
              departure: s.departure ?? "—",
            };
          })
          .filter((r: Row) => r !== null);

        setRows(mapped);
      } catch (error: unknown) {
        const isAxiosAbort =
          error instanceof AxiosError && error.code === "ERR_CANCELED";
        const isDomAbort =
          error instanceof DOMException && error.name === "AbortError";

        if (!isAxiosAbort && !isDomAbort) {
          setError("Failed to load schedule");
        }
      } finally {
        setLoading(false);
      }
    },
    [day, query, sort]
  );

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      void loadSchedule(controller.signal);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [day, loadSchedule, query, sort]);

  return {
    day,
    query,
    sort,
    loading,
    error,
    rows,
    setQuery,
    handleDayChange,
    handleSortChange,
  };
};

export default useScheduleView;
