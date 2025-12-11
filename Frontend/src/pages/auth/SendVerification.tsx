import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/components/customs/Buttons";
import axios from "axios";
import api from "@/services/apiAuth";
import '@/style/Main.css';


export default function SendVerifyEmail() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onClick = async () => {
    setLoading(true)
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await api.post("/auth/send-verification-email");
      const tokens = response.data?.tokens;

      if (tokens) {
        setSuccessMessage(`${response.data.message}`);
        // navigate("/login");
      } else {
        throw new Error("Token Not Found!");
      }
    } catch (error: unknown) {
      console.error("Send Verification Error:", error);

      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to Send Verification, Please try again"
        );
      } else {
        setErrorMessage("Failed to Send Verification, Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Box className='itemFormAuth'>
    <Box>
    </Box>
          <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/login')}
        sx={{
          color: "var(--text-color)",
          textTransform: "none",
          fontSize: '14px',
          fontWeight: '700',
          backgroundColor: 'transparent',
          '&:hover': {
          backgroundColor: 'transparent'
    }
        }}
      >
        Kembali
      </Button>
      <Box className='headerForm'>
        <Typography variant="h5" sx={{ fontWeight: '800',}}>
          Click Send Verify Email
        </Typography>
      {errorMessage && (
        <Typography
          color="error"
          sx={{ mb: 2, fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
        >
          {errorMessage}
        </Typography>
      )}
      {successMessage && (
        <Typography
          color="var(--text-color)"
          sx={{ mb: 2, fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
        >
          {successMessage}
        </Typography>
      )}
      <Typography>Please do not close this page until your email verification is successful</Typography>
      </Box>
    </Box>
      <CustomButton 
            type="submit" 
            onClick={onClick}
            sx={{
              padding: '5px 50px 5px 50px', 
              borderRadius: '3px'
            }}
          >
            {loading ? 'Sending...' : 'Send'}
      </CustomButton>
    </>
  )
}