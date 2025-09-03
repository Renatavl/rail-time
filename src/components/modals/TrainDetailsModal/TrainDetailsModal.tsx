"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";
import { Formik, Form, FieldArray, FormikErrors } from "formik";
import * as Yup from "yup";
import {
  Column,
  DataTable,
} from "@/components/ui-components/DataTable/DataTable";
import { FormikTextField } from "@/components/ui-components/FormikTextField/FormikTextField";
import { DAYS, ITrainDetailsModalProps, ScheduleRow, TrainForm } from "./types";
import useTrainDetailsModal from "./useTrainDetailsModal";

const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/;
const scheduleItemSchema = Yup.object({
  day: Yup.string().oneOf(DAYS).required(),
  runs: Yup.boolean().required(),
  departure: Yup.string().when("runs", {
    is: true,
    then: (s) => s.required("Enter time").matches(HHMM, "Format HH:MM"),
    otherwise: (s) => s.oneOf([""]).nullable(),
  }),
  arrival: Yup.string().when("runs", {
    is: true,
    then: (s) => s.required("Enter time").matches(HHMM, "Format HH:MM"),
    otherwise: (s) => s.oneOf([""]).nullable(),
  }),
});
const validationSchema = Yup.object({
  number: Yup.string().trim().required("Number is required"),
  from: Yup.string().trim().required("Field is required"),
  to: Yup.string().trim().required("Field is required"),
  schedule: Yup.array().of(scheduleItemSchema).length(7, "It has to be 7 days"),
});

export default function TrainDetailsModal({
  open,
  initial,
  onClose,
  onSubmit,
}: ITrainDetailsModalProps) {
  const { onModalSubmit, initialValues, scheduleRows } = useTrainDetailsModal({
    initial,
    onSubmit,
  });

  const scheduleColumns = ({
    setFieldValue,
  }: {
    setFieldValue: (
      field: string,
      value: string | boolean,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<TrainForm>>;
  }): Column<ScheduleRow>[] => [
    {
      key: "day",
      header: "Week day",
      width: 140,
      render: (row) => row.day,
    },
    {
      key: "runs",
      header: "If runs",
      width: 120,
      render: (row) => (
        <Checkbox
          checked={row.runs}
          onChange={(_, checked) => {
            setFieldValue(`${row.base}.runs`, checked);
            if (!checked) {
              setFieldValue(`${row.base}.departure`, "");
              setFieldValue(`${row.base}.arrival`, "");
            }
          }}
        />
      ),
    },
    {
      key: "departure",
      header: "Departure",
      width: 200,
      render: (row) => {
        if (!row.runs) {
          return (
            <Typography
              component="span"
              sx={{ fontVariantNumeric: "tabular-nums" }}
            >
              —
            </Typography>
          );
        }

        return (
          <FormikTextField
            name={`${row.base}.departure`}
            label="From"
            type="time"
            size="small"
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 60, pattern: "[0-9]{2}:[0-9]{2}" }}
            sx={{ fontVariantNumeric: "tabular-nums" }}
          />
        );
      },
    },
    {
      key: "arrival",
      header: "Arrival",
      width: 200,
      render: (row) => {
        if (!row.runs) {
          return (
            <Typography
              component="span"
              sx={{ fontVariantNumeric: "tabular-nums" }}
            >
              —
            </Typography>
          );
        }

        return (
          <FormikTextField
            name={`${row.base}.arrival`}
            label="To"
            type="time"
            size="small"
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 60, pattern: "[0-9]{2}:[0-9]{2}" }}
            sx={{ fontVariantNumeric: "tabular-nums" }}
          />
        );
      },
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onModalSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Box component={Form} noValidate>
            <DialogTitle>{values.id ? "Edit train" : "New train"}</DialogTitle>

            <DialogContent dividers>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 2 }}
              >
                <FormikTextField
                  name="number"
                  label="Train number"
                  placeholder="Ex.: 149Л"
                />

                <FormikTextField
                  name="from"
                  label="From"
                  placeholder="Ex.: Івано-Франківськ"
                />

                <FormikTextField
                  name="to"
                  label="To"
                  placeholder="Ex.: Київ-Пасажирський"
                />
              </Stack>

              <FieldArray name="schedule">
                {() => (
                  <DataTable<ScheduleRow>
                    rows={scheduleRows(values)}
                    columns={scheduleColumns({ setFieldValue })}
                    getRowId={(r) => r.id}
                    emptyMessage="Немає даних"
                    elevation={1}
                    paperSx={{ borderRadius: 2, overflow: "hidden" }}
                    tableSx={{
                      "& th": {
                        bgcolor: "grey.50",
                        color: "text.secondary",
                        fontWeight: 600,
                      },
                      "& td, & th": { borderBottomColor: "grey.200" },
                    }}
                    stickyHeader
                    hover
                  />
                )}
              </FieldArray>
            </DialogContent>

            <DialogActions>
              <Button
                variant="outlined"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving…" : "Confirm"}
              </Button>
            </DialogActions>
          </Box>
        )}
      </Formik>
    </Dialog>
  );
}
