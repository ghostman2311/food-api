import { AuthPayload } from "../dto/auth.dto";
import { Request, Response, NextFunction } from "express";
import { validateToken } from "../utility";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isValid = await validateToken(req);

  if (isValid) {
    next();
  } else {
    return res.json({ message: "User not authorized" });
  }
};
