import {
  Paper,
  Stack,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
} from "@mui/material";
import type {
  SxProps,
  TableContainerProps,
  TableProps,
  TableCellProps,
} from "@mui/material";
import type { Theme } from "@mui/material/styles";

export type Column<T> = {
  key: React.Key;
  header: React.ReactNode;
  render: (row: T, index: number) => React.ReactNode;
  align?: TableCellProps["align"];
  width?: number | string;
  headerSx?: SxProps<Theme>;
  cellSx?: SxProps<Theme>;
  cellProps?: Partial<TableCellProps>;
};

export type DataTableProps<T> = {
  rows: T[];
  columns: Column<T>[];
  getRowId?: (row: T, index: number) => React.Key;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: React.ReactNode;
  emptySuffixWhenQuery?: React.ReactNode;
  query?: string;
  containerProps?: Omit<TableContainerProps, "children">;
  tableProps?: Omit<TableProps, "children">;
  paperSx?: SxProps<Theme>;
  tableSx?: SxProps<Theme>;
  headCellSx?: SxProps<Theme>;
  bodyCellSx?: SxProps<Theme>;
  stickyHeader?: boolean;
  hover?: boolean;
  elevation?: number;
};

export function DataTable<T>({
  rows,
  columns,
  getRowId,
  loading,
  error,
  emptyMessage = "No data",
  emptySuffixWhenQuery = " for the given query",
  query = "",
  containerProps,
  tableProps,
  paperSx,
  tableSx,
  headCellSx,
  bodyCellSx = {},
  stickyHeader = false,
  hover = true,
  elevation = 1,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <Stack alignItems="center" sx={{ py: 6 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ py: 2 }}>
        {error}
      </Alert>
    );
  }

  const hasQuery = query.trim().length > 0;
  const hasRows = rows.length > 0;

  return (
    <TableContainer
      component={Paper}
      elevation={elevation}
      sx={{ borderRadius: 2, overflow: "hidden", ...paperSx }}
      {...containerProps}
    >
      <Table
        stickyHeader={stickyHeader}
        sx={{
          "& th": {
            bgcolor: "grey.50",
            color: "text.secondary",
            fontWeight: 600,
          },
          "& td, & th": { borderBottomColor: "grey.200" },
          ...tableSx,
        }}
        {...tableProps}
      >
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={`head-${String(col.key)}`}
                align={col.align}
                sx={
                  {
                    width: col.width,
                    ...headCellSx,
                    ...col.headerSx,
                  } as SxProps<Theme>
                }
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {hasRows ? (
            rows.map((row, idx) => (
              <TableRow
                key={String(getRowId ? getRowId(row, idx) : idx)}
                hover={hover}
              >
                {columns.map((col) => (
                  <TableCell
                    key={`cell-${String(col.key)}-${idx}`}
                    align={col.align}
                    sx={
                      {
                        ...bodyCellSx,
                        ...col.cellSx,
                      } as SxProps<Theme>
                    }
                    {...col.cellProps}
                  >
                    {col.render(row, idx)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                sx={{ textAlign: "center", py: 6, color: "text.secondary" }}
              >
                {emptyMessage}
                {hasQuery ? emptySuffixWhenQuery : null}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
