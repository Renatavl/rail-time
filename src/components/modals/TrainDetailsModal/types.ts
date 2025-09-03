export type DaySchedule = {
  day: string;
  runs: boolean;
  departure: string;
  arrival: string;
};

export type TrainForm = {
  id?: string;
  number: string;
  from: string;
  to: string;
  schedule: DaySchedule[];
};

export type ITrainDetailsModalProps = {
  open: boolean;
  initial?: TrainForm;
  onClose: () => void;
  onSubmit: (data: TrainForm) => void;
};

export const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export type ScheduleRow = {
  id: string;
  day: string;
  runs: boolean;
  base: string;
};
