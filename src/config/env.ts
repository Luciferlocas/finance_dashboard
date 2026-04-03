import { config } from "dotenv";
config();

export default {
  PORT: Number(process.env.PORT),
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  DB_URL: process.env.DB_URL,
};
