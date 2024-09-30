import { createLogger, format, transports } from "winston";
import path from "path";

const logFormat = format.printf(
  (info) => `${info.timestamp} [${info.level}] [${info.label}]: ${info.message}`
);

export const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.label({ label: path.basename(require.main?.filename || "") }),
    format.colorize(),
    format.splat(), 
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
  ],
});