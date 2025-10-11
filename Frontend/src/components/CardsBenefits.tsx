import { useState, useEffect } from 'react'
import { Box, Card, CardContent, CardActionArea, Typography } from "@mui/material";
import '@/style/Main.css'

const cardContents = [
  {
    id: 1,
    title: "Pantau Asupan Gizi Harian",
    description: "Membantu pengguna menghitung kandungan kalori, protein, lemak, dan karbohidrat  dan sebagainya dari makanan yang dikonsumsi setiap hari.",
  },
  {
    id: 2,
    title: "Khusus Makanan Khas Indonesia",
    description: "Disesuaikan dengan data makanan khas Indonesia sehingga hasil perhitungan lebih relevan dengan kebiasaan makan masyarakat Indonesia.",
  },
  { 
    id: 3,
    title: "Mudah dan Praktis",
    description:"Pengguna hanya perlu memasukkan nama makanan, porsi, dan bahan tambahan, lalu kalkulator akan otomatis menampilkan nutrisinya.",
  },
  {
    id: 4,
    title: "Mendukung Pola Hidup Sehat",
    description:"Memudahkan pengguna merencanakan pola makan yang seimbang untuk menjaga kesehatan tubuh dan mencegah penyakit.",
  },
];

export default function CardBenefits () {
  const [selectedCard, setSelectedCard] = useState(0)
  return(
    <>
     <Box className='itemCards'>
        {cardContents.map((card, index) => (
        <Card sx={{borderRadius: '20px'}}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              color: 'var(--text-color)',
              backgroundColor: 'var(--body-card)',
              '&[data-active]': {
                backgroundColor: 'var(--item-card)',
                color: '#fffffe',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
              <Typography variant="h5" component="div" sx={{fontWeight: 700}}>
                {card.title}
              </Typography>
              <Typography variant="body2">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
     </Box>
    </>
  )
}