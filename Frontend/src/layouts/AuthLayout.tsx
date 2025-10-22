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
          {/* <Box className='itemFormAuth'>
            <Box className='headerForm'>
              <Typography variant="h5" sx={{fontWeight: '800'}}>Enter Your account</Typography>
              <Typography sx={{fontWeight: '400'}}>Enter your email  and password to sign in for this app</Typography>
            </Box>
            <Box component='form' sx={{minWidth: '350px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <Stack spacing={2}>
                <CustomTextField fullWidth required label='Email'type="email" id="outlined-size-normal" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Stack>
              <Stack spacing={1}>
                <CustomButton type="submit" sx={{padding: '10px 40px 10px 40px', borderRadius: '3px' }}>Sign in with Email</CustomButton>
                <CustomButton type="button" 
                 sx={{
                  padding: '10px 40px 10px 40px', 
                  borderRadius: '3px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '5px',
                  backgroundColor: '#272343',
                  color: '#fffffe'
                }}> 
                  <GoogleIcon/>
                  Sign in with Google
                </CustomButton>
                <Typography sx={{textAlign: 'center'}}>You don't have an account? <Link component='button' sx={{fontWeight: 700, textDecoration: 'none', color: 'var(--text-color)'}}>Sign up</Link></Typography>
              </Stack>
            </Box>
          </Box> */}
          <Outlet/>
        </Box>
    </Container>
  )
}