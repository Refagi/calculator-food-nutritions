import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '@/style/Main.css'
import { type NutritionResult } from '@/types/typeDataNutritionPage';
import '@/style/Main.css';

interface PropsDetailNutritions {
  result: NutritionResult
}

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: 'var(--base-two-color) !important',
    color: 'var(--text-color) !important',
    fontSize: 16,
    fontWeight: '700'
  },
});


export default function EditIngredients({ result }: PropsDetailNutritions) {
 const rawIngredients = result.ingredients ?? '';
 const dataIngredients = Array.isArray(rawIngredients)
    ? rawIngredients
    : String(rawIngredients).split(/,\s*|\r?\n/).filter(i => i.trim() !== "");
  return (
    <TableContainer component={Paper} sx={{ maxWidth: '750px', border: '1px solid var(--text-color)' }}>
      <Table aria-label="customized table">
        <TableBody>
        {dataIngredients.map((row, index) => (
          <>
            <TableRow key={index}>
              <StyledTableCell component="th" scope="row">❝{row}❞</StyledTableCell>
            </TableRow>
          </>
      ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}