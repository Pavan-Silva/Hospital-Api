import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (req.path.includes("/auth/login")) {
    next();
  }

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    token = token.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

      const user = await User.findById(decoded.userId).select("-password");
      (req as any).user = user;

      next();
    } catch (error) {
      res.status(401);
      res.send({ error: "Invalid token or user" });
    }
  } else {
    res.status(401);
    res.send({ error: "Token not found" });
  }
};

const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user.role;

    if (!roles.includes(userRole)) {
      res.status(403);
      res.send({ error: "Not authorized, insufficient permissions" });
    }

    next();
  };
};

export { checkRole, authMiddleware };
