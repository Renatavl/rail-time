import * as yup from "yup";

export const hhmm = /^([01]\d|2[0-3]):[0-5]\d$/;

const scheduleItem = yup.object({
  day: yup
    .mixed<"MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN">()
    .oneOf(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"])
    .required(),
  runs: yup.boolean().required(),
  departure: yup.string().when("runs", {
    is: true,
    then: (s) => s.required("Required").matches(hhmm, "HH:MM"),
    otherwise: (s) => s.nullable().transform(() => null),
  }),
  arrival: yup.string().when("runs", {
    is: true,
    then: (s) => s.required("Required").matches(hhmm, "HH:MM"),
    otherwise: (s) => s.nullable().transform(() => null),
  }),
});

export const createTrainSchema = yup.object({
  number: yup.string().trim().required(),
  from: yup.string().trim().required(),
  to: yup.string().trim().required(),
  schedule: yup.array(scheduleItem).length(7, "Must contain 7 days").required(),
});

export const updateTrainSchema = createTrainSchema;

export const patchTrainSchema = yup.object({
  number: yup.string().trim().notRequired(),
  from: yup.string().trim().notRequired(),
  to: yup.string().trim().notRequired(),
  schedule: yup.array(scheduleItem).notRequired(),
});

export type CreateTrainDto = yup.InferType<typeof createTrainSchema>;
export type UpdateTrainDto = yup.InferType<typeof updateTrainSchema>;
export type PatchTrainDto = yup.InferType<typeof patchTrainSchema>;
