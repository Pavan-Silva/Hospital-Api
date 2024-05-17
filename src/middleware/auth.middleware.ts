import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import ResponseError from "../configs/responseError";

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
        throw new Error();
      }

      req.user = user;
      next();
    } catch (error: any) {
      next(new ResponseError(401, "Authentication failed"));
    }
  } else {
    next(new ResponseError(401, "Authentication failed"));
  }
};

const checkRequiredRole = (roles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      res.status(403);
      res.send({ error: "Not authorized, insufficient permissions" });
    }

    next();
  };
};

export { checkRequiredRole, authMiddleware };
