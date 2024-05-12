import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
  user?: IUser;
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

      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        throw new Error("Authentication failed, User not found");
      }

      req.user = user;
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
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user.role;

    if (!roles.includes(userRole)) {
      res.status(403);
      res.send({ error: "Not authorized, insufficient permissions" });
    }

    next();
  };
};

export { checkRole, authMiddleware };
