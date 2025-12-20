import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/material/styles";
import '@/styles/Main.css';

export const CustomTableContainer = styled(TableContainer)({
  margin: "-5",
  border: "1px solid var(--result-card-hr)",
});

export const CustomTable = styled(Table)({
  height: '10px',
  "& .MuiTableCell-root": {
    color: "var(--text-color)",
    fontWeight: 700,
  },
});

export const CustomTableHeadCell = styled(TableCell)({
  fontWeight: 700,
  backgroundColor: "var(--header-bg-color)",
  color: "#fff",
  textTransform: "uppercase",
});

