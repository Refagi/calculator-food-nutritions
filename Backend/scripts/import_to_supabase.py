# scripts/import_to_supabase.py
import os, re, sys
import pandas as pd
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

CSV_PATH = os.getenv("CSV_PATH", "data/nutrition.csv")
DB_URL = os.getenv("DIRECT_URL")

if not DB_URL:
    raise SystemExit("Set DIRECT_URL di .env (bukan DATABASE_URL pgbouncer)")

# SQLAlchemy expects postgresql+psycopg2://
if DB_URL.startswith("postgresql://"):
    DB_URL = DB_URL.replace("postgresql://", "postgresql+psycopg2://", 1)

engine = create_engine(DB_URL, pool_size=5, max_overflow=10)

# normalize functions
def normalize_name(s):
    if pd.isna(s): return None
    s = str(s).strip().lower()
    s = re.sub(r'\s+', ' ', s)
    return s

def parse_num(x):
    if pd.isna(x) or x == "": return None
    s = str(x).strip().replace(',','')
    m = re.search(r'([-+]?\d+(\.\d+)?)', s)
    return float(m.group(1)) if m else None

def prepare_df(path):
    df = pd.read_csv(path, low_memory=False)
    # Expected CSV columns: id, calories, proteins, fat, carbohydrate, name, image
    rename_map = {
        "id": "externalId",
        "calories": "calories",
        "proteins": "protein",
        "fat": "fat",
        "carbohydrate": "carbs",
        "name": "name",
        "image": "image_url"
    }
    for k,v in rename_map.items():
        if k in df.columns:
            df = df.rename(columns={k:v})

    if "name" not in df.columns:
        raise SystemExit("CSV harus punya kolom 'name'")
    df["name"] = df["name"].apply(normalize_name)
    df["slug"] = df["name"].apply(lambda x: x.replace(" ", "-") if x else None)

    for c in ["calories","protein","carbs","fat"]:
        if c in df.columns:
            df[c] = df[c].apply(parse_num)
        else:
            df[c] = None

    for opt in ["externalId","image_url",]:
        if opt not in df.columns:
            df[opt] = None

    cols_keep = ["externalId","name","calories","protein","carbs","fat","image_url"]
    df = df[cols_keep]
    df = df.drop_duplicates(subset=["name"], keep="first")
    return df

def run(path):
    df = prepare_df(path)
    print("Rows after clean:", len(df))

    with engine.begin() as conn:
        print("Writing staging table 'foods_staging' ...")
        df.to_sql(
            'foods_staging',
            con=conn,
            if_exists='replace',
            index=False,
            method='multi',
            chunksize=2000
        )
        print("Running upsert into 'foods' ...")

        upsert_sql = text("""
            INSERT INTO foods ("externalId", name, calories, protein, carbs, fat, image_url, "createdAt")
            SELECT "externalId", name, calories, protein, carbs, fat, image_url, now()
            FROM foods_staging
            ON CONFLICT (name) DO UPDATE SET
              "externalId" = EXCLUDED."externalId",
              calories = EXCLUDED.calories,
              protein = EXCLUDED.protein,
              carbs = EXCLUDED.carbs,
              fat = EXCLUDED.fat,
              image_url = EXCLUDED.image_url;
        """)

        conn.execute(upsert_sql)
        conn.execute(text("DROP TABLE IF EXISTS foods_staging;"))

    print("✅ Import + upsert selesai.")


if __name__ == "__main__":
    p = sys.argv[1] if len(sys.argv) > 1 else CSV_PATH
    run(p)
