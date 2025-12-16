import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/apiAuth';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const response = await api.get('/auth/me');
        const userData = response.data.data;

        if (userData) {
          login(userData.name);
          navigate('/');
        } else {
          throw new Error('User data not found');
        }
      } catch (error) {
        console.error('Google callback error:', error);
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [login, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2
      }}
    >
      <CircularProgress />
      <Typography>Completing Google sign in...</Typography>
    </Box>
  );
}