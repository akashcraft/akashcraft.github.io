import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material";
import EmptyState from "./EmptyState";
import { CelebrationOutlined } from "@mui/icons-material";

function createData(course: string, date: string, time: string) {
  return { course, date, time };
}

const rows = [
  createData("DEMO 1000", "1 Jan 2026", "13:00 - 14:00"),
  createData("DEMO 2000", "2 Jan 2026", "14:00 - 15:00"),
  createData("DEMO 3000", "3 Jan 2026", "15:00 - 16:00"),
];

export default function ExamSchedule({ onEmpty }: { onEmpty: () => void }) {
  return rows.length === 0 ? (
    <EmptyState
      header="No Exams"
      height="100%"
      minHeight="20rem"
      icon={
        <CelebrationOutlined
          style={{
            fontSize: "4rem",
            color: "var(--mui-palette-background-button)",
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
          <StyledTableHead>Course</StyledTableHead>
          <StyledTableHead>Date</StyledTableHead>
          <StyledTableHead>Time</StyledTableHead>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.course}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <StyledTableCell component="th" scope="row">
              {row.course}
            </StyledTableCell>
            <StyledTableCell>{row.date}</StyledTableCell>
            <StyledTableCell>{row.time}</StyledTableCell>
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
