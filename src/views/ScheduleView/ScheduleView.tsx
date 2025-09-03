"use client";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  Box,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Column,
  DataTable,
} from "@/components/ui-components/DataTable/DataTable";
import useScheduleView from "./useScheduleView";
import { JS_DAY_TO_API, Row, SortKey } from "./types";
import { styles } from "./ScheduleView.styles";

export default function ScheduleView() {
  const {
    day,
    query,
    sort,
    loading,
    error,
    rows,
    setQuery,
    handleDayChange,
    handleSortChange,
  } = useScheduleView();

  const columns: Column<Row>[] = [
    {
      key: "train",
      header: "Train",
      render: (r: Row) => (
        <Typography sx={{ fontWeight: 700, color: "primary.main" }}>
          {r.id}
        </Typography>
      ),
      width: 120,
    },
    {
      key: "from",
      header: "From",
      render: (r: Row) => <Typography variant="body1">{r.from}</Typography>,
    },
    {
      key: "to",
      header: "To",
      render: (r: Row) => <Typography variant="body1">{r.to}</Typography>,
    },
    {
      key: "departure",
      header: "Departure",
      render: (r: Row) => r.departure,
      width: 140,
      cellSx: {
        textAlign: "right",
        fontVariantNumeric: "tabular-nums",
      },
      align: "right",
    },
    {
      key: "arrival",
      header: "Arrival",
      render: (r: Row) => r.arrival,
      width: 110,
      cellSx: {
        textAlign: "right",
        fontVariantNumeric: "tabular-nums",
      },
      align: "right",
    },
  ];

  return (
    <Box>
      <Box sx={styles.actionsBox}>
        <Stack direction="row" spacing={1.5} sx={styles.actionsStack}>
          <FormControl size="small" sx={styles.formControl}>
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select<SortKey>
              labelId="sort-label"
              label="Sort by"
              value={sort}
              onChange={handleSortChange}
            >
              <MenuItem value="depAsc">Departure ↑</MenuItem>
              <MenuItem value="depDesc">Departure ↓</MenuItem>
              <MenuItem value="fromAsc">From ↑</MenuItem>
              <MenuItem value="fromDesc">From ↓</MenuItem>
              <MenuItem value="toAsc">To ↑</MenuItem>
              <MenuItem value="toDesc">To ↓</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            label="Search"
            placeholder="Number, from or to"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={styles.textField}
          />
        </Stack>
      </Box>

      <ToggleButtonGroup
        value={day}
        exclusive
        onChange={handleDayChange}
        aria-label="day-of-week"
        sx={(theme) => styles.toggleGroup(theme)}
      >
        {JS_DAY_TO_API.map((d) => (
          <ToggleButton key={d} value={d} aria-label={d.toLowerCase()}>
            {d}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <DataTable<Row>
        loading={loading}
        error={error}
        rows={rows}
        columns={columns}
        getRowId={(r: Row) => `${r.id}-${day}`}
        query={query}
        emptyMessage="There are no train services on the selected day."
        emptySuffixWhenQuery=" by the request"
        elevation={1}
        paperSx={styles.tablePaper}
        tableSx={styles.tableRoot}
        stickyHeader
        hover
      />
    </Box>
  );
}
