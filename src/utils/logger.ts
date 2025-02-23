import { createLogger, format, transports } from "winston";
import fs from "fs";
import path from "path";

const { combine, timestamp, json, colorize, printf } = format;

const logDir: string = "src/logs";
const logFile: string = path.join(logDir, "app.log");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const consoleLogFormat = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp }) => {
    return `${timestamp} | ${level}: ${message}`;
  })
);

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({ filename: logFile }),
  ],
});

export default logger;
