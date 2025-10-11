import { useContext, useState } from "react";
import ThemeContext from "@/context/ThemeContext";
import { Container, Box, Typography, IconButton} from '@mui/material'
import DarkModeSharpIcon from '@mui/icons-material/DarkModeSharp';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import CustomButtonLogin from '@/components/customs/ButtonLogin'
import CardBenefits from "@/components/CardsBenefits";
import '@/style/Main.css'


export default function MainPage () {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
  <>
    <Box component="header" className='header'>
      <Typography variant="subtitle1" sx={{fontWeight: 700,}}>Calculator Food Nutrition</Typography>
      <Box className='headerIcon'>
        <CustomButtonLogin>Login</CustomButtonLogin>
        <IconButton onClick={toggleDarkMode}>
          {darkMode ? (<LightModeSharpIcon sx={{color: '#fffffe'}}/>) : (<DarkModeSharpIcon sx={{color: '#272343'}}/>)}
        </IconButton>
      </Box>
    </Box>
    <hr />
   <Container className="containerBody" maxWidth='xl'>
     <Box sx={{border: '1px solid red', }} className='headerDesc'>
      <Typography variant='h2' sx={{fontWeight: 700}}>Kalkulator Nutrisi Makanan</Typography>
      <Typography variant='subtitle1' sx={{textAlign: 'center', fontWeight: 550,}}>
        Kalkulator Nutrisi Makanan Indonesia adalah sebuah aplikasi berbasis web yang membantu 
        pengguna mengetahui kandungan gizi dari berbagai makanan khas Indonesia. Dengan fitur ini, 
        pengguna dapat memasukkan nama makanan, porsi, serta bahan-bahan tambahan (jika ada), 
        dan sistem akan menampilkan estimasi kandungan nutrisi seperti kalori, protein, lemak, 
        karbohidrat, serta vitamin dan mineral.
      </Typography>
     </Box>
   </Container>
   <Container maxWidth='xl' className="containerCards">
    <Typography variant='h5' sx={{textAlign: 'center', fontWeight: 700,}}>Apa saja kegunaannya ?</Typography>
    <CardBenefits/>
   </Container>
  </>
  )
}
