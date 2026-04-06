import { Request, Response, NextFunction } from 'express';
import { Schema, ZodError } from 'zod';

export const validate = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error); // Passes the ZodError to the global error handler
    }
  };
};
