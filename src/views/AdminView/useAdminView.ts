import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ApiSchedule,
  ApiTrain,
  DAY_ORDER,
  DayApi,
  Row,
  UiDaySchedule,
} from "./types";

const useAdminView = () => {
  const [data, setData] = useState<ApiTrain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [toDelete, setToDelete] = useState<ApiTrain | null>(null);

  const [openDetails, setOpenDetails] = useState(false);
  const [editing, setEditing] = useState<ApiTrain | null>(null);

  function mapApiToUiSchedules(schedules: ApiSchedule[]): UiDaySchedule[] {
    const byDay = new Map<DayApi, ApiSchedule>(
      schedules.map((s) => [s.day, s])
    );
    return DAY_ORDER.map((d) => {
      const s = byDay.get(d);
      if (!s) {
        return { day: d, runs: false, departure: "", arrival: "" };
      }
      return {
        day: d,
        runs: s.runs,
        departure: s.departure ?? "",
        arrival: s.arrival ?? "",
      };
    });
  }

  const makeEmptyUiSchedule = (): UiDaySchedule[] =>
    DAY_ORDER.map((d) => ({
      day: d,
      runs: false,
      departure: "",
      arrival: "",
    }));

  const handleOpenConfirmById = useCallback(
    (id: string) => {
      const row = data.find((x) => x.id === id);
      if (!row) return;
      setToDelete(row);
      setOpenConfirm(true);
    },
    [data]
  );

  const handleCloseConfirm = () => {
    setToDelete(null);
    setOpenConfirm(false);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!toDelete) return;

    const { id } = toDelete;

    try {
      await axios.delete(`/api/trains/${id}`);
      setData((prev) => prev.filter((train) => train.id !== id));
    } catch {
      toast.error("Failed to delete train");
    } finally {
      setToDelete(null);
      setOpenConfirm(false);
    }
  };

  const handleOpenCreate = () => {
    setEditing(null);
    setOpenDetails(true);
  };
  const handleOpenEditById = useCallback(
    (id: string) => {
      const row = data.find((x) => x.id === id);
      if (!row) return;
      setEditing(row);
      setOpenDetails(true);
    },
    [data]
  );

  const fetchList = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get<{ items: ApiTrain[] }>("/api/trains", {
        headers: { "Cache-Control": "no-store" },
      });

      const items = data?.items ?? [];
      setData(items);
    } catch {
      setError("Failed to load train list");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleSubmitDetails = () => {
    setOpenDetails(false);
    fetchList();
  };

  const rows: Row[] = useMemo(
    () =>
      data.map((t) => ({
        id: t.id,
        number: t.number,
        from: t.from,
        to: t.to,
      })),
    [data]
  );

  return {
    rows,
    error,
    loading,
    editing,
    openConfirm,
    openDetails,
    handleConfirm,
    setOpenDetails,
    handleOpenCreate,
    handleOpenEditById,
    handleCloseConfirm,
    mapApiToUiSchedules,
    makeEmptyUiSchedule,
    handleSubmitDetails,
    handleOpenConfirmById,
  };
};

export default useAdminView;
