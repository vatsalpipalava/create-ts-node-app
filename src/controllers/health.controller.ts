import { Request, Response } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { ApiResponse } from "@/utils/ApiResponse";

const healthCheck = asyncHandler(async (_: Request, res: Response) => {
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "❤️ Health check route work successfully."));
});

export { healthCheck };
