import { Box, Typography, TableContainer, Table, TableRow, TableBody, TableCell } from "@mui/material"
import { type NutritionResult } from "@/types/typeDataNutritionPage";
import '@/style/Main.css';
import { formatDV } from '@/utils/calculateDV';

interface PropsDetailNutritions {
  result: NutritionResult
}

export default function ResultCard ({result}: PropsDetailNutritions) {
  return (
  <Box className="nutritionContainer">
    <Box>
      <Typography sx={{fontSize: '20px', fontWeight: '700'}}>Nutrition facts</Typography>
      <Box className='nutritionHeader'>
        <Typography sx={{fontSize: '14px', fontWeight: '700'}}>Name of food: </Typography>
        <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.name}</Typography>
      </Box>
      <Box className='nutritionHeader'>
        <Typography sx={{fontSize: '14px', fontWeight: '700'}}>Portion: </Typography>
        <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.portion}</Typography>
      </Box>
    </Box>
    <hr className="hrTwo"/>
    <TableContainer>
      <Table className="nutritionTable">
        <TableBody>
          {/* Header Row with % DV */}
          <TableRow>
            <TableCell sx={{ border: 'none', padding: '4px 0', fontSize: '14px', fontWeight: '700' }}>Amount per serving</TableCell>
            <TableCell sx={{ border: 'none', padding: '4px 0' }}></TableCell>
            <TableCell sx={{ border: 'none', padding: '4px 0', textAlign: 'right',fontSize: '14px', fontWeight: '700'}}>% DV*</TableCell>
          </TableRow>

          {/* Main Macronutrients */}
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '700'}}>Calories</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.calories} kcal</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '700'}}>
                {formatDV('calories', result.details.calories)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '700'}}>Protein</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.protein}g</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '700'}}>
                {formatDV('protein', result.details.protein)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '700'}}>Carbs</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.carbs}g</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '700'}}>
                {formatDV('carbs', result.details.carbs)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '700'}}>Fat</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.fat}g</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '700'}}>
                {formatDV('fat', result.details.fat)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow className="nutritionDivider">
            <TableCell colSpan={3} sx={{ borderTop: '4px solid var(--result-card-hr)', padding: 0 }}></TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>Fiber</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.fiber}g</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}}>
                {formatDV('fiber', result.details.fiber)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>Sugar</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.sugar}g</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}}>
                {formatDV('sugar', result.details.sugar)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>Cholesterol</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.cholesterol}mg</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}}>
                {formatDV('cholesterol', result.details.cholesterol)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>Sodium</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.sodium}mg</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}}>
                {formatDV('sodium', result.details.sodium)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>Calcium</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}> {result.details.calcium}mg</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}}>
                {formatDV('calcium', result.details.calcium)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>Iron</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.iron}mg</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}}>
                {formatDV('iron', result.details.iron)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>Potassium</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.potassium}mg</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}}>
                {formatDV('potassium', result.details.potassium)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>Magnesium</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.magnesium}mg</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}}>
                {formatDV('magnesium', result.details.magnesium)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>VitaminA</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.vitaminA}µg</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}}>
                {formatDV('vitaminA', result.details.vitaminA)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>VitaminC</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.vitaminC}mg</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}}>
                {formatDV('vitaminC', result.details.vitaminC)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>VitaminD</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.vitaminD}µg</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}}>
                {formatDV('vitaminD', result.details.vitaminD)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Box className="nutritionName">
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>VitaminB12</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: '400'}}>{result.details.vitaminB12}µg</Typography>
              </Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}}>
                {formatDV('vitaminB12', result.details.vitaminB12)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell 
              colSpan={3}
              sx={{ 
                borderTop: '4px solid var(--result-card-hr)',
                padding: '8px 0',
                border: 'none'
              }}
            >
              <Typography sx={{fontSize: '11px', fontStyle: 'italic', color: '#666'}}>
                *Persentase Nilai Harian (DV) menunjukkan seberapa besar kandungan nutrisi dalam satu porsi makanan berkontribusi terhadap asupan harian. 
                2.000 kalori per hari digunakan sebagai acuan umum untuk saran gizi.
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  )
}