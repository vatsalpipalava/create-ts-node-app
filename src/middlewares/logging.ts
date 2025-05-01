import morgan, { StreamOptions } from "morgan";
import logger from "@/utils/logger";

const morganFormat = ":method :url :status :response-time ms";

const stream: StreamOptions = {
  write: (message: string) => {
    const parts = message.trim().split(" ");

    const logObject = {
      method: parts[0],
      url: parts[1],
      status: parts[2],
      responseTime: parts.slice(3).join(" "),
    };

    logger.info(JSON.stringify(logObject));
  },
};

const morganMiddleware = morgan(morganFormat, { stream });

export default morganMiddleware;
