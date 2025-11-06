import { useEffect, useState, } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Box, Typography, CircularProgress } from '@mui/material';
import api from '@/services/apiAuth';
import axios from 'axios';
import '@/style/Main.css'

export default function VerifyEmail() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();


  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get('tokens');
      if (!token) {
        setStatus('error')
        setMessage('Token not found');
        return
      }
      setStatus('loading');

      try {
        const response = await api.get(`/auth/verify-email?tokens=${token}`);
        setStatus('success');
        setMessage(response.data.message || 'Success Verification Email!');
      } catch (error: unknown) {
        console.error('Verification Error:', error);
        setStatus('error');
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.message ||  error.response?.data?.error || 'Failed to Verification Email, Please try again');
        } else if (error instanceof Error) {
          setMessage(error.message)
        } else {
          setMessage('An unexpected error occurred');
        }
      }
    };

    verify();
  }, [searchParams]);


  return (
    <Box className='itemFormAuth'>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: '700' }}>
          Verification Email
        </Typography>
        <Typography
          variant="body2"
          color="var(--text-color)"
          sx={{ fontSize: '16px' }}
        >
          {status === 'loading' && 'Memverifikasi email Anda...'}
          {status === 'success' && message}
          {status === 'error' && message}
        </Typography>
      </Box>

      {status === 'loading' && <CircularProgress sx={{ my: 2 }} />}

      {(status === 'success' || status === 'error')}
    </Box>
  );
}
