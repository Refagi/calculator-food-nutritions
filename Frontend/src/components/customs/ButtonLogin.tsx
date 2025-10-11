import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@/style/Main.css";

const CustomButtonLogin = styled(Button)({
  textTransform: "capitalize",
  color: 'var(--text-color)',
  fontWeight: 700,
  padding: '0 20px 0 20px',
  transition: "all 0.3s ease",
  border: '2px solid var(--text-color)',
  borderRadius: '20px',
  "&:hover": {
    backgroundColor: "#272343",
    border: 'none',
    color:'#fffffe'
  },
  "&:disabled": {
    backgroundColor: "#6c757d",
    color: "#e0e0e0",
  },
});

export default CustomButtonLogin;
