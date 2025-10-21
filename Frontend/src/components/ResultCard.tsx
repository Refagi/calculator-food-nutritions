import { Box, Typography } from "@mui/material"

export default function ResultCard () {
  return (
  <>
  <Box className="itemResultCard">
    <Box>
      <Typography sx={{fontSize: '20px'}}>Fakta Nutrisi</Typography>
      <Typography >Nama Makanan: </Typography>
      <Typography >Jumlah: </Typography>
      <hr className="doubleHr"/>
    </Box>
  </Box>
  </>)
}