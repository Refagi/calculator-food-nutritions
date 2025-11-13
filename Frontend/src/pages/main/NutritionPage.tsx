import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { Container, Box, Typography } from "@mui/material";
import CustomTextField from "@/components/customs/Input";
import "@/style/Main.css";
import EditIngredients from "@/components/EditIngredients";
import CustomButton from "@/components/customs/Buttons";
import CardTutorial from "@/components/CardTutorial";
import ResultCard from "@/components/ResultCard";
import Notification from "@/components/Notifications";
import api from "@/services/api";
import { type NutritionResult, type PropsNotification } from '@/types/typeDataNutritionPage'
import { useReactToPrint } from "react-to-print"; 
import axios from "axios";

const exIngridient = `
  ex:
  2 piring nasi putih,
  2 siung bawang putih, cincang halus,
  2 siung bawang merah, iris tipis,
  1 butir telur,
  2 sdm kecap manis,
  1 sdm saus tiram,
  Garam secukupnya,
  Lada secukupnya,
  1 sdm margarin atau minyak goreng,
  Bawang goreng,
  Kerupuk dan acar,
`;

export default function NutritionPage() {
  const [name, setFoodName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [portion, setPortion] = useState("");
  const [result, setResult] = useState<NutritionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [notification, setNotification] = useState<PropsNotification>({open: false, message: '', severity: 'success'});
  const printRef = useRef(null);

  const handleAnalyzeFood = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formatIngredients = ingredients.split(/\r?\n/).map(i => i.replace(/,$/, "").trim()).filter(i => i.length > 0);
      const res = await api.post("/food/details", {name, ingredients: formatIngredients, portion});
      setResult(res.data.data);
      console.log('print ingredient: ', res.data.data.ingredients)
      setShowResult(true);
      console.log('data bahan bahan: ', res.data.data)
      setNotification({
      open: true,
      message: res.data.messsage || 'Analyze food is suceess',
      severity: 'success',
    });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ||  error.response?.data?.error || "Failed to Register, Please try again"
        setNotification({
         open: true,
         message,
         severity: 'error',
        });
        return
      } else if (error instanceof Error) {
        const message = error.message;
        setNotification({
          open: true,
          message,
          severity: 'error'
        })
      } else {
        setNotification({
          open: true,
          message: 'An unexpected error occurred',
          severity: 'error'
        })
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false, message: '' });
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Nutrition-${result?.name || 'Food'}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });
  return (
    <>
      <Navbar />
      <Container className="containerNutrition">
        <Container className="containerFood" maxWidth="md">
          <Container component="form" className="itemFood" onSubmit={handleAnalyzeFood}>
            <CustomTextField
              label="Masukan nama makanan"
              id="foodName"
              name="foodName"
              required
              value={name}
              onChange={(e) => setFoodName(e.target.value)}
              disabled={loading}
              sx={{ maxWidth: "750px" }}
            />
            {result ? <EditIngredients result={result}/> :
            <CustomTextField
              label="Masukan Bahan-Bahan makanan (opsional)"
              multiline
              id="ingredients"
              name="ingredients"
              placeholder={`${exIngridient}`}
              minRows={4}
              maxRows={4}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              disabled={loading}
              sx={{
                maxWidth: "750px",
                "& textarea": {
                  minHeight: "85px !important",
                  mazxHeight: "120px !important",
                },
              }}
            />}
            <CustomTextField
              label="Masukan Jumlah porsi makanan"
              required
              id="portions"
              name="portions"
              sx={{ maxWidth: "750px" }}
              placeholder="ex: 1 piring / 1 gelas"
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
              disabled={loading}
            />
            <Box className="itemButtonFood">
              <CustomButton
              type="submit"
              disabled={loading}
                sx={{
                  width: "300px",
                  padding: "10px 0 10px 0",
                  borderRadius: "3px",
                  margin: "auto",
                  border: "2px solid var(--text-color)",
                }}
              >
                {loading ? "Menganalisis..." : "Analisis Makanan"}
              </CustomButton>
            </Box>
          </Container>

          {showResult && result && result.details && (
          <Box className="containerResult">
            <Box className="itemResult">
              <Box className="itemTextResult">
                <Typography
                  sx={{ fontWeight: "600", fontSize: "20px", color: "#d9376e" }}
                >
                  Hasil Analisis
                </Typography>
                <Typography sx={{ fontWeight: "550", fontSize: "22px" }}>
                  {result?.name} dengan bahan-bahan tersebut dengan jumlah porsi {result.portion} <br /> memiliki {result?.details.calories} kalori
                </Typography>
              </Box>
              <Box className="itemButtonPrint">
                <CustomButton
                  sx={{
                    width: "100%",
                    padding: "10px 0 10px 0",
                    borderRadius: "3px",
                    backgroundColor: "#272343",
                    color: "#fffffe",
                  }}
                  onClick={handlePrint}
                >
                  Print Hasil
                </CustomButton>
              </Box>
              <Box className="itemButtonResult">
                <CustomButton
                  sx={{ padding: "10px 30px 10px 30px", borderRadius: "3px" }}
                >
                  Edit Bahan-bahan
                </CustomButton>
                <CustomButton
                  sx={{ padding: "10px 30px 10px 30px", borderRadius: "3px" }}
                >
                  Hapus Bahan-bahan
                </CustomButton>
              </Box>
            </Box>
            <div ref={printRef}>
              <ResultCard result={result}/>
            </div>
          </Box>
          )}
        </Container>
        <Box className="containerTutorial">
          <CardTutorial />
        </Box>
      </Container>

      <Notification
      open={notification.open}
      message={notification.message}
      severity={notification.severity}
      onClose={handleCloseNotification}
      vertical="bottom"
      horizontal="center"
      autoHideDuration={5000}
      />
    </>
  );
}
