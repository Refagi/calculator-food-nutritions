import { Box, Typography, TableContainer, Table, TableRow, TableBody, TableCell } from "@mui/material"


interface DetailsNutritions {
  id: string;
  foodId: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  cholesterol: number;
  sodium: number;
  calcium: number;
  iron: number;
  pottasium: number;
  magnesium: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminB12: number;
  createdAt: Date;
  updatedAt: Date;
}

interface NutritionResult {
  name: string;
  image_url: string;
  portion: string;
  ingredients: string[]
  details: DetailsNutritions
}

interface PropsDetailNutritions {
  result: NutritionResult
}

export default function ResultCard ({result}: PropsDetailNutritions) {
  return (
  <>
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
    <Typography sx={{fontSize: '14px', fontWeight: '700'}}>Amount per serving</Typography>
    <TableContainer>
      <Table className="nutritionTable">
        <TableBody>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '700'}}>Calories</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.calories} kcal</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '700'}}>Protein</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.protein}g</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '700'}}>Carbs</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.carbs}g</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '700'}}>Fat</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.fat}g</Typography>
            </TableCell>
          </TableRow>
          <TableRow className="nutritionDivider">
            <TableCell colSpan={2}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}}>Fiber</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}} >{result.details.fiber}g</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}}>Sugar</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.sugar}g</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}}>Cholesterol</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.cholesterol}mg</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}}>Sodium</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.sodium}mg</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}}>Calcium</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.calcium}mg</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}}>Iron</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.iron}mg</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}}>Pottasium</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.pottasium}mg</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}}>Magnesium</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.magnesium}mg</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}}>VitaminA</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.vitaminA}µg</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}}>VitaminC</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.vitaminC}mg</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}}>VitaminD</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.vitaminD}µg</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="nutritionHeaderCell">
              <Typography sx={{fontSize: '14px', fontWeight: '500'}}>VitaminB12</Typography>
            </TableCell>
            <TableCell className="nutritionValueCell">
              <Typography sx={{fontSize: '14px', fontWeight: '400'}} >{result.details.vitaminB12}µg</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  </>)
}