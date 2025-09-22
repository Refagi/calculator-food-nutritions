import express from "express";
import config from './config/config.js';
import morgan from './config/morgan.js';
import { jwtStrategy, googleStrategy } from './config/passport.js';
import xssSentinize from './middlewares/sentinize.js';
import { errorHandler, errorConverter } from "./middlewares/error.js";
import passport from "passport";
import helmet from "helmet";
import cors from 'cors';
import compression from "compression";
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));
app.use(xssSentinize);
app.use(cors({
    // origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(compression({
    level: 6,
    threshold: 1024 //compress > 1024
}));
// aktifin parsing json
app.use(express.json());
// aktifin urlencoded
app.use(express.urlencoded({ extended: true }));
// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
passport.use('google', googleStrategy);
// Route dasar
app.get("/", (req, res) => {
    res.json({ message: "Hello from Express + TypeScript + ESM!" });
});
// convert error to ApiError, if needed
app.use(errorConverter);
// handle error
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map