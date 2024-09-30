import { Request, Response } from "express";
import { Handle } from "../handle/handle";
import HTTPException from "../exception/http.exception";
import { logger } from "../utils/logger.util";
import { getClient } from "../db/index";
import DBConstant from "../constant/db.const";

export const getUserInfo = async (req: Request, res: Response) => {
  const h = new Handle("getUserInfo", req, res);
  const client = await getClient();
  try {
    const { uuid } = req.params;
    if (!uuid) {
      throw new HTTPException("กรุณากรอก uuid", 400);
    }

    const { rows } = await client.query("SELECT * FROM users WHERE uuid = $1", [uuid]);

    if (rows.length === 0) {
      throw new HTTPException("ไม่พบข้อมูล", 404);
    }

    h.success(rows[0]);
  } catch (error) {
    h.error(error, error, 500);
  }
};

export const register = async (req: Request, res: Response) => {
  const h = new Handle("register", req, res);
  const client = await getClient();
  try {
    const { email, fullname, image, storename, uuid, accessToken, refreshToken } = req.body;

    if (!email || !fullname || !image || !storename || !uuid || !accessToken || !refreshToken) {
      throw new HTTPException("กรุณากรอกข้อมูลให้ครบถ้วน", 400);
    }

    await client.query(DBConstant.BEGIN);

    const queryInsertStore = "INSERT INTO stores (name, create_date) VALUES ($1, now()) RETURNING id";
    const paramInsertStore = [storename];
    const resultStore = await client.query(queryInsertStore, paramInsertStore);

    if (!resultStore) {
      throw new HTTPException("สมัครสมาชิกไม่สำเร็จ", 500);
    }

    const queryInsertUser = "INSERT INTO users (email, fullname, image, uuid, store_id, create_date) VALUES ($1, $2, $3, $4, $5, now()) RETURNING id";
    const paramInsertUser = [email, fullname, image, uuid, resultStore.rows[0].id];
    const resultUser = await client.query(queryInsertUser, paramInsertUser);

    if (!resultUser) {
      throw new HTTPException("สมัครสมาชิกไม่สำเร็จ", 500);
    }

    const queryInsertUserToken = "INSERT INTO users_token (access_token, refresh_token, user_id, create_date) VALUES ($1, $2, $3, now()) RETURNING id";
    const paramInsertUserToken = [accessToken, refreshToken, resultUser.rows[0].id];
    const resultUserToken = await client.query(queryInsertUserToken, paramInsertUserToken);

    if (!resultUserToken) {
      throw new HTTPException("สมัครสมาชิกไม่สำเร็จ", 500);
    }

    await client.query(DBConstant.COMMIT);

    h.success("สมัครสมาชิกสำเร็จ", 201);
  } catch (error) {
    await client.query(DBConstant.ROLLBACK);
    h.error(error, error, 500);
  }
};

// export const register = async (req: Request, res: Response) => {
//   const h = new Handle("register", req, res);
//   const t = await sequelize.transaction();
//   try {
//     const { username, password, fullname, role, store_name } = req.body;
//     if (!username) {
//       throw new HTTPException("กรุณากรอกชื่อผู้ใช้งาน", 400);
//     }
//     if (!password) {
//       throw new HTTPException("กรุณากรอกรหัสผ่าน", 400);
//     }
//     if (!fullname) {
//       throw new HTTPException("กรุณากรอกชื่อและนามสกุล", 400);
//     }
//     if (!role) {
//       throw new HTTPException("กรุณากรอกตำแหน่ง", 400);
//     }

//     let store = null;
//     if (role === "admin") {
//       store = await Store.create({ name: store_name }, { transaction: t }).catch(() => {
//         throw new HTTPException("สมัครสมาชิกไม่สำเร็จ", 400);
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create(
//       {
//         username,
//         password: hashedPassword,
//         fullname: fullname,
//         role,
//         store_id: store?.id,
//       },
//       { transaction: t }
//     ).catch(() => {
//       throw new HTTPException("เกิดข้อผิดพลาดกรุณาติดต่อผู้ดูแลระบบ", 400);
//     });
//     await t.commit();
//     h.success("สมัครสมาชิกสำเร็จ", 201);
//   } catch (error) {
//     await t.rollback();
//     h.error(error, error, 500);
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   const h = new Handle("login", req, res);
//   try {
//     logger.info("%s", req.body);
//     const { username, password } = req.body;
//     if (!username || !password) {
//       throw new HTTPException("กรุณากรอกชื่อผู้ใช้งานและรหัสผ่านให้ครบถ้วน", 400);
//     }

//     User.hasOne(Store, { foreignKey: "id", sourceKey: "store_id" });

//     const user = await User.findOne({
//       include: [{ model: Store, required: true }],
//       where: { username },
//     })
//       .then((user) => user?.toJSON())
//       .catch(() => {
//         throw new HTTPException("ไม่พบผู้ใช้งาน", 404);
//       });

//     if (!user) {
//       throw new HTTPException("ไม่พบผู้ใช้งาน", 404);
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       throw new HTTPException("รหัสผ่านไม่ถูกต้อง", 400);
//     }

//     let userInfo = new UserModel(user.id, user.username, user.fullname, user.role, user.store_id, user.store.name);
//     const token = AuthUtil.generateToken(user);
//     const refreshToken = AuthUtil.generateRefreshToken(user);

//     userInfo.token = token;
//     userInfo.refresh_token = refreshToken;

//     await AuthUtil.updateRefreshToken(refreshToken, user.id);

//     h.success(userInfo);
//   } catch (error) {
//     h.error(error, error, 500);
//   }
// };

// export const refreshToken = async (req: Request, res: Response) => {
//   const h = new Handle("refreshToken", req, res);
//   try {
//     const oldRefreshToken = await User.findOne({
//       attributes: ["refresh_token"],
//       where: {
//         id: req.user.id,
//       },
//     })
//       .then((user) => user?.toJSON())
//       .catch(() => {
//         throw new HTTPException("ไม่พบผู้ใช้งาน", 404);
//       });

//     if (!oldRefreshToken) {
//       throw new HTTPException("ไม่พบโทเค็น", 404);
//     }

//     if (req.user != undefined) {
//       delete req.user.token;
//       delete req.user.refresh_token;

//       const accessToken = AuthUtil.generateToken(req.user);
//       const refreshToken = AuthUtil.generateRefreshToken(req.user);

//       req.user.token = accessToken;
//       req.user.refresh_token = refreshToken;

//       await AuthUtil.updateRefreshToken(refreshToken, req.user.id);

//       return h.success({
//         token: accessToken,
//         refresh_token: refreshToken,
//       });
//     }

//     throw new HTTPException("เกิดข้อผิดพลาดกรุณาติดต่อผู้ดูแลระบบ", 400);
//   } catch (error) {
//     h.error(error, error, 500);
//   }
// };
