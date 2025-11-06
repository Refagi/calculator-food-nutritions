import { Box, Typography, Stack, Link } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextField from "@/components/customs/Input";
import PasswordInput from "@/components/customs/PasswordInput";
import CustomButton from "@/components/customs/Buttons";
import api from '@/services/apiAuth'
import axios from "axios";
import '@/style/Main.css';

interface TypeRegister {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  const onSubmit = async (data: TypeRegister) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post("/auth/register", data);

      if (response.status === 201) {
        navigate("/send-verification-email");
      } else {
        throw new Error("Token Not Found!");
      }
    } catch (error: unknown) {
      console.error("Register Error:", error);

      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ||  error.response?.data?.error || "Failed to Register, Please try again"
        );
        return
      } else if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("An unexpected error occurred");
        return;
      }
    } finally {
      setLoading(false);
    }
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

      {errorMessage && (
        <Typography color="error" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
          {errorMessage}
        </Typography>
      )}
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
            {loading ? 'Loading...' : 'Sign up with Email'}
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