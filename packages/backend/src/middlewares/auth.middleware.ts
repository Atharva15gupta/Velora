import { NextFunction, Request, Response } from "express";
import { clerkMiddleware, getAuth } from "@clerk/express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Use clerkMiddleware() globally to parse auth state without redirecting.
// This replaces ClerkExpressRequireAuth which caused handshake redirects
// that stripped API route paths.
export const clerkAuth: any = clerkMiddleware();

// verifyAuth checks for a valid session and returns 401 for unauthorized
// requests instead of redirecting (which breaks API routes).
export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);

  if (!auth || !auth.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Keep compatibility with existing routes expecting req.userId
  req.userId = auth.userId;
  next();
};
