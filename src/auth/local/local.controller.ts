import { Request, Response } from 'express'
import { User } from '../../models/user'
import { BadRequestError } from '../../errors'

import jwt from 'jsonwebtoken'
import { Password } from '../../utils/password'

import env from '../../env'
const { JWT_KEY } = env

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new BadRequestError('Email in use')
  }

  const user = User.build({
    email,
    password,
  })

  await user.save()

  const userJWT = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_KEY
  )

  req.session = {
    jwt: userJWT,
  }

  return res.status(201).send(user)
}

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if (!existingUser) throw new BadRequestError('Invalid credentials')

  const passwordMatch = await Password.compare(existingUser.password, password)

  if (!passwordMatch) throw new BadRequestError('Invalid credentials')

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      name: existingUser?.name,
      email: existingUser.email,
      role: existingUser.role,
    },
    JWT_KEY
  )

  req.session = {
    jwt: userJwt,
  }

  res.status(200).send(existingUser)
}
