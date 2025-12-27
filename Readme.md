# Calculator Food Nutritions

is a web application for calculating the nutritional content of food (specifically Indonesian food), with Indonesian food data obtained from [Kaggle](https://www.kaggle.com/datasets/anasfikrihanif/indonesian-food-and-drink-nutrition-dataset)


## Screenshots

![page 1](./docs/calculator-food-nutritions.png)

## Installation

Install with npm

```bash
  git clone https://github.com/Refagi/calculator-food-nutritions.git 
```

for Backend
```bash
  cd Bakcend
  npm install / npm i
  source venv/Scripts/activate
  python scripts/import_to_supabase.py
  npx prisma generate
  npx prisma db push
  npm run dev
```
for Frontend
```bash
  cd Frontend
  npm install / npm i
  npm run dev
```

If you have Docker, change the URL from localhost to backend/frontend. Adjust accordingly.
```bash
docker compose up -d --build
open http://localhost:5000/
```

## Tech Stack

**Client:** React, React-router, Material UI 

**Server:** Node, Express, Prisma, JWT

