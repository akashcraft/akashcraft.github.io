import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material";

function createData(course: string, date: string, time: string) {
  return { course, date, time };
}

const rows = [
  createData("DEMO 1000", "1 Jan 2026", "1:00 PM - 2:00 PM"),
  createData("DEMO 2000", "2 Jan 2026", "2:00 PM - 3:00 PM"),
  createData("DEMO 3000", "3 Jan 2026", "3:00 PM - 4:00 PM"),
];

export default function ExamSchedule() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>Course</StyledTableCell>
          <StyledTableCell align="right">Date</StyledTableCell>
          <StyledTableCell align="right">Time</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.course}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell
              sx={{ fontFamily: "Segoe UI" }}
              component="th"
              scope="row"
            >
              {row.course}
            </TableCell>
            <TableCell sx={{ fontFamily: "Segoe UI" }} align="right">
              {row.date}
            </TableCell>
            <TableCell sx={{ fontFamily: "Segoe UI" }} align="right">
              {row.time}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const StyledTableCell = styled(TableCell)({
  fontFamily: "Segoe UI",
  fontWeight: "bold",
});
