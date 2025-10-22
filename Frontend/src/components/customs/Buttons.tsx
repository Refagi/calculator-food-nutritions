import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@/style/Main.css";

const CustomButton = styled(Button)({
  textTransform: "none",
  color: 'var(--text-color)',
  fontWeight: 700,
  padding: '0 20px 0 20px',
  transition: "all 0.3s ease",
  border: '2px solid var(--text-color)',
  borderRadius: '20px',
  "&:hover": {
    backgroundColor: "var(--button-color)",
    border: "2px solid transparent",
    outline: "2px solid #272343",
    color:'#fffffe'
  },
  "&:disabled": {
    backgroundColor: "#6c757d",
    color: "#e0e0e0",
  },
});

export default CustomButton;
