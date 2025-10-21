import { Container, Box, Typography, Stack } from "@mui/material"
import { Outlet } from 'react-router-dom';
import CustomTextField from "@/components/customs/Input";
import PasswordInput from "@/components/customs/PasswordInput";
import { useState } from "react";
import CustomButton from "@/components/customs/Buttons";


export default function AuthLayout () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          <Box className='itemFormAuth'>
            <Box className='headerForm'>
              <Typography variant="h5" sx={{fontWeight: '800'}}>Create an account</Typography>
              <Typography sx={{fontWeight: '400'}}>Enter your email to sign up for this app</Typography>
            </Box>
            <Box component='form' sx={{minWidth: '350px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <Stack spacing={2}>
                <CustomTextField fullWidth label='Email'type="email" id="outlined-size-normal" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Stack>
              <Stack spacing={1}>
                <CustomButton type="submit" sx={{padding: '10px 40px 10px 40px', borderRadius: '3px' }}>Sign up with Email</CustomButton>
                <CustomButton type="button" sx={{padding: '10px 40px 10px 40px', borderRadius: '3px' }}>Sign up with Google</CustomButton>
                <Typography sx={{textAlign: 'center'}}>You have an account? <CustomButton>Login</CustomButton></Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
    </Container>
  )
}