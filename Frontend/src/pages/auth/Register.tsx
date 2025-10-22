import { Box, Typography, Stack, Link } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextField from "@/components/customs/Input";
import PasswordInput from "@/components/customs/PasswordInput";
import CustomButton from "@/components/customs/Buttons";
import '@/style/Main.css';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password });
  };

  return (
    <Box className='itemFormAuth'>
      <Box className='headerForm'>
        <Typography variant="h5" sx={{ fontWeight: '800',}}>
          Create an account
        </Typography>
        <Typography sx={{ fontWeight: '400' }}>
          Enter your email to sign up for this app
        </Typography>
      </Box>

      <Box 
        component='form' 
        onSubmit={handleSubmit}
        sx={{
          minWidth: '350px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px'
        }}
      >
        <Stack spacing={2}>
          <CustomTextField 
            fullWidth 
            required 
            label='Name'
            type="text" 
            placeholder="example" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

        <Stack spacing={1.5}>
          <CustomButton 
            type="submit" 
            sx={{
              padding: '10px 40px', 
              borderRadius: '3px'
            }}
          >
            Sign up with Email
          </CustomButton>

          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            Already have an account?{' '}
            <Link 
              component='button'
              type="button"
              onClick={() => navigate('/login')}
              sx={{
                fontWeight: 700, 
                textDecoration: 'none', 
                color: 'var(--text-color)',
                cursor: 'pointer'
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}