import { Request, Response, NextFunction } from "express";
import { adminAuth } from "../../db/firestoreConfig";

interface AuthenticatedRequest extends Request {
  currentUser?: {
    uid: string;
    email?: string;
    name?: string;
  };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    const { uid, email, name } = decodedToken;

    req.currentUser = { uid, email, name };

    next();
  } catch (error) {
    res.status(403).json({
      message: "Unauthorized: Invalid token",
      error: (error as Error).message,
    });
  }
};
