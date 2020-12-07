import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import env from '../env'
const { JWT_KEY } = env

interface IUserPayload {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.session?.jwt) {
    return next()
  }

  try {
    const payload = jwt.verify(req.session.jwt, JWT_KEY) as IUserPayload

    req.currentUser = payload
  } catch (error) {}

  next()
}
