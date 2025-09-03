import { FormikHelpers } from "formik";

import {
  DAYS,
  DaySchedule,
  ITrainDetailsModalProps,
  ScheduleRow,
  TrainForm,
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

const useTrainDetailsModal = ({
  onSubmit,
  initial,
}: Pick<ITrainDetailsModalProps, "initial" | "onSubmit">) => {
  const onModalSubmit = async (
    values: TrainForm,
    helpers: FormikHelpers<TrainForm>
  ): Promise<void> => {
    helpers.setStatus(undefined);

    const isEdit = Boolean(values.id);
    const url = isEdit ? `/api/trains/${values.id}` : `/api/trains`;
    const payload = toApiPayload(values);

    try {
      const { data } = isEdit
        ? await axios.put(url, payload)
        : await axios.post(url, payload);

      onSubmit(fromApiPayload(data));
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      helpers.setSubmitting(false);
    }
  };

  const initialValues: TrainForm = {
    id: initial?.id,
    number: initial?.number ?? "",
    from: initial?.from ?? "",
    to: initial?.to ?? "",
    schedule: ensureSevenDaysUI(initial?.schedule),
  };

  const scheduleRows = (values: TrainForm): ScheduleRow[] =>
    values.schedule.map((r, idx) => ({
      id: r.day,
      day: r.day,
      runs: r.runs,
      base: `schedule.${idx}`,
    }));

  function ensureSevenDaysUI(incoming?: DaySchedule[]): DaySchedule[] {
    const map = new Map((incoming ?? []).map((i) => [i.day, i]));
    return DAYS.map(
      (d) => map.get(d) ?? { day: d, runs: false, departure: "", arrival: "" }
    );
  }

  const toApiPayload = (f: TrainForm) => ({
    number: f.number.trim(),
    from: f.from.trim(),
    to: f.to.trim(),
    schedule: f.schedule.map((r) => ({
      day: r.day,
      runs: r.runs,
      departure: r.runs ? r.departure || null : null,
      arrival: r.runs ? r.arrival || null : null,
    })),
  });

  const fromApiPayload = (api: TrainForm): TrainForm => ({
    id: api.id,
    number: api.number,
    from: api.from,
    to: api.to,
    schedule: ensureSevenDaysUI(
      (api.schedule ?? []).map((s: DaySchedule) => ({
        day: s.day,
        runs: !!s.runs,
        departure: s.departure ?? "",
        arrival: s.arrival ?? "",
      }))
    ),
  });

  return {
    fromApiPayload,
    onModalSubmit,
    initialValues,
    toApiPayload,
    scheduleRows,
    ensureSevenDaysUI,
  };
};

export default useTrainDetailsModal;
