import { useContext } from "react";
import ThemeContext from "@/context/ThemeContext";
import { Box, Typography, IconButton} from '@mui/material'
import DarkModeSharpIcon from '@mui/icons-material/DarkModeSharp';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import CustomButton from '@/components/customs/Buttons'
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from "react-router-dom";
import '@/style/Main.css'

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return(
    <>
      <Box component="header" className='header'>
      <Typography variant="subtitle1" sx={{fontWeight: 700,}}>Calculator Food Nutrition</Typography>
      <Box className='headerIcon'>
        {isAuthenticated ? (<CustomButton onClick={handleLogout} disabled={loading}>Logout</CustomButton>) : (<CustomButton onClick={() => navigate('/login')}>Login</CustomButton>)}
        <IconButton onClick={toggleDarkMode}>
          {darkMode ? (<LightModeSharpIcon sx={{color: '#fffffe'}}/>) : (<DarkModeSharpIcon sx={{color: '#272343'}}/>)}
        </IconButton>
      </Box>
    </Box>
    <hr className="hrOne"/>
    </>
  )
}