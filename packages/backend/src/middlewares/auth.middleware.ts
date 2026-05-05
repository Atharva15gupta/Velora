import { NextFunction, Request, Response } from "express";
import { ClerkExpressRequireAuth, RequireAuthProp, StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {
      userId?: string;
    }
  }
}

// ClerkExpressRequireAuth returns a middleware function.
// We export it as verifyAuth so the rest of the application routes don't need to change.
// When using this, req.auth.userId will be available.
export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  // Clerk middleware will automatically handle unauthorized responses
  ClerkExpressRequireAuth()(req, res, (err) => {
    if (err) {
      return next(err);
    }
    // To keep compatibility with existing routes expecting req.userId
    if (req.auth && req.auth.userId) {
      req.userId = req.auth.userId;
    }
    next();
  });
};
