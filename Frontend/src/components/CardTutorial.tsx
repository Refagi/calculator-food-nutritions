import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  CardMedia
} from "@mui/material";
import "@/style/Main.css";

const cardContents = [
  {
    id: 1,
    title: "1.",
    img: "../../public/1.png",
    description: "Masukan Nama, Bahan-bahan dan Porsi Makanan",
  },
  {
    id: 2,
    title: "2.",
    img: "../../public/2.png",
    description: "Click 'Analisis Makanan'",
  },
  {
    id: 3,
    title: "3.",
    img: "../../public/3.png",
    description: "Dapatkan Detail Nutritions",
  },
];

export default function CardTutorial() {
  const [selectedCard, setSelectedCard] = useState(0);
  return (
    <>
      <Box className="itemCardsTutorial">
        {cardContents.map((card, index) => (
          <Card
            key={card.id}
            sx={{
              borderRadius: "12px",
              boxShadow:
                "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
              backgroundColor: "var(--body-card)",
              height: "35vh",
            }}
          >
            <CardActionArea
              onClick={() => setSelectedCard(index)}
              data-active={selectedCard === index ? "" : undefined}
              sx={{
                height: "100%",
                color: "var(--text-color)",
                "&[data-active]": {
                  backgroundColor: "var(--item-card)",
                  color: "#fffffe",
                  "&:hover": {
                    backgroundColor: "action.selectedHover",
                  },
                },
              }}
            >
              <CardMedia
                component="img"
                image={card.img}
                alt={card.title || "tutorial image"}
                sx={{
                  maxHeight: 100,
                  objectFit: "contain",
                  padding: "20px",
                }}
              />
              <CardContent className="contentCardsTutorial">
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: 700 }}
                >
                  {card.title}
                </Typography>
                <Typography variant="body2">{card.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </>
  );
}
