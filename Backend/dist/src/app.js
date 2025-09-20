import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// aktifin parsing json
app.use(express.json());
// aktifin urlencoded
app.use(express.urlencoded({ extended: true }));
// Route dasar
app.get("/", (req, res) => {
    res.json({ message: "Hello from Express + TypeScript + ESM!" });
});
export default app;
//# sourceMappingURL=app.js.map