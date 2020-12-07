import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors/custom-error'

/*interface CommonErrorStructure {
  errors: {
    message: string
    field?: string
  }[]
}*/

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }

  console.log(err)

  return res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  })
}
