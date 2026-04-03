import { sign, verify } from "jsonwebtoken";
import { privateKey, publicKey } from "../../config/key";

export const createJWT = <T extends object>(payload: T): string => {
  return sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "4380h",
  });
};

export const verifyJWT = <T extends object>(token: string): T => {
  return verify(token, publicKey, {
    algorithms: ["RS256"],
  }) as T;
};
