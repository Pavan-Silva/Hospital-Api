import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (req.path.includes("/auth/login")) {
    return next();
  }

  if (req.cookies["auth-cookie"]) {
    token = req.cookies["auth-cookie"];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

      req.user = decoded;
      next();
    } catch (error: any) {
      res.status(401);
      res.send({ error: error.message });
    }
  } else {
    res.status(401);
    res.send({ error: "Authentication failed" });
  }
};

const checkRole = (roles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      res.status(403);
      res.send({ error: "Not authorized, insufficient permissions" });
    }

    next();
  };
};

export { checkRole, authMiddleware };
