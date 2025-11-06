import { Container, Box, Typography, Stack, Button, Link } from "@mui/material"
import { Outlet } from 'react-router-dom';
import '@/style/Main.css'



export default function AuthLayout () {
  return(
    <Container maxWidth="lg" sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      }}>
        <Box className='containerAuth'>
          <Box className='titleAuth'>
            <img src="../../public/logo.png" alt="logo" style={{maxWidth: '50px', borderRadius: '50px'}}/>
            <Typography sx={{fontWeight: '700', fontSize: '18px'}}>Calculator Food Nutritions</Typography>
          </Box>
          <Outlet/>
        </Box>
    </Container>
  )
}