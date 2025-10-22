import { Box, Typography, Stack, Link, Checkbox, FormControlLabel } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextField from "@/components/customs/Input";
import PasswordInput from "@/components/customs/PasswordInput";
import CustomButton from "@/components/customs/Buttons";
import '@/style/Main.css';

const GoogleIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>                
 </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <Box className='itemFormAuth'>
      <Box className='headerForm'>
        <Typography variant="h5" sx={{ fontWeight: '800'}}>
          Welcome back
        </Typography>
        <Typography sx={{ fontWeight: '400',}}>
          Enter your credentials to access your account
        </Typography>
      </Box>

      <Box 
        component='form' 
        onSubmit={handleSubmit}
        sx={{
          minWidth: '350px', 
          display: 'flex', 
          flexDirection: 'column', 
          // gap: '20px'
        }}
      >
        <Stack spacing={2}>
          <CustomTextField 
            fullWidth 
            required 
            label='Email'
            type="email" 
            placeholder="example@gmail.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '20px',
        }}>
          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>}
            label="Remember me"/>
        </Box>

        <Stack spacing={1.5}>
          <CustomButton 
            type="submit" 
            sx={{
              padding: '10px 40px', 
              borderRadius: '3px'
            }}
          >
            Sign in
          </CustomButton>

          <CustomButton 
            type="button" 
            sx={{
              padding: '10px 40px', 
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          > 
            <GoogleIcon />
            Sign in with Google
          </CustomButton>

          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            Don't have an account?{' '}
            <Link 
              component='button'
              type="button"
              onClick={() => navigate('/register')}
              sx={{
                fontWeight: 700, 
                textDecoration: 'none', 
                color: 'var(--text-color)',
                cursor: 'pointer'
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}