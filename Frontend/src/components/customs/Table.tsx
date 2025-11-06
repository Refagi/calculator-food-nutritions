import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import '@/style/Main.css';

export const CustomTableContainer = styled(TableContainer)({
  // borderRadius: "12px",
  margin: "-5",
  // overflow: "hidden",
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

export const CustomTableRow = styled(TableRow)({
  // "&:nth-of-type(odd)": {
  //   backgroundColor: "var(--result-card-hr)",
  // },
  // "&:nth-of-type(even)": {
  //   backgroundColor: "var(--row-even-bg)",
  // },

});
