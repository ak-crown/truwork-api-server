import express from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'

import routes from './routes'

import { errorHandler, currentUser } from './middlewares'
import { NotFoundError } from './errors'
import { createStandardLogger } from './middlewares/logger'

import env from './env'
const { NODE_ENV } = env

const app = express()

const cookieOptions = {
  signed: false,
  secure: NODE_ENV === 'production',
  httpOnly: NODE_ENV === 'production',
  domain: NODE_ENV === 'production' ? 'truwork.co.in' : undefined,
}

app.set('trust proxy', 1) // trust first proxy

app
  .disable('x-powered-by')
  .enable('trust proxy')
  .use(
    cors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cookie',
        'Set-Cookie',
      ],
    }),
    bodyParser.json({ limit: '5mb', type: '*/json' }),
    bodyParser.urlencoded({ extended: true, limit: '5mb' }),
    cookieSession(cookieOptions),
    currentUser,
    createStandardLogger(),
    routes
  )

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
