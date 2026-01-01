import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Chip, styled } from "@mui/material";
import EmptyState from "./EmptyState";
import { CelebrationOutlined, Delete } from "@mui/icons-material";
import type { AccountState } from "./AccountContext";

export default function ExamSchedule({
  onEmpty,
  accountState,
  enableDelete = false,
  onDelete,
}: {
  onEmpty: () => void;
  accountState: AccountState;
  enableDelete?: boolean;
  onDelete?: (examId: string) => void;
}) {
  const rows = accountState.exams;
  return rows?.length === 0 || !rows ? (
    <EmptyState
      header="No Exams"
      height="100%"
      minHeight="20rem"
      icon={
        <CelebrationOutlined
          style={{
            fontSize: "4rem",
            color: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 20%)`,
          }}
        />
      }
      onClick={onEmpty}
    />
  ) : (
    <Table
      size="small"
      sx={{
        border: "1px solid var(--mui-palette-text-light2)",
      }}
    >
      <TableHead>
        <TableRow>
          <StyledTableHead
            sx={{
              backgroundColor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 20%)`,
            }}
          >
            Course
          </StyledTableHead>
          <StyledTableHead
            sx={{
              backgroundColor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 20%)`,
            }}
          >
            Date
          </StyledTableHead>
          <StyledTableHead
            sx={{
              backgroundColor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 20%)`,
            }}
          >
            Time
          </StyledTableHead>
          {enableDelete && (
            <StyledTableHead
              sx={{
                backgroundColor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 20%)`,
              }}
            ></StyledTableHead>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.uid}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <StyledTableCell component="th" scope="row">
              {row.courseName}
            </StyledTableCell>
            <StyledTableCell>{row.date}</StyledTableCell>
            <StyledTableCell>{row.time}</StyledTableCell>
            {enableDelete && (
              <StyledTableCell>
                <StyledChip
                  onClick={() => {
                    if (onDelete && row.uid) {
                      onDelete(row.uid);
                    }
                  }}
                  icon={
                    <Delete
                      sx={{
                        color: "var(--mui-palette-secondary-dark) !important",
                      }}
                    />
                  }
                />
              </StyledTableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const StyledTableHead = styled(TableCell)({
  fontFamily: "Segoe UI",
  fontWeight: "bold",
  borderColor: "var(--mui-palette-text-light2)",
});

const StyledTableCell = styled(TableCell)({
  fontFamily: "Segoe UI",
  borderColor: "var(--mui-palette-text-light2)",
});

const StyledChip = styled(Chip)({
  color: "white",
  fontSize: "1.2rem",
  width: "2rem",
  ".MuiChip-label": {
    display: "none",
  },
  ".MuiChip-icon": {
    margin: 0,
  },
  backgroundColor: "transparent !important",
});
