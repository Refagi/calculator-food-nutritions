import { Box, Typography, Stack, Link } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextField from "@/components/customs/Input";
import PasswordInput from "@/components/customs/PasswordInput";
import CustomButton from "@/components/customs/Buttons";
import Notification from "@/components/Notifications";
import { type PropsNotification } from "@/types/typeDataNutritionPage";
import api from '@/services/apiAuth'
import axios from "axios";
import '@/style/Main.css';
import '@/style/MainResponsive.css';

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
  const [notification, setNotification] = useState<PropsNotification>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  const onSubmit = async (data: TypeRegister) => {
    setLoading(true);

    try {
      const response = await api.post("/auth/register", data);

      if (response.status === 201) {
        navigate("/send-verification-email");
      } else {
        setNotification({
          open: true,
          message: "FORBIDDEN, Token Not Found!",
          severity: "error",
        });
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to Register, Please try again";
        setNotification({
          open: true,
          message,
          severity: "error",
        });
        return
      } else if (error instanceof Error) {
        setNotification({
          open: true,
          message: error.message,
          severity: "error",
        });
        return
      } else {
        setNotification({
          open: true,
          message: "An unexpected error occurred",
          severity: "error",
        });
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false, message: "" });
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
        className="contentForm"
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

     <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
        vertical="bottom"
        horizontal="center"
        autoHideDuration={5000}
      />
    </Box>
  )
}