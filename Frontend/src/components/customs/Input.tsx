import { TextField} from "@mui/material";
import { styled } from "@mui/material/styles";
import "@/style/Main.css";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--input-color-food)",
    },
    "&:hover fieldset": {
      borderColor: "var(--input-color-food)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--input-color-food)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--input-color-food)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--input-color-food)",
  },
  "& .MuiInputBase-input": {
    color: "var(--input-color-food)",
    fontSize: "14px",
    padding: "15px",
  },
});



export default CustomTextField