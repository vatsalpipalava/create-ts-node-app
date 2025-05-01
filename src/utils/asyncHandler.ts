import { Request, Response, NextFunction } from "express";

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | Promise<Response<any, Record<string, any>>>;

const asyncHandler =
  (requestHandler: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      const statusCode = (error as any).statusCode || 500;
      res.status(statusCode).json({
        success: false as boolean,
        status: statusCode as number,
        message: (error as any).message as string,
      });
    }
  };

export { asyncHandler };
