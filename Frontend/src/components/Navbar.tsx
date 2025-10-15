import { useContext } from "react";
import ThemeContext from "@/context/ThemeContext";
import { Box, Typography, IconButton} from '@mui/material'
import DarkModeSharpIcon from '@mui/icons-material/DarkModeSharp';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import CustomButton from '@/components/customs/Buttons'

export default function NavbarMain() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  return(
    <>
      <Box component="header" className='header'>
      <Typography variant="subtitle1" sx={{fontWeight: 700,}}>Calculator Food Nutrition</Typography>
      <Box className='headerIcon'>
        <CustomButton>Login</CustomButton>
        <IconButton onClick={toggleDarkMode}>
          {darkMode ? (<LightModeSharpIcon sx={{color: '#fffffe'}}/>) : (<DarkModeSharpIcon sx={{color: '#272343'}}/>)}
        </IconButton>
      </Box>
    </Box>
    <hr />
    </>
  )
}