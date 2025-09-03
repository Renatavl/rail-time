"use client";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmationModal from "@/components/modals/ConfirmationModal/ConfirmationModal";
import TrainDetailsModal from "@/components/modals/TrainDetailsModal/TrainDetailsModal";
import {
  Column,
  DataTable,
} from "@/components/ui-components/DataTable/DataTable";
import { useMemo } from "react";
import { styles } from "./AdminView.styles";
import { Row } from "./types";
import useAdminView from "./useAdminView";

export default function AdminView() {
  const {
    loading,
    rows,
    editing,
    error,
    openConfirm,
    openDetails,
    handleSubmitDetails,
    setOpenDetails,
    handleOpenCreate,
    handleOpenEditById,
    handleOpenConfirmById,
    mapApiToUiSchedules,
    handleCloseConfirm,
    makeEmptyUiSchedule,
    handleConfirm,
  } = useAdminView();

  const columns: Column<Row>[] = useMemo(
    () => [
      {
        key: "number",
        id: "number",
        header: "Train number",
        width: 160,
        headerSx: { fontWeight: 600, color: "text.secondary" },
        cellSx: { fontWeight: 700, color: "primary.main" },
        render: (r) => r.number,
      },
      { key: "from", id: "from", header: "From", render: (r) => r.from },
      { key: "to", id: "to", header: "To", render: (r) => r.to },
      {
        key: "actions",
        id: "actions",
        header: "Action",
        width: 140,
        align: "right",
        render: (r) => (
          <>
            <IconButton onClick={() => handleOpenEditById(r.id)}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton onClick={() => handleOpenConfirmById(r.id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </>
        ),
      },
    ],
    [handleOpenConfirmById, handleOpenEditById]
  );

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={styles.actionsBar}
      >
        <Typography variant="h6" fontWeight={700}>
          Trains
        </Typography>
        <IconButton onClick={handleOpenCreate}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Stack>

      <DataTable<Row>
        loading={loading}
        error={error}
        rows={rows}
        columns={columns}
        getRowId={(r: Row) => r.id}
        emptyMessage="Empty list"
        elevation={1}
        paperSx={styles.tablePaper}
        tableSx={styles.tableRoot}
        stickyHeader
        hover
      />

      <ConfirmationModal
        open={openConfirm}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirm}
      />

      <TrainDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        onSubmit={handleSubmitDetails}
        initial={
          editing
            ? { ...editing, schedule: mapApiToUiSchedules(editing.schedules) }
            : { number: "", from: "", to: "", schedule: makeEmptyUiSchedule() }
        }
      />
    </Box>
  );
}
