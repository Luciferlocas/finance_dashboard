import fs from "fs";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

const privateKeyPath = isProd
  ? "/etc/secrets/private.pem"
  : path.join(process.cwd(), "keys/private.pem");

const publicKeyPath = isProd
  ? "/etc/secrets/public.pem"
  : path.join(process.cwd(), "keys/public.pem");

export const privateKey = fs.readFileSync(privateKeyPath, "utf8");
export const publicKey = fs.readFileSync(publicKeyPath, "utf8");
