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
              sx={{ maxWidth: "750px" }}
            />
            <CustomTextField
              label="Masukan Bahan-Bahan makanan"
              multiline
              id="outlined-size-normal"
              placeholder={`${exIngridient}`}
              minRows={4}
              maxRows={4}
                sx={{ 
                  maxWidth: "750px",
                  '& textarea': {
                    minHeight: '85px !important',
                    mazxHeight: '120px !important',
                    }
                  }}
            />
            <CustomTextField
              label="Masukan Jumlah porsi makanan"
              id="outlined-size-normal"
              sx={{ maxWidth: "750px" }}
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
          <Box className="containerResult">
            <Box className="itemResult">
              <Box className="itemTextResult">
               <Typography sx={{fontWeight: '600', fontSize: '20px', color: "#d9376e"}}>Hasil Analisis</Typography>
               <Typography sx={{fontWeight: '550', fontSize: '22px'}}>Makanan dengan bahan-bahan dan <br /> jumlah porsi tersebut memiliki 1500 kalori</Typography>
              </Box>
              <Box className="itemButtonPrint">
                <CustomButton sx={{width: '100%', padding: '10px 0 10px 0', borderRadius: '3px', backgroundColor: '#272343', color: '#fffffe'}}>Print Hasil</CustomButton>
              </Box>
              <Box className="itemButtonResult">
                <CustomButton sx={{padding: '10px 40px 10px 40px', borderRadius: '3px' }}>Edit Bahan-bahan</CustomButton>
                <CustomButton sx={{padding: '10px 40px 10px 40px', borderRadius: '3px' }}>Hapus Bahan-bahan</CustomButton>
              </Box>
            </Box>

          </Box>
        </Container>
        <Box className="containerTutorial">
          <CardTutorial/>
        </Box>
      </Container>
    </>
  );
}
