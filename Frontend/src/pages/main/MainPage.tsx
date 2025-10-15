import { Container, Box, Typography } from '@mui/material';
import CardBenefits from "@/components/CardsBenefits";
import NavbarMain from "@/components/Navbar";
import CustomButton from '@/components/customs/Buttons';
import { useNavigate } from 'react-router-dom';
import '@/style/Main.css';


export default function MainPage () {
  const navigate = useNavigate();
  return (
  <>
   <NavbarMain/>

   <Container className="containerBody" maxWidth='xl'>
     <Box className='headerDesc'>
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

   <Box className='containerStart' component='div'>
    <Typography variant='h5' sx={{textAlign: 'center', fontWeight: 700,}}>Ingin segera memulai ?</Typography>
    <CustomButton sx={{padding: '7px 20px 7px 20px'}} onClick={() => navigate('/food')}>Lets Go!</CustomButton>
   </Box>

   <hr />
   <Box className='containerFooter' component='div'>
    <Typography variant='caption'>&copy; Calculator Food Nutritions. All Rights Reserved.</Typography>
   </Box>
  </>
  )
}
