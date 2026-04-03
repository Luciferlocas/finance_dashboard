import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../helpers/auth/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyJWT(token);
    req.user = decoded as { id: string; role: string };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export const authorize = (roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access Denied" });
    }
    next();
  };
};
