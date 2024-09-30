import { Request, Response } from "express";
import { logger } from "../utils/logger.util";
import { ResponseHandle } from "../models/service/response.handle";
import HTTPException from "../exception/http.exception";

export class Handle {
  method: string;
  req: Request;
  res: Response;

  constructor(method: string, req: Request, res: Response) {
    this.method = method;
    this.req = req;
    this.res = res;
  }

  success(message: any, status: number = 200) {
    const messageLog = `API:${this.method} | HTTP:${this.req.method} | Path:${this.req.originalUrl} | Status:${this.res.statusCode} | Message:${JSON.stringify(message)}`;
    logger.info(messageLog);
    this.res.status(status);
    this.res.json(new ResponseHandle("สำเร็จ", true, message));
    this.res.end();
  }

  error(userMessage: any, logMessage: any, status: number = 500) {
    const messageLog = `API:${this.method} | HTTP:${this.req.method} | Path:${this.req.originalUrl} | Status:${this.res.statusCode} | Message:${logMessage}`;
    logger.error(messageLog);

    if (logMessage instanceof HTTPException) {
      userMessage = logMessage.message;
      status = logMessage.status;
    }

    this.res.status(status);
    this.res.json(new ResponseHandle("ไม่สำเร็จ", false, userMessage));
    this.res.end();
  }
}
