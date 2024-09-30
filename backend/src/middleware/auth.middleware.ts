import { NextFunction, Request, Response } from "express";
import { Handle } from "../handle/handle";

import firebaseAdmin from "firebase-admin";
import * as serviceAccount from "../config/kanoon-pos-firebase-adminsdk.json";

const initFirebaseAdmin = () => {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount as any),
  });
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const h = new Handle("auth", req, res);

  initFirebaseAdmin();

  const authHeader = req.header("Authorization");
  if (!authHeader) return h.error("คุณไม่มีสิทธิ์ในการเข้าถึง", 401);

  try {
    const token = authHeader.replace("Bearer ", "");
    const verified = await firebaseAdmin.auth().verifyIdToken(token);
    next();
  } catch (err) {
    h.error("โทเค็นไม่ถูกต้อง", 403);
  }
};

// export const refreshTokenValidate = async (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.header("Authorization");

//   try {
//     if (!authHeader) {
//       return res.status(403).send("<center>You do not have permission to use this section.</center>");
//     }

//     const token = authHeader.replace("Bearer ", "");
//     jwt.verify(token, JWT_REFERSH_TOKEN_SECRET_KEY, (err, decoded) => {
//       if (err) throw new Error(err.stack);
//       req.user = decoded as UserModel;
//       req.user.refresh_token = token;

//       delete req.user.exp;
//       delete req.user.iat;
//     });
//   } catch (err) {
//     return res.status(403).send("<center>You do not have permission to use this section.</center>");
//   }
//   return next();
// };
