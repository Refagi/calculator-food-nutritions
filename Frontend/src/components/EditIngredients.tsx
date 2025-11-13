import { styled } from '@mui/material/styles';
import { Box } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '@/style/Main.css'
import CustomButton from './customs/Buttons';
import { type NutritionResult } from '@/types/typeDataNutritionPage';
import CustomTextField from './customs/Input';
import { useState } from 'react';

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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  // const handleEditClick = (index: number, value: string) => {
  //   setEditingIndex(index);
  //   setEditingValue(value);
  // };
  const handleUpdate = () => {
    console.log("Update ingredient:", editingValue, "at index:", editingIndex);
    // TODO: Implement logic update ke backend
    setEditingIndex(null);
  };

  const handleDelete = () => {
    console.log("Delete ingredient at index:", editingIndex);
    // TODO: Implement logic delete ke backend
    setEditingIndex(null);
  };
  return (
    <TableContainer component={Paper} sx={{ maxWidth: '750px', border: '1px solid var(--text-color)' }}>
      <Table aria-label="customized table">
        <TableBody>
        {dataIngredients.map((row, index) => (
          <>
            <TableRow key={index}>
              <StyledTableCell component="th" scope="row">❝{row}❞</StyledTableCell>
              <StyledTableCell align='right'>
                {editingIndex === index ? (<CustomButton type='button' onClick={() => setEditingIndex(null)}>Close</CustomButton>) : 
                (<CustomButton type='button' onClick={() => setEditingIndex(index)}>Edit</CustomButton>)}
              </StyledTableCell>
            </TableRow>

              {editingIndex === index && (
                <TableRow>
                  <TableCell colSpan={2} sx={{ backgroundColor: 'var(--base-two-color)' }}>
                    <CustomTextField
                      fullWidth
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      placeholder="Edit bahan..."
                      sx={{ marginBottom: "10px" }}
                    />

                    <Box style={{ display: "flex", gap: "10px" }}>
                      <CustomButton
                        sx={{ padding: "8px 20px", background: "#3a86ff" }}
                        onClick={handleUpdate}
                      >
                        Update
                      </CustomButton>

                      <CustomButton
                        sx={{ padding: "8px 20px", background: "#ef233c" }}
                        onClick={handleDelete}
                      >
                        Delete
                      </CustomButton>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
          </>
      ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}