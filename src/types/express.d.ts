export interface JwtPayload {
  id: string;
  role: string;
  status: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
