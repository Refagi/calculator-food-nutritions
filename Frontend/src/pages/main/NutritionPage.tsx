import { useState } from "react";
import NavbarMain from "@/components/Navbar";
import { Container, Box, TextField, Typography } from "@mui/material";
import CustomTextField from "@/components/customs/Input";
import "@/style/Main.css";
import CustomButton from "@/components/customs/Buttons";
import CardTutorial from "@/components/CardTutorial";

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
  return (
    <>
      <NavbarMain />
      <Container className="containerNutrition">
        <Container className="containerFood" maxWidth="md">
          <Container component="form" className="itemFood">
            <CustomTextField
              label="Masukan nama makanan"
              id="outlined-size-normal"
              sx={{ maxWidth: "700px" }}
            />
            <CustomTextField
              label="Masukan Bahan-Bahan makanan"
              multiline
              id="outlined-size-normal"
              placeholder={`${exIngridient}`}
              minRows={4}
              maxRows={20}
              sx={{ maxWidth: "700px" }}
            />
            <CustomTextField
              label="Masukan Jumlah porsi makanan"
              id="outlined-size-normal"
              sx={{ maxWidth: "700px" }}
              placeholder="ex: 1 piring / 1 gelas"
            />
            <Box className="itemButtonFood">
              <CustomButton
                sx={{
                  width: "300px",
                  padding: "10px 0 10px 0",
                  borderRadius: "3px",
                  margin: "auto",
                  border: "2px solid var(--text-color)",
                }}
              >
                Analisis Makanan
              </CustomButton>
            </Box>
          </Container>
        </Container>
        <Box className="itemTutorial">
          <CardTutorial/>
        </Box>
      </Container>
    </>
  );
}
