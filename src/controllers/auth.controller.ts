import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ResponseError from "../configs/responseError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(new Error("User registration failed"));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      throw new ResponseError(404, "Authentication failed");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new ResponseError(404, "Authentication failed");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("auth-cookie", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};
