import cors from "cors";
import express from "express";
import routerlogger from "express-list-endpoints";
import { connectDB } from "./config/db";
import config from "./config/env";
import APIRouter from "./routes";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./documentation.yaml');

const app = express();
const PORT = config.PORT;

async function bootstrap() {
  try {
    await connectDB();
    app.set("trust proxy", 1);
    app.use(express.json());
    app.use(
      cors({
        origin: config.CORS_ORIGIN,
      })
    );
    app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, {
        customSiteTitle: "Finance Dashboard API Docs"
      })
    );
    app.use("/api", APIRouter);

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    console.table(routerlogger(app));
  } catch (error) {
    console.error("Failed to bootstrap", error);
    process.exit(1);
  }
}

bootstrap();
