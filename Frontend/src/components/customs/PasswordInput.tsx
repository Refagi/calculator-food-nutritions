import { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styled from '@emotion/styled';
import '@/style/Main.css'

const CustomOutlinedInput = styled(OutlinedInput)({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--input-color-food)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#bae8e8", 
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--input-color-food)", 
  },
  "& input": {
    color: "var(--input-color-food)",
  },
  "&.Mui-focused .MuiIconButton-root": {
    color: "var(--input-color-food)",
  },
})

const CustomInputLabel = styled(InputLabel)({
  color: "var(--input-color-food)",
  "&.Mui-focused": {
    color: "var(--input-color-food)",
  },
})

interface PasswordProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({ value, onChange }: PasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" required fullWidth>
      <CustomInputLabel htmlFor="outlined-adornment-password">Paassword</CustomInputLabel>
      <CustomOutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder='example123#'
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> :  <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}