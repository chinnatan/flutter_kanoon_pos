import { Jwt, JwtPayload, Secret, sign, SignOptions, verify } from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { logger } from "./logger.util";
import User from "../models/db/User";

const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY || "";
const JWT_EXPIRED_IN: string = process.env.JWT_EXPIRE_IN || "1h";

const JWT_REFERSH_TOKEN_SECRET_KEY: Secret = process.env.JWT_REFERSH_TOKEN_SECRET_KEY || "";
const JWT_REFRESH_EXPIRE_IN: string = process.env.JWT_REFRESH_EXPIRE_IN || "1h";

const signOptions: SignOptions = {
  expiresIn: JWT_EXPIRED_IN,
};

const refreshSignOptions: SignOptions = {
  expiresIn: JWT_REFRESH_EXPIRE_IN,
};

export default class AuthUtil {
  static generateToken(userInfo: UserModel): string {
    const payload = JSON.stringify(userInfo);
    return sign(JSON.parse(payload), JWT_SECRET_KEY, signOptions);
  }

  static generateRefreshToken(userInfo: UserModel): string {
    const payload = JSON.stringify(userInfo);
    return sign(JSON.parse(payload), JWT_REFERSH_TOKEN_SECRET_KEY, refreshSignOptions);
  }

  static verifyToken(token: string): Jwt | JwtPayload | string {
    return verify(token, JWT_SECRET_KEY);
  }

  static async updateRefreshToken(token: string, userId: number) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("ไม่พบผู้ใช้งาน");
      }
      user.refresh_token = token;
      const updated = await user.save();
      logger.info(`updated refresh token ${updated} rows`);
    } catch (error) {
      logger.error(error);
    }
  }
}
