import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import '@/style/Main.css'

function createData(
  nutrition: string,
  value: string,
) {
  return { nutrition, value };
}

const rowsOne = [
  createData('calories', `${2000}kcal`),
  createData('protein', `${50}g`),
  createData('carbs', `${275}g`),
  createData('fat', `${78}g`),
  createData('fiber', `${28}g`),
  createData('sugar', `${50}g`),
  createData('cholesterol', `${300}mg`),
  createData('sodium', `${2300}mg`),
];

const rowsTwo = [
  createData('calcium', `${1300}mg`),
  createData('iron', `${18}mg`),
  createData('potassium', `${4700}mg`),
  createData('magnesium', `${420}mg`),
  createData('vitaminA', `${900}µg`),
  createData('vitaminC', `${90}mg`),
  createData('vitaminD', `${20}µg`),
  createData('vitaminB12', `${2.4}µg`),
]

const rowsThree = [
  createData('<= 5%', `Rendah (sedikit mengandung nutrisi)`),
  createData('>= 20%', `Tinggi (banyak mengandung nutrisi)`),
  createData('> 100%', `Melebihi kebutuhan harian`),
]

export function TableInfoNutrientsOne() {
  return (
    <TableContainer component={Paper} sx={{maxWidth: '400px', borderRadius: '12px', boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
      backgroundColor: 'var(--table-body)'
    }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'var(--table-head)' }}>
            <TableCell sx={{ color: 'var(--text-color-second)', fontWeight: 'bold', padding: '20px', textAlign: 'center'}}>Nutrition</TableCell>
            <TableCell sx={{ color: 'var(--text-color-second)', fontWeight: 'bold', padding: '20px', textAlign: 'center' }}>Kebutuhan Harian</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsOne.map((row) => (
            <TableRow key={row.nutrition}>
              <TableCell sx={{ padding: '10px', fontWeight: 500, textAlign: 'center', color: 'var(--text-color)',}}>{row.nutrition}</TableCell>
              <TableCell sx={{ padding: '10px', fontWeight: 500, textAlign: 'center', color: 'var(--text-color)', }}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function TableInfoNutrientsTwo() {
  return (
    <TableContainer component={Paper} sx={{maxWidth: '400px', borderRadius: '12px', boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
      backgroundColor: 'var(--table-body)'
    }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'var(--table-head)' }}>
            <TableCell sx={{ color: 'var(--text-color-second)', fontWeight: 'bold', padding: '20px', textAlign: 'center'}}>Nutrition</TableCell>
            <TableCell sx={{ color: 'var(--text-color-second)', fontWeight: 'bold', padding: '20px', textAlign: 'center' }}>Kebutuhan Harian</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsTwo.map((row) => (
            <TableRow key={row.nutrition}>
              <TableCell sx={{ padding: '10px', fontWeight: 500, textAlign: 'center', color: 'var(--text-color)',}}>{row.nutrition}</TableCell>
              <TableCell sx={{ padding: '10px', fontWeight: 500, textAlign: 'center', color: 'var(--text-color)', }}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function TableInfoDV() {
  return (
    <TableContainer component={Paper} sx={{maxWidth: '400px', marginTop: '20px', borderRadius: '12px', boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
      backgroundColor: 'var(--table-body)'
    }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'var(--table-head)' }}>
            <TableCell sx={{ color: 'var(--text-color-second)', fontWeight: 'bold', padding: '10px', textAlign: 'center'}}>% DV</TableCell>
            <TableCell sx={{ color: 'var(--text-color-second)', fontWeight: 'bold', padding: '10px', textAlign: 'center' }}>Artinya</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsThree.map((row) => (
            <TableRow key={row.nutrition}>
              <TableCell sx={{ padding: '10px', fontWeight: 500, textAlign: 'center', color: 'var(--text-color)',}}>{row.nutrition}</TableCell>
              <TableCell sx={{ padding: '10px', fontWeight: 500, textAlign: 'center', color: 'var(--text-color)', }}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}